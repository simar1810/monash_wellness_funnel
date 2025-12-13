import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/Monash_Wellness_logo-removebg-preview.png"
            alt="Monash Wellness Logo"
            width={200}
            height={80}
            className="h-auto w-[180px] md:w-[200px] mb-2"
          />
          {/* <p className="text-sm md:text-base text-gray-300">THE HEALTH COACH</p> */}
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 mb-8">
          {/* Customer Support Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left w-full text-white">Customer Support</h3>
            <div className="space-y-2 text-sm md:text-base text-center md:text-left">
              <p className="text-gray-200">Phone: <a href="tel:+917771011499" className="text-blue-400 hover:underline">+91 7771011499</a></p>
              <p className="text-gray-200">
                Email: <a href="mailto:support@monashwellness.com" className="text-blue-400 hover:underline">support@monashwellness.com</a>
              </p>
              <p className="text-gray-300 mt-3">Monday - Saturday</p>
              <p className="text-gray-300">10:00 AM – 7:00 PM</p>
            </div>
          </div>

          {/* Download Our App Section - Right Side */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-right w-full text-white">Download our app</h3>
            <div className="flex flex-col gap-3 w-full md:w-auto items-center md:items-end">
              <Link 
                href="https://apps.apple.com/ar/app/monash-wellness/id6751632386" 
                target="_blank"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image 
                  src="/appStore.png" 
                  alt="Download on the App Store" 
                  width={150} 
                  height={50}
                  className="h-auto w-[140px] md:w-[150px] lg:w-[160px]"
                />
              </Link>
              <Link 
                href="https://play.google.com/store/apps/details?id=com.wellnessz.monash&hl=en" 
                target="_blank"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image 
                  src="/playstore.png" 
                  alt="GET IT ON Google Play" 
                  width={150} 
                  height={50}
                  className="h-auto w-[140px] md:w-[150px] lg:w-[160px]"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-300">
          <p>©Monash Wellness - The Health Coach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
