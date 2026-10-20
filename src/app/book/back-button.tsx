"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Goes back to wherever they clicked "Book a call"; home if they landed here.
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() =>
        window.history.length > 1 ? router.back() : router.push("/")
      }
      className="flex size-11 items-center justify-center rounded-xl bg-white text-black/70 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.08] transition-[color,transform] duration-150 hover:text-black active:scale-[0.95]"
    >
      <ArrowLeft className="size-5" strokeWidth={2.25} />
    </button>
  );
}
