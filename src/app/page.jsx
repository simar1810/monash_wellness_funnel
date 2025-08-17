import ClientTestimonialsGrid from "@/components/ClientTestimonials";
import ConsultationSection from "@/components/ConsultationSecction";
import DetailedTestimonials from "@/components/DetailedTestimonals";
import HeroSection from "@/components/HeroSection";
import PaymentBanner from "@/components/paymentbanner";
import SocialProofSection from "@/components/SocialProof";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <DetailedTestimonials />
      <SocialProofSection />
      <PaymentBanner/>
      <ClientTestimonialsGrid />
      <ConsultationSection />
    </div>
  );
}
