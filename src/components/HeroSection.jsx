"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [mobileStep, setMobileStep] = useState(1);
  const formSectionRef = useRef(null);

  const benefitItems = [
    {
      label: "Live Classes (6 × ₹350)................",
      price: 2100,
      subtitle: "Access to Strenght, Zumba, Pilates, Yoga etc",
    },
    {
      label: "Fitness Assessment......................",
      price: 1950,
      subtitle: "Blueprint for your best physique",
    },
    {
      label: "Accountability Partner...................",
      price: 597,
      subtitle: "To guide you every step of the way",
    },
  ];

  const totalValue = benefitItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
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
            amount: 499, // ₹999 in rupees (backend will multiply by 100)
            note: { client: "Monash" },
            type: "Monash",
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create order: ${res.status} - ${errorText}`);
      }

      const orderData = await res.json();

      // Check if the response has a data property (common API pattern)
      const order = orderData.data || orderData;

      return order;
    } catch (error) {
      throw error;
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      if (!paymentData.razorpay_payment_id) {
        throw new Error("Missing payment ID");
      }

      const hasAllParams =
        paymentData.razorpay_order_id &&
        paymentData.razorpay_payment_id &&
        paymentData.razorpay_signature;

      if (!hasAllParams) {
        alert(
          "Payment received! Your payment ID is: " +
          paymentData.razorpay_payment_id +
          "\n\nPlease contact support with this payment ID for manual verification."
        );
        setFormData({ name: "", email: "", phoneNumber: "" });
        setShowPaymentModal(false);
        return;
      }

      const verificationPayload = {
        name: formData.name,
        email: formData.email || null,
        phoneNumber: formData.phoneNumber || null,
        clientId: "Monash",
        frontEndClient: "Monash",
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        amount: 499, // Amount in rupees (backend will handle conversion)
      };

      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/verify-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verificationPayload),
        }
      );

      if (!verifyRes.ok) {
        const errorText = await verifyRes.text();
        throw new Error(
          `Verification failed: ${verifyRes.status} - ${errorText}`
        );
      }

      const data = await verifyRes.json();

      if (data.success) {
        // Call registration API after successful payment
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              frontEndClient: "Monash",
            }),
          });
        } catch (registrationError) {
          console.error("Registration API Error:", registrationError);
          // Continue with success flow even if registration fails
        }

        alert(
          "🎉 Payment Successful! Welcome to Monash Fitness Community! Check your email/phone for access details."
        );
        setFormData({ name: "", email: "", phoneNumber: "" });
        setShowPaymentModal(false);
      } else {
        alert(
          `❌ Payment verification failed: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
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

      if (!order.id || !order.amount) {
        throw new Error("Failed to create valid order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Monash Wellness",
        description: "Premium Fitness Community Membership",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          if (!response.razorpay_payment_id) {
            alert(
              "Payment verification failed: No payment ID received. Please try again."
            );
            setIsLoading(false);
            return;
          }

          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || order?.id,
            razorpay_signature: response.razorpay_signature || null,
          };

          try {
            await verifyPayment(paymentData);
          } catch (error) {
            alert(
              "Payment verification failed. Please contact support with payment ID: " +
              response.razorpay_payment_id
            );
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          membership_type: "Monash",
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

      rzp.on("payment.failed", function (response) {
        alert(
          `Payment failed: ${response.error.description || "Unknown error"}`
        );
        setIsLoading(false);
      });

      rzp.open();
    } catch (error) {
      alert("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form first
    if (!validateForm()) {
      return;
    }

    // Show payment modal and reset step
    setShowPaymentModal(true);
    setMobileStep(1);
  };

  return (
    <section className="w-full py-14 lg:py-16 bg-[var(--accent)] h-screen flex flex-col lg:flex-row items-center justify-center text-center xl:px-20 2xl:px-0  xl:gap-0">
      {/* <div className="max-w-screen-xl left mx-auto px-4 md:px-6"> */}
        {/* Logo */}
        {/* <div className="flex md:justify-start justify-center md:-left-10 md:-ml-35 items-center mb-7">
          <Image
            src="/Monash_Wellness_logo-removebg-preview.png"
            alt="Logo"
            width={200}
            height={200}
            className="h-20 w-20 md:h-40 md:w-40 rounded-lg"
          />
        </div> */}

        {/* Top Banner */}
        {/* <div className="md:-mt-45">
          <div className="bg-[var(--secondary)] text-[var(--secondary-foreground)] text-center p-4 rounded-2xl mb-8 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold">
              One decision. 11 days. A lighter, fresher YOU
            </p>
          </div> */}

          {/* Heading */}
          {/* <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--primary-foreground)] mb-8 leading-tight">
            See the glow, feel the difference in just 11 days - Transform with our
            ₹499 Detox Plan.
          </h1> */}

          {/* Highlight Buttons */}
        {/* </div> */}

        {/* Video + Form */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start place-items-center max-w-6xl mx-auto">
            <div className="flex flex-col w-full gap-4">
              <div className="relative flex flex-col w-full aspect-video min-h-[450px] bg-[var(--muted)] rounded-lg overflow-hidden">
              <iframe
                src="https://drive.google.com/file/d/1np6w8X-IyOpApr8G58zBl1cUolIW7xc4/preview"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>

            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 sm:px-8 sm:py-10 mt-2">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 text-left">
                {[
                  "5+ Years of Experience",
                  "5000+ Happy Client Results",
                  "Dedicated Dietitians",
                  "No Bounce Back",
                ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[var(--accent-foreground)]" />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                  {item}
                </span>
                </div>))}
              </div>
            </div>
          </div>

        <div className="w-full bg-[var(--card)] max-h-[800px] md:max-h-[750px] pt-6 md:px-6 md:pt-8 rounded-lg shadow-lg border border-[var(--border)] text-left">
          <h2 className="text-lg md:text-2xl font-bold text-[var(--primary-foreground)] text-center md:text-left px-10">Kindly fill the form to grab your free personalised one-to-one consultation</h2>
          <EmbeddedForm />
        </div>
      </div> */}


        {/* Payment Modal */}
        {/* {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" style={{zIndex: 9999}}>
            <div className="bg-white rounded-2xl p-4 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-4 md:gap-8 relative"> */}
              {/* Cross button at top right */}
              {/* <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setMobileStep(1);
                }}
                className="absolute top-2 right-4 z-10 text-slate-500 hover:text-slate-900 text-3xl"
                aria-label="Close"
              >
                &times;
              </button> */}
              
              {/* Mobile step indicator */}
              {/* <div className="md:hidden flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    mobileStep === 1 ? 'bg-[#008080] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className="w-8 h-1 bg-gray-200 rounded"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    mobileStep === 2 ? 'bg-[#008080] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                </div>
              </div> */}

              {/* Left: Payment Details */}
              {/* <div className={`${mobileStep === 1 ? "block" : "hidden"} md:block flex-1 min-w-[300px] pr-8 relative`}>
                <div className="w-full h-64 md:min-h-[400px] relative">
                  <Image
                    alt=""
                    src="/modalImage.png"
                    className="min-h-full min-w-full object-cover"
                    fill
                  />
                </div> */}
                
                {/* Mobile continue button */}
                {/* <div className="md:hidden mt-6">
                  <Button
                    onClick={() => setMobileStep(2)}
                    className="w-full bg-gradient-to-r from-[#008080] to-[#00C8C8] hover:from-[#006666] hover:to-[#00A8A8] text-white"
                  >
                    Continue to Details
                  </Button>
                </div>
              </div>
               */}
              {/* Right: User Details */}
              {/* <div
                ref={formSectionRef}
                className={`${mobileStep === 2 ? "block" : "hidden"} md:block flex-1 min-w-[300px] md:border-l border-gray-200 md:pl-8 pl-0`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Your Details
                  </h3>
                  <button
                    onClick={() => setMobileStep(1)}
                    className="md:hidden text-sm text-[#008080] hover:text-[#006666] font-medium"
                  >
                    ← Back
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="hs_name"
                      className="text-sm font-medium text-slate-700"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="hs_name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="hs_email"
                      className="text-sm font-medium text-slate-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="hs_email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="hs_phone"
                      className="text-sm font-medium text-slate-700"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="hs_phone"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      className="mt-1"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  * Name is required. Please provide either email or phone
                  number.
                </p>
                <div
                  className={`flex gap-3 mt-6 ${mobileStep === 2 ? "flex" : "hidden"
                    } md:flex`}
                >
                  <Button
                    onClick={openRazorpay}
                    disabled={isLoading || !scriptLoaded}
                    className="flex-1 bg-gradient-to-r from-[#008080] to-[#00C8C8] hover:from-[#006666] hover:to-[#00A8A8] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Pay ₹499 & Join Now
                      </>
                    )}
                  </Button>
                </div>
                {!scriptLoaded && (
                  <p className="mt-2 text-sm text-slate-500 text-center">
                    Loading payment gateway...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div> */}
     <div className="flex lg:w-1/3 xl:w-[600px] 2xl:w-1/3 flex-col items-center justify-center lg:items-start lg:justify-start mt-10  lg:mt-0 gap-4">
        <h4 className="text-sm md:text-4xl lg:text-lg xl:text-2xl 2xl:text-3xl text-white text-center lg:text-left font-bold italic">Still looking to get fitness? <br /><span className="text-lg md:text-4xl lg:mt-0 lg:text-xl xl:text-4xl 2xl:text-4xl">It's not you. It’s the system you were following</span></h4>

        <p className="text-gray-100 font-medium text-lg md:text-3xl px-6 lg:px-0 lg:text-left lg:text-lg xl:text-2xl 2xl:text-2xl mt-4">The <span className="text-white font-bold">Monash Program</span> for Wellness adapts to your routine, stress, and lifestyle — so progress feels natural, not overwhelming.</p>

        <Link href="/app" className="mt-5 hidden lg:block bg-gray-200 text-black cursor-pointer font-semibold text-lg ring-1 px-4 py-2 rounded-xl text-center">Join Now For Free</Link>
      </div>
      <Image src="/HWD_Mockup.png" alt="mockup" width={500} height={500} className=" lg:w-[48vw] xl:w-[46vw] 2xl:w-[44vw]" />
      <Link href="/app" className="w-1/2 block lg:hidden bg-white text-black cursor-pointer font-semibold text-lg ring-1 px-4 py-2 rounded-xl text-center">Join Now For Free</Link>
    </section>
  );
}
