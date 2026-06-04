"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

type AuditType = "social" | "website" | "both";

export default function ClaimSuccessPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [auditType, setAuditType] = useState<AuditType | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan") || localStorage.getItem("audit_plan");
    setPlan(planParam);

    try {
      const raw = localStorage.getItem("audit_form_data");
      if (raw) {
        const data = JSON.parse(raw);
        if (data.auditType) setAuditType(data.auditType);
        if (data.email) setEmail(data.email);
        if (data.name) setFirstName(String(data.name).trim().split(" ")[0]);
      }
    } catch {
      // ignore malformed storage
    }

    localStorage.removeItem("audit_plan");
    localStorage.removeItem("audit_form_data");
  }, []);

  const isPriority = plan === "priority";
  const deliveryTime = isPriority ? "within 48 hours" : "within 5 business days";

  const auditLabel =
    auditType === "website"
      ? "website audit"
      : auditType === "both"
        ? "full audit"
        : auditType === "social"
          ? "social audit"
          : "audit";

  const reviewTarget =
    auditType === "website"
      ? "your website"
      : auditType === "both"
        ? "your profiles and website"
        : auditType === "social"
          ? "your social profiles"
          : "everything you submitted";

  const steps = [
    {
      title: "Request received",
      desc: "Your audit is in the queue. No action is needed from you.",
    },
    {
      title: "We get to work",
      desc: `Our team reviews ${reviewTarget} by hand, with no automated scores.`,
    },
    {
      title: "Your audit arrives",
      desc: `Your personalized report and payment receipt land in your inbox ${deliveryTime}.`,
    },
  ];

  return (
    <div className="bg-gray-50 text-black min-h-screen flex flex-col">
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-[151px] z-10">
        <Image src={"/assets/k25/side.svg"} alt="side" fill className="object-cover" />
      </div>

      <header className="px-4 sm:px-6 lg:px-24 py-3 lg:pl-[171px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={"/assets/logos/keizer-logo-name.svg"}
              alt="Keizer"
              width={120}
              height={40}
              className="invert"
            />
          </Link>
        </div>
      </header>

      <div className="flex-1 lg:pl-[151px] px-4 sm:px-6 lg:px-12 py-10 sm:py-14 flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          {/* Card */}
          <div className="success-card relative bg-white rounded-3xl px-6 py-10 sm:px-10 sm:py-12 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] border border-gray-100">
            {/* Checkmark */}
            <div className="success-check w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-500/10">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {firstName ? `You're all set, ${firstName}!` : "You're all set!"}
              </h1>
              <p className="text-gray-500 mt-3 text-base sm:text-lg">
                Your {auditLabel} request is in. We've got it from here.
              </p>
            </div>

            {/* Email callout */}
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3.5 text-left">
              <svg
                className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-600 leading-relaxed">
                We'll deliver it {deliveryTime}
                {email ? (
                  <>
                    {" "}to <span className="font-semibold text-gray-900">{email}</span>.
                  </>
                ) : (
                  <> to the email you provided.</>
                )}
                {" "}Keep an eye on your inbox (and spam, just in case).
              </p>
            </div>

            {/* What happens next */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                What happens next
              </p>
              <ol className="space-y-4">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3.5">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <button
                data-cal-link="rahulsain/15min"
                data-cal-namespace="15min"
                data-cal-config='{"layout":"month_view"}'
                className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Book a free strategy call
              </button>
              <Link
                href="/"
                className="flex items-center justify-center w-full px-6 py-3.5 rounded-xl font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Explore Keizerworks
              </Link>
            </div>

            {/* Support note */}
            <p className="mt-6 text-center text-xs text-gray-400">
              Questions? Email us at{" "}
              <a href="mailto:biz@keizerworks.com" className="font-medium text-gray-600 hover:text-gray-900">
                biz@keizerworks.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes successCardIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes successCheckPop {
          0% { transform: scale(0); }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .success-card { animation: successCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .success-check { animation: successCheckPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }
        @media (prefers-reduced-motion: reduce) {
          .success-card, .success-check { animation: none; opacity: 1; }
        }
      `}</style>

      <Script id="cal-popup" strategy="afterInteractive">
        {`
          (function (C, A, L) {
            let p = function (a, ar) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
              let cal = C.Cal;
              let ar = arguments;
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                d.head.appendChild(d.createElement("script")).src = A;
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api = function () { p(api, arguments); };
                const namespace = ar[1];
                api.q = api.q || [];
                if (typeof namespace === "string") {
                  cal.ns[namespace] = cal.ns[namespace] || api;
                  p(cal.ns[namespace], ar);
                  p(cal, ["initNamespace", namespace]);
                } else p(cal, ar);
                return;
              }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");

          Cal("init", "15min", { origin: "https://app.cal.com" });
          Cal.ns["15min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        `}
      </Script>
    </div>
  );
}
