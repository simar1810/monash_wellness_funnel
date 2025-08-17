"use client";
import React from "react";

const whoShouldAttend = [
  {
    id: 1,
    image: "/images/busy-professional.jpg",
    description: "Sahi nutrition se focus improve hota hai.",
  },
  {
    id: 2,
    image: "/images/home-makers.jpg",
    description: "Healthy meals se energy levels stable rehte hain.",
  },
  {
    id: 3,
    image: "/images/students.jpg",
    description: "Experts aapke routine ke hisaab se plans banate hain.",
  },
  {
    id: 4,
    image: "/images/entrepreneurs.jpg",
    description: "Yeh plans productivity aur stress manage karte hain.",
  },
];

export default function WhoShouldAttendSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-secondary mb-8">
          Stay Sharp & Energetic At Work—Every Day
        </h2>

        <div className="mt-[30px] md:mt-[60px] flex flex-wrap text-black items-center justify-center gap-[28px]">
          {whoShouldAttend.map((item) => (
            <div
              key={item.id}
              className="relative w-full md:w-[calc(50%-32px)] h-[200px] md:h-[130px] rounded-[10px] overflow-hidden bg-red-600"
            >
              <div className="absolute inset-0 bg-[var(--accent)] flex items-center gap-4 px-6 py-4">
                <span className="text-white text-[22px] md:text-[30px] font-bold bg-secondary px-4 py-2 rounded-full">
                  {item.id.toString().padStart(2, "0")}
                </span>
                <p className="text-white text-[18px] md:text-[22px] font-bold leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
