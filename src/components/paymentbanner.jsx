"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  Star,
  Shield,
  Users,
  Zap,
  Heart,
  Loader2,
  User,
  Mail,
  Phone,
} from "lucide-react";

export default function PaymentBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      alert("Failed to load payment gateway. Please refresh and try again.");
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return false;
    }

    if (!formData.email && !formData.phoneNumber) {
      alert("Please provide either email or phone number");
      return false;
    }

    if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const createOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 99900, // ₹999 in paise
            note: { client: "Monash" },
            type: "Monash",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      return await res.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/verify-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email || null,
            phoneNumber: formData.phoneNumber || null,
            clientId: "Monash",
            frontEndClient: "Monash",
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_signature: paymentData.razorpay_signature,
            amount: 999,
          }),
        }
      );

      const data = await verifyRes.json();

      if (data.success) {
        alert(
          "🎉 Payment Successful! Welcome to Monash Fitness Community! Check your email/phone for access details."
        );
        // Reset form
        setFormData({ name: "", email: "", phoneNumber: "" });
        setShowForm(false);
      } else {
        alert(
          `❌ Payment verification failed: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      alert("❌ Payment verification failed. Please contact support.");
    }
  };

  const openRazorpay = async () => {
    if (!scriptLoaded) {
      alert(
        "Payment gateway is still loading. Please wait a moment and try again."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      alert("Payment configuration error. Please contact support.");
      return;
    }

    setIsLoading(true);

    try {
      const order = await createOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Monash Fitness",
        description: "Premium Fitness Community Membership",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          await verifyPayment(response);
          setIsLoading(false);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          membership_type: "fit_india_community",
          validity: "lifetime",
        },
        theme: {
          color: "#059669",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const features = [
    {
      icon: <Heart className="w-5 h-5" />,
      text: "Personalized Diet & Fitness Plans",
      highlight: "Tailored for you",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Daily Live Workouts",
      highlight: "Interactive sessions",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "1-on-1 Counselling",
      highlight: "Expert guidance",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Telegram & WhatsApp Community",
      highlight: "24/7 support",
    },
    {
      icon: <Star className="w-5 h-5" />,
      text: "Lifetime Updates",
      highlight: "Always current",
    },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),rgba(5,150,105,0.05),transparent_60%)]" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-teal-200/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-200/25 rounded-full blur-xl animate-pulse delay-500" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-6 bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2 text-sm font-medium"
          >
            🔥 Limited Time Offer
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Join Monash FitnessCommunity
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
            Transform your fitness journey with India's premier fitness
            community
          </p>

          <div className="flex items-center justify-center gap-2 text-amber-500 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="text-slate-600 ml-2 font-medium">
              4.9/5 from 2,000+ members
            </span>
          </div>
        </div>

        {/* Main Card */}
        <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl shadow-emerald-100/50 p-8 md:p-12 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />

          <div className="relative">
            {/* Pricing */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="text-2xl text-slate-400 line-through">
                  ₹2,999
                </span>
                <span className="text-6xl font-bold text-slate-900">₹999</span>
                <Badge className="bg-red-100 text-red-700 border-red-200 px-3 py-1">
                  Save 67%
                </Badge>
              </div>
              <p className="text-slate-600 text-lg">
                One-time payment • Lifetime access • No hidden fees
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-emerald-50/50 hover:scale-[1.02]"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      {feature.text}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {feature.highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* User Form */}
            {showForm && (
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Details
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-700"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phoneNumber"
                      className="text-sm font-medium text-slate-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      className="mt-1"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  * Name is required. Please provide either email or phone
                  number.
                </p>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center">
              {!showForm ? (
                <Button
                  onClick={() => setShowForm(true)}
                  className="group relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-xl shadow-emerald-200/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-300/50 overflow-hidden min-w-[300px]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <User className="w-6 h-6" />
                    Get Started - Join Now
                    <Star className="w-6 h-6" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </Button>
              ) : (
                <Button
                  onClick={openRazorpay}
                  disabled={isLoading || !scriptLoaded}
                  className="group relative bg-gradient-to-r md:ml-0 -ml-10 from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-xl shadow-emerald-200/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-300/50 overflow-hidden min-w-[300px]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing Payment...
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </>
                    ) : (
                      <>
                        <Zap className="w-6 h-6" />
                        Pay ₹999 & Join Now
                        <Star className="w-6 h-6" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out group-disabled:hidden" />
                </Button>
              )}

              {!scriptLoaded && (
                <p className="mt-2 text-sm text-slate-500">
                  Loading payment gateway...
                </p>
              )}

              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2000+ Happy Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Trusted by fitness enthusiasts across India
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-slate-400">2000+</div>
            <div className="text-2xl font-bold text-slate-400">Members</div>
            <div className="text-2xl font-bold text-slate-400">50+</div>
            <div className="text-2xl font-bold text-slate-400">Cities</div>
            <div className="text-2xl font-bold text-slate-400">4.9★</div>
            <div className="text-2xl font-bold text-slate-400">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
