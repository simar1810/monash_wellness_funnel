"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Small Business Owner", image: "/photos/result1.png" },
  { name: "Working Mom", image: "/photos/result2.jpg" },
  { name: "Working Mom", image: "/photos/result3.jpg" },
  { name: "Working Mom", image: "/photos/result4.jpg" },
  { name: "Working Mom", image: "/photos/result5.jpg" },
  { name: "Working Mom", image: "/photos/result6.jpg" },
  { name: "Working Mom", image: "/photos/result7.jpg" },
  { name: "Working Mom", image: "/photos/result8.jpg" },
  { name: "Working Mom", image: "/photos/result9.jpg" },
  { name: "Working Mom", image: "/photos/result10.jpg" },
  { name: "Working Mom", image: "/photos/result11.jpg" },
];

export default function DetailedTestimonials() {
  const itemsPerSlide = 3; // show 3 at once (desktop)
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const [current, setCurrent] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % totalSlides);

  // Slice testimonials into groups of 3
  const currentItems = testimonials.slice(
    current * itemsPerSlide,
    current * itemsPerSlide + itemsPerSlide
  );

  return (
    <section className="w-full py-12 bg-green-50">
      <div className="container px-4 md:px-6">
        {/* Carousel */}
        <div className="relative w-full max-w-5xl mx-auto h-[350px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full h-full flex justify-center gap-4"
            >
              {currentItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex-shrink-0 w-1/1 sm:w-1/3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full ${
                  i === current ? "bg-black" : "bg-gray-300"
                }`}
                animate={{
                  scale: i === current ? 1.3 : 1,
                  opacity: i === current ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition">
            Book Your Consultation Now
          </Button>
        </div>
      </div>
    </section>
  );
}
