"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setEmail("");
        setStatus({ message: result.message, type: "success" });
      } else {
        setStatus({
          message: result.error || "Failed to subscribe",
          type: "error",
        });
      }
    } catch {
      setStatus({ message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="newsLetter" className="md:pt-[100px] pt-[60px]">
      <div className="flex border-b border-neutral-600 md:pb-[100px] pb-[60px] md:flex-row flex-col gap-[24px] lg:items-center items-start justify-between max-w-[1536px] mx-auto md:px-24 px-4">
        <p className="text-[24px] leading-[100%] font-bold">
          Join our newsletter <br className="lg:block md:hidden block" />
          to stay up to date with us
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full sm:max-w-[450px] flex flex-col gap-2"
        >
          <div className="flex items-center bg-[#151616] rounded-lg overflow-hidden">
            <input
              className="w-full relative py-[14px] pl-[24px] pr-[12px] text-white bg-transparent focus:outline-none outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email."
              disabled={loading}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="text-[14px] py-[14px] pl-[12px] pr-[24px] text-white/60 hover:text-white active:text-white transition-all ease-in-out duration-300 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          {status && (
            <p
              className={`text-sm ${
                status.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
