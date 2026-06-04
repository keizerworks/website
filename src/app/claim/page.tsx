"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const socialPlatforms = [
  { id: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname", icon: "/assets/socials/linkedin.svg" },
  { id: "twitter", label: "Twitter/X", placeholder: "x.com/yourname", icon: "/assets/socials/twitter.svg" },
  { id: "instagram", label: "Instagram", placeholder: "instagram.com/yourname", icon: "/assets/socials/instagram.svg" },
  { id: "youtube", label: "YouTube", placeholder: "youtube.com/@yourname", icon: "/assets/socials/youtube.svg" },
  { id: "reddit", label: "Reddit", placeholder: "reddit.com/u/yourname", icon: "/assets/socials/reddit.svg" },
];

const goals = [
  { id: "brand", label: "Build personal brand" },
  { id: "clients", label: "Attract clients" },
  { id: "followers", label: "Grow followers" },
  { id: "engagement", label: "Increase engagement" },
];

type AuditType = "social" | "website" | "both";

export default function ClaimAuditForm() {
  const [isSubmitting, setIsSubmitting] = useState<"standard" | "priority" | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [auditType, setAuditType] = useState<AuditType>("social");
  const [platformLinks, setPlatformLinks] = useState<Record<string, string>>({});
  const [expandedPlatforms, setExpandedPlatforms] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [formTimestamp, setFormTimestamp] = useState<number>(0);

  useEffect(() => {
    setFormTimestamp(Date.now());
  }, []);

  const showSocialFields = auditType === "social" || auditType === "both";
  const showWebsiteFields = auditType === "website" || auditType === "both";

  const updatePlatformLink = (platformId: string, value: string) => {
    setPlatformLinks((prev) => ({ ...prev, [platformId]: value }));
  };

  const addPlatform = (platformId: string) => {
    if (!expandedPlatforms.includes(platformId)) {
      setExpandedPlatforms((prev) => [...prev, platformId]);
      setFieldErrors((prev) => ({ ...prev, social: "" }));
    }
  };

  const removePlatform = (platformId: string) => {
    setExpandedPlatforms((prev) => prev.filter((p) => p !== platformId));
    setPlatformLinks((prev) => {
      const updated = { ...prev };
      delete updated[platformId];
      return updated;
    });
  };

  const getFilledPlatforms = () => {
    return Object.entries(platformLinks)
      .filter(([, url]) => url.trim().length > 0)
      .map(([id, url]) => ({ id, url }));
  };

  const isValidSocialUrl = (url: string): boolean => {
    const trimmed = url.trim();
    if (!trimmed) return false;
    const pattern = /\.[a-z]{2,}\/.+/i;
    return pattern.test(trimmed);
  };

  const validateForm = (form: HTMLFormElement): { field: string; message: string } | null => {
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const websiteUrl = formData.get("website_url") as string;

    if (!name || name.trim().length < 2) {
      return { field: "name", message: "Required" };
    }
    if (!email || !email.includes("@")) {
      return { field: "email", message: "Valid email required" };
    }

    if (showSocialFields) {
      const filledPlatforms = getFilledPlatforms();
      if (filledPlatforms.length === 0) {
        return { field: "social", message: "Add at least one profile" };
      }
      const invalidProfile = filledPlatforms.find((p) => !isValidSocialUrl(p.url));
      if (invalidProfile) {
        return { field: "social", message: "Add username after .com/" };
      }
    }

    if (showWebsiteFields) {
      if (!websiteUrl || websiteUrl.trim().length < 5) {
        return { field: "website_url", message: "Required" };
      }
    }

    if (!selectedGoal) {
      return { field: "goal", message: "Select a goal" };
    }
    return null;
  };

  const handleSubmit = async (plan: "standard" | "priority") => {
    const form = document.querySelector("form") as HTMLFormElement;
    if (!form) return;

    setFieldErrors({});
    const error = validateForm(form);
    if (error) {
      setFieldErrors({ [error.field]: error.message });
      const element = document.getElementById(error.field);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.focus();
        }
      }
      return;
    }

    setIsSubmitting(plan);

    const formData = new FormData(form);

    try {
      const filledPlatforms = getFilledPlatforms();
      const auditData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        auditType,
        platformLinks: showSocialFields ? filledPlatforms : [],
        websiteUrl: showWebsiteFields ? (formData.get("website_url") as string) : "",
        mainGoal: selectedGoal,
        note: note.trim() || undefined,
        plan,
        _timestamp: formTimestamp,
      };

      localStorage.setItem("audit_form_data", JSON.stringify(auditData));
      localStorage.setItem("audit_plan", plan);

      const response = await fetch("/api/claim-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auditData),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = `/claim/success?plan=${plan}`;
      } else {
        throw new Error(data.error || "Failed to submit audit request");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setFieldErrors({ form: error instanceof Error ? error.message : "Failed to submit request" });
      setIsSubmitting(null);
    }
  };

  const getTitle = () => {
    if (auditType === "website") return "Claim Your Website Audit";
    if (auditType === "both") return "Claim Your Full Audit";
    return "Claim Your Social Audit";
  };

  const getSubtitle = () => {
    if (auditType === "website") return "Get a personalized breakdown of your website";
    if (auditType === "both") return "Get a complete audit of your online presence";
    return "Get a personalized breakdown of your social media presence";
  };

  const getPricing = () => {
    if (auditType === "website") return { standard: 5, priority: 10 };
    if (auditType === "both") return { standard: 5, priority: 15 };
    return { standard: 1, priority: 5 };
  };

  const pricing = getPricing();

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-[151px] z-10">
        <Image
          src={"/assets/k25/side.svg"}
          alt="side"
          fill
          className="object-cover"
        />
      </div>

      <header className="px-4 sm:px-6 lg:px-24 py-3 lg:pl-[171px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={"/assets/logos/keizer-logo-name.svg"}
              alt="Keizer"
              width={120}
              height={40}
              className="invert"
            />
          </div>

          <a
            href="mailto:biz@keizerworks.com"
            className="flex items-center gap-2 px-3 py-1.5 text-sm lg:text-[17px] font-medium"
          >
            Need help?
            <span className="bg-black px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg">
              <Image
                src={"/assets/k25/k.svg"}
                alt="k"
                width={20}
                height={28}
                className="lg:w-6 lg:h-[35px]"
              />
            </span>
          </a>
        </div>
      </header>

      <div className="max-w-4xl lg:pl-[151px] px-4 sm:px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-gray-900 mb-2">
            {getTitle()}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {getSubtitle()}
          </p>
        </div>

        <div className="h-[1px] w-full bg-gray-300 mb-6"></div>

        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <input
            type="text"
            name="honeypot"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Audit Type Selector */}
          <div className="space-y-3">
            <label className="block text-base font-medium text-gray-700">
              What do you want audited?<span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setAuditType("social")}
                className={`px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${
                  auditType === "social"
                    ? "border-[#3d6bbc] bg-[#3d6bbc] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Social Media
              </button>
              <button
                type="button"
                onClick={() => setAuditType("website")}
                className={`px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${
                  auditType === "website"
                    ? "border-[#3d6bbc] bg-[#3d6bbc] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Website
              </button>
              <button
                type="button"
                onClick={() => setAuditType("both")}
                className={`px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${
                  auditType === "both"
                    ? "border-[#3d6bbc] bg-[#3d6bbc] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Both
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name<span className="text-red-500">*</span>
              </label>
              {fieldErrors.name && (
                <span className="text-sm text-red-500">{fieldErrors.name}</span>
              )}
            </div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base ${
                fieldErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              onChange={() => setFieldErrors((prev) => ({ ...prev, name: "" }))}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              {fieldErrors.email && (
                <span className="text-sm text-red-500">{fieldErrors.email}</span>
              )}
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              onChange={() => setFieldErrors((prev) => ({ ...prev, email: "" }))}
            />
          </div>

          {/* Social Platforms - Only show for social or both */}
          {showSocialFields && (
            <div id="social" className="space-y-3">
              <label className="block text-base font-medium text-gray-700">
                Add your social profiles<span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 -mt-1">Fill in at least one platform</p>
              {fieldErrors.social && (
                <p className="text-sm text-red-500">{fieldErrors.social}</p>
              )}

              <div className="space-y-3">
                {/* Expanded platforms with inputs */}
                {expandedPlatforms.map((platformId) => {
                  const platform = socialPlatforms.find(p => p.id === platformId);
                  if (!platform) return null;
                  return (
                    <div key={platformId} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removePlatform(platformId)}
                        className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors group"
                        title="Remove"
                      >
                        <Image
                          src={platform.icon}
                          alt={platform.label}
                          width={24}
                          height={24}
                          className="group-hover:opacity-50"
                        />
                      </button>
                      <input
                        type="url"
                        placeholder={platform.placeholder}
                        value={platformLinks[platformId] || ""}
                        onChange={(e) => updatePlatformLink(platformId, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm"
                      />
                    </div>
                  );
                })}

                {/* Remaining platform icons */}
                {socialPlatforms.filter(p => !expandedPlatforms.includes(p.id)).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {socialPlatforms
                      .filter(p => !expandedPlatforms.includes(p.id))
                      .map((platform) => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => addPlatform(platform.id)}
                          className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all"
                        >
                          <Image
                            src={platform.icon}
                            alt={platform.label}
                            width={24}
                            height={24}
                            className="opacity-60"
                          />
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Website URL - Only show for website or both */}
          {showWebsiteFields && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="website_url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website URL<span className="text-red-500">*</span>
                </label>
                {fieldErrors.website_url && (
                  <span className="text-sm text-red-500">{fieldErrors.website_url}</span>
                )}
              </div>
              <input
                id="website_url"
                name="website_url"
                type="url"
                placeholder="https://yourwebsite.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base ${
                  fieldErrors.website_url ? "border-red-500" : "border-gray-300"
                }`}
                onChange={() => setFieldErrors((prev) => ({ ...prev, website_url: "" }))}
              />
            </div>
          )}

          {/* Main Goal */}
          <div id="goal" className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-base font-medium text-gray-700">
                What's your main goal?<span className="text-red-500">*</span>
              </label>
              {fieldErrors.goal && (
                <span className="text-sm text-red-500">{fieldErrors.goal}</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => {
                    setSelectedGoal(goal.id);
                    setFieldErrors((prev) => ({ ...prev, goal: "" }));
                  }}
                  className={`px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all text-left ${
                    selectedGoal === goal.id
                      ? "border-[#3d6bbc] bg-[#3d6bbc] text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add a note */}
          <div className="flex justify-end">
            {!showNote ? (
              <button
                type="button"
                onClick={() => setShowNote(true)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                +Add a note
              </button>
            ) : (
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Note</label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNote(false);
                      setNote("");
                    }}
                    className="text-sm text-gray-400 hover:text-gray-600"
                  >
                    remove
                  </button>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any additional details..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-sm"
                />
              </div>
            )}
          </div>

          <div className="h-[1px] w-full bg-gray-200"></div>

          {/* Submit Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              disabled={!!isSubmitting}
              onClick={() => handleSubmit("standard")}
              className={`w-full py-4 px-4 font-bold rounded-full shadow transition-all text-base ${
                isSubmitting === "standard"
                  ? "bg-gray-600 cursor-wait text-white"
                  : isSubmitting
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-black hover:bg-gray-800 text-white"
              }`}
            >
              {isSubmitting === "standard" ? "Submitting..." : `Get My $${pricing.standard} Audit`}
            </button>

            <button
              type="button"
              disabled={!!isSubmitting}
              onClick={() => handleSubmit("priority")}
              className={`w-full py-4 px-4 font-bold rounded-full shadow transition-all text-base ${
                isSubmitting === "priority"
                  ? "bg-[#2d5090] cursor-wait text-white"
                  : isSubmitting
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-[#3d6bbc] hover:bg-[#335a9e] text-white"
              }`}
            >
              {isSubmitting === "priority" ? "Submitting..." : `Skip the queue ~ $${pricing.priority}`}
            </button>

            <p className="text-right text-sm text-gray-600">⚡ Priority delivery within 48 hours</p>
          </div>
        </form>
      </div>
    </div>
  );
}
