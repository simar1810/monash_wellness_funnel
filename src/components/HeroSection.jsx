"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            frontEndClient: "Shine_nutrition",
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <section className="w-full py-10 md:py-16 bg-green-100 text-center">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="h-20 w-20 md:h-28 md:w-28 rounded-lg"
          />
        </div>

        {/* Top Banner */}
        <div className="bg-[var(--secondary)] text-[var(--secondary-foreground)] text-center p-4 rounded-2xl mb-8 max-w-4xl mx-auto">
          <p className="text-sm md:text-base font-medium">
            Busy Schedule? We Make Healthy Living Simple.
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--primary-foreground)] mb-8 leading-tight">
          We help professionals, business owners, and homemakers stay fit with
          practical diet plans, easy tracking, and step-by-step expert guidance.
        </h1>

        {/* Highlight Buttons */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <Button className="bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--accent-foreground)] p-[10px] w-[310px] h-[104px] rounded-[20px] text-3xl font-semibold shadow-lg">
            Improve Your Health
          </Button>

          <Button className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--accent-foreground)] p-[10px] w-[310px] h-[104px] rounded-[20px] text-3xl font-semibold shadow-lg">
            Become a Coach
          </Button>
        </div>

        {/* Video + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start place-items-center mx-auto max-w-5xl">
           <div className="relative w-full aspect-video min-h-[315px] bg-[var(--muted)] rounded-lg overflow-hidden">
            <iframe
              src="https://drive.google.com/file/d/1rwEA0EZNdwMjs9ygEqF_I3_GtWmTrwsk/preview"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>

          <div className="w-full bg-[var(--card)] p-6 md:p-8 rounded-lg shadow-lg border border-[var(--border)] text-left">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--primary-foreground)] mb-6 text-center md:text-left">
              Kindly fill the form for your FREE Consultation.
            </h2>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                className="w-full"
              />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full"
              />
              <div className="flex items-center border border-[var(--border)] rounded-md overflow-hidden">
                <span className="px-3 text-[var(--secondary)]">+91</span>
                <Input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="flex-1 border-l border-[var(--border)] focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--accent-foreground)] px-6 py-3 rounded-md text-lg font-semibold"
              >
                NEXT
              </Button>
            </form>
          </div>
        </div>

        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              "5+ Years of Experience",
              "5000+ Happy Client Results",
              "Dedicated Dietitians",
              "No Bounce Back",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2"
              >
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[var(--accent-foreground)]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-black">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
