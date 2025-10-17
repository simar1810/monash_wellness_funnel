"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConsultationSection() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleSmoothScroll = (e) => {
        const target = document.querySelector(
          e.currentTarget.getAttribute("href")
        );
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      };

      const link = document.querySelector("a[href='#highlight-buttons']");
      if (link) link.addEventListener("click", handleSmoothScroll);

      return () => {
        if (link) link.removeEventListener("click", handleSmoothScroll);
      };
    }
  }, []);
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[var(--background)] text-center relative">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex justify-center mb-15" >
        <Image
          src="/collage.jpg"
          alt="Live Young Wellness"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--primary-foreground)]">
          Questions?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-[var(--foreground)]">
          Schedule A FREE Consultation Call With One Of Our Experts.
        </p>

        <h3 className="text-xl md:text-2xl font-bold mb-6 text-[var(--primary-foreground)]">
          What To Expect in the FREE Consultation:
        </h3>
        <div className="grid gap-4 max-w-2xl mx-auto mb-12">
          {[
            "Quick understanding of your current situation, health and your fitness goals",
            "Get a custom roadmap to achieve lifelong lasting results.",
            "Clarify & answer any of your questions & doubts.",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-[var(--accent)] p-4 rounded-lg shadow-sm"
            >
              <CheckCircle className="w-6 h-6 text-black" />
              <span className="text-base font-medium text-white">{text}</span>
            </div>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--primary-foreground)]">
          Start Your Health Journey With Live Young Wellness
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-black">
          Our System is so Easy, Sustainable and Doable that it becomes part of
          your lifestyle and the results are sustainable in the long run 😊😉
        </p>

        <div className="text-center mb-12">
          <button
            type="button"
            className="block w-full sm:inline-block sm:w-auto bg-black hover:bg-gray-800 text-[var(--accent-foreground)] px-6 sm:px-8 py-4 rounded-md text-base sm:text-lg font-semibold shadow-lg text-center"
            onClick={() => {
              const banner = document.getElementById('payment-banner');
              if (banner) {
                banner.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  const payBtn = banner.querySelector('button');
                  if (payBtn) {
                    payBtn.click();
                  }
                }, 500);
              }
            }}
          >
            Start Your Personalized Health Plan Now
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 md:mt-0 w-full">
        <div className="relative flex justify-center items-center gap-3 md:gap-8 py-6 px-6 bg-gradient-to-r from-emerald-100/70 via-teal-100/60 to-cyan-100/70 backdrop-blur-md border-t border-emerald-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 via-teal-300/20 to-cyan-300/20 blur-3xl opacity-60"></div>

          <p
            onClick={() => router.push("/privacy-policy")}
            className="relative cursor-pointer text-xs md:text-sm font-semibold text-gray-800 hover:text-black transition-all duration-200 group"
          >
            <span className="relative z-10 group-hover:text-emerald-700">Privacy Policy</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
          </p>

          <div className="hidden md:block w-[1px] h-4 bg-emerald-300/50"></div>

          <p
            onClick={() => router.push("/terms-and-conditions")}
            className="relative cursor-pointer text-xs md:text-sm font-semibold text-gray-800 hover:text-black transition-all duration-200 group"
          >
            <span className="relative z-10 group-hover:text-emerald-700">Terms & Conditions</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
          </p>
        </div>
      </div>

    </section>
  );
}
