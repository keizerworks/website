"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";
import Image from "next/image";

const socialPlatforms = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter/X" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
  { id: "reddit", label: "Reddit" },
];

const goals = [
  { id: "brand", label: "Build personal brand" },
  { id: "clients", label: "Attract clients" },
  { id: "followers", label: "Grow followers" },
  { id: "engagement", label: "Increase engagement" },
];

export default function ClaimAuditForm() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<"standard" | "priority" | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [responsePreference, setResponsePreference] = useState<"email" | "discord">("email");
  const [formTimestamp, setFormTimestamp] = useState<number>(0);

  useEffect(() => {
    setFormTimestamp(Date.now());
  }, []);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const validateForm = (form: HTMLFormElement): string | null => {
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const socialLinks = formData.get("social_links") as string;

    if (!name || name.trim().length < 2) {
      return "Please enter your name";
    }
    if (!email || !email.includes("@")) {
      return "Please enter a valid email";
    }
    if (selectedPlatforms.length === 0) {
      return "Please select at least one platform";
    }
    if (!socialLinks || socialLinks.trim().length < 10) {
      return "Please provide your social links";
    }
    if (!selectedGoal) {
      return "Please select your main goal";
    }
    return null;
  };

  const handleCheckout = async (plan: "standard" | "priority") => {
    const form = document.querySelector("form") as HTMLFormElement;
    if (!form) return;

    const error = validateForm(form);
    if (error) {
      setSubmitError(error);
      return;
    }

    setIsSubmitting(plan);
    setSubmitError(null);

    const formData = new FormData(form);

    try {
      // Store form data in localStorage for after payment
      const auditData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        platforms: selectedPlatforms,
        socialLinks: formData.get("social_links") as string,
        mainGoal: selectedGoal,
        focusArea: formData.get("focus_area") as string,
        struggles: formData.get("struggles") as string,
        responsePreference,
        plan,
        _timestamp: formTimestamp,
      };

      localStorage.setItem("audit_form_data", JSON.stringify(auditData));
      localStorage.setItem("audit_plan", plan);

      // Get product ID based on plan
      const productId = plan === "priority"
        ? process.env.NEXT_PUBLIC_DODO_PRIORITY_PRODUCT_ID
        : process.env.NEXT_PUBLIC_DODO_STANDARD_PRODUCT_ID;

      if (!productId) {
        throw new Error("Product not configured");
      }

      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          customer: {
            email: auditData.email,
            name: auditData.name,
          },
          return_url: `${window.location.origin}/claim/success?plan=${plan}`,
          metadata: {
            plan,
            platforms: selectedPlatforms.join(","),
            goal: selectedGoal,
            responsePreference,
          },
        }),
      });

      const data = await response.json();

      if (data.checkout_url) {
        // Redirect to Dodo checkout
        window.location.href = data.checkout_url;
      } else if (data.payment_link) {
        window.location.href = data.payment_link;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to start checkout");
      setIsSubmitting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block fixed left-0 top-0 w-[151px] h-screen z-10">
        <Image
          src={"/assets/k25/side.svg"}
          alt="side"
          fill
          className="object-cover"
        />
      </div>

      {/* Header */}
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

          {/* Desktop Contact Button */}
          <a
            href="mailto:biz@keizerworks.com"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm lg:text-[17px] font-medium"
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

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden mt-4 p-4 bg-white rounded-lg shadow-lg">
            <a
              href="mailto:biz@keizerworks.com"
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium w-full"
            >
              Need help? Contact us
              <span className="bg-black px-2 py-1.5 rounded-lg">
                <Image src={"/assets/k25/k.svg"} alt="k" width={16} height={24} />
              </span>
            </a>
          </div>
        )}
      </header>

      <div className="max-w-4xl lg:pl-[151px] px-4 sm:px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-gray-900 mb-2">
            Claim Your Social Audit
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Get a personalized breakdown of your social media presence
          </p>
        </div>

        <div className="h-[1px] w-full bg-gray-300 mb-6"></div>

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{submitError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Honeypot - hidden from users */}
          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base"
              required
            />
          </div>

          {/* Response Preference */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              How do you want to receive your audit?<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setResponsePreference("email")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                  responsePreference === "email"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <Mail size={18} />
                Email
              </button>
              <button
                type="button"
                onClick={() => setResponsePreference("discord")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                  responsePreference === "discord"
                    ? "border-[#5865F2] bg-[#5865F2] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Discord
              </button>
            </div>
          </div>

          {/* Social Platforms */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Which platforms do you use?<span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => togglePlatform(platform.id)}
                  className={`px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {platform.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <label
              htmlFor="social_links"
              className="block text-sm font-medium text-gray-700"
            >
              Links to your profiles<span className="text-red-500">*</span>
            </label>
            <textarea
              id="social_links"
              name="social_links"
              rows={3}
              placeholder="https://twitter.com/yourname&#10;https://linkedin.com/in/yourname&#10;https://instagram.com/yourname"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-base"
              required
            />
            <p className="text-xs text-gray-500">One link per line</p>
          </div>

          {/* Main Goal */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              What's your main goal?<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all text-left ${
                    selectedGoal === goal.id
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Area */}
          <div className="space-y-2">
            <label
              htmlFor="focus_area"
              className="block text-sm font-medium text-gray-700"
            >
              Anything specific you want us to look at?
            </label>
            <textarea
              id="focus_area"
              name="focus_area"
              rows={2}
              placeholder="e.g., My bio, content strategy, engagement rates..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-base"
            />
          </div>

          {/* Struggles */}
          <div className="space-y-2">
            <label
              htmlFor="struggles"
              className="block text-sm font-medium text-gray-700"
            >
              What's your #1 pain point with social media?
            </label>
            <textarea
              id="struggles"
              name="struggles"
              rows={2}
              placeholder="What's holding you back?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-base"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="button"
              disabled={!!isSubmitting}
              onClick={() => handleCheckout("standard")}
              className={`w-full py-4 px-4 font-bold rounded-full shadow transition-all text-base ${
                isSubmitting === "standard"
                  ? "bg-gray-600 cursor-wait text-white"
                  : isSubmitting
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-black hover:bg-gray-800 text-white"
              }`}
            >
              {isSubmitting === "standard" ? "Redirecting to checkout..." : "Get My $1 Audit"}
            </button>

            <button
              type="button"
              disabled={!!isSubmitting}
              onClick={() => handleCheckout("priority")}
              className={`w-full py-4 px-4 font-bold rounded-full shadow transition-all text-base ${
                isSubmitting === "priority"
                  ? "bg-[#2d5090] cursor-wait text-white"
                  : isSubmitting
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-[#3d6bbc] hover:bg-[#335a9e] text-white"
              }`}
            >
              {isSubmitting === "priority" ? "Redirecting to checkout..." : "Skip the queue ~ $5"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
