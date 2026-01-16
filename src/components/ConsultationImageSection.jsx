"use client";

import Image from "next/image";
import Link from "next/link";

export default function ConsultationImageSection() {
  return (
    <section className="w-full py-8 md:py-12 bg-[#eeece0]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Desktop Image */}
        <div className="hidden md:block w-full mb-6">
          <Image
            src="/MonashWellnessDesktop.png"
            alt="Monash Wellness Desktop"
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden w-full mb-6">
          <Image
            src="/MonashWellnessMobile.png"
            alt="Monash Wellness Mobile"
            width={600}
            height={800}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Link
            href="https://rzp.io/rzp/ouRT1Qz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Book Your Consultation @99
          </Link>
        </div>
      </div>
    </section>
  );
}

