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
            {/* Instagram Link */}
            <div className="mt-4 flex items-center md:justify-start justify-center">
              <Link
                href="https://www.instagram.com/monash.wellness/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.22 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
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
