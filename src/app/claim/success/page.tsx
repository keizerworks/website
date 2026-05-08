"use client";

import { useEffect, useState } from "react";
import { Check, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ClaimSuccessPage() {
  const [planType, setPlanType] = useState<string | null>(null);

  useEffect(() => {
    // Get plan type from URL or localStorage
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan") || localStorage.getItem("audit_plan");
    setPlanType(plan);

    // Clean up localStorage
    localStorage.removeItem("audit_plan");
    localStorage.removeItem("audit_form_data");
  }, []);

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
            <Link href="/">
              <Image
                src={"/assets/logos/keizer-logo-name.svg"}
                alt="Keizer"
                width={120}
                height={40}
                className="invert"
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl lg:pl-[151px] px-4 sm:px-6 py-16 mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-8">
            {planType === "priority"
              ? "Your priority audit is confirmed. We'll review your profiles within 24 hours."
              : "Your audit request is confirmed. We'll review your profiles within 48 hours."
            }
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-4">What's next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                  1
                </div>
                <p className="text-gray-600 text-sm">
                  We'll analyze your social profiles based on your goals
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                  2
                </div>
                <p className="text-gray-600 text-sm">
                  You'll receive a detailed audit via your preferred method (email or Discord)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                  3
                </div>
                <p className="text-gray-600 text-sm">
                  Join our community to discuss and get ongoing tips
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="https://discord.gg/kzr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#5865F2] text-white font-semibold rounded-full hover:bg-[#4752c4] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join KZR Community
            </a>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
