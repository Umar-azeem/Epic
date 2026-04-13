"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent } from "./ui/card";
import faqs from "../app/distribute/components/faq.json";


export default function EpicDistribution() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  const tiers = [
    {
      name: "First Million",
      revenue: "$0 - $1M/year per product",
      split: "100% / 0%",
      description: "Keep everything from your first million in annual revenue",
      highlight: true,
    },
    {
      name: "Beyond",
      revenue: "Over $1M/year",
      split: "88% / 12%",
      description:
        "Industry-leading 88% share on revenue exceeding $1M annually",
      highlight: false,
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description:
        "Sign up with your Epic Games account and set up your developer profile.",
    },
    {
      number: 2,
      title: "Submit Your Game",
      description:
        "Fill out game details, set pricing, and upload your builds.",
    },
    {
      number: 3,
      title: "Technical Review",
      description:
        "We review for technical quality and general guidelines compliance.",
    },
    {
      number: 4,
      title: "Go Live",
      description: "Your game launches on the Epic Games Store instantly.",
    },
  ];

  const benefits = [
    "No exclusivity requirements",
    "Publish simultaneously on other platforms",
    "Free game promotion opportunities",
    "Featured store placement",
    "Marketing support",
    "Community engagement tools",
    "Cross-platform game services",
    "Free store analytics",
  ];
const features = [
  {
    title: "Reach a Global Audience",
    desc: "Direct distribution to over 295 million Epic users across 187 countries with 16 languages supported.",
    icon: "/img/world.svg",
  },
  {
    title: "100% / 0% Revenue Share",
    desc: "Keep 100% revenue share on the first $1M in net revenue per product, per year. Afterwards, return to our standard 88%/12% model.",
    icon: "/img/grph.svg",
  },
  {
    title: "Drive Player Engagement",
    desc: "Tap into store features like wishlists, achievements, store-wide promotions and more!",
    icon: "/img/trphy.svg",
  },
  {
    title: "Worldwide E‑Commerce",
    desc: "Epic's payment service supports 80+ payment methods with 43 regional currencies and more on the way.",
    icon: "/img/bio.svg",
  },
  {
    title: "Epic Account Balance",
    desc: "Users can load up their balance with funds to spend on products and services in the store, now available in more than 187 countries.",
    icon: "/img/wallet.svg",
  },
  {
    title: "Additional Benefits",
    desc: "Easy IARC ratings in Epic Developer Portal, request no-cost localization for store pages and activate our Support-A-Creator affiliate network.",
    icon: "/img/save-w.svg",
  },
];
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Epic Games Store
          </h1>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-blue-400 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition">
              Revenue Split
            </a>
            <a href="#process" className="hover:text-blue-400 transition">
              How to Publish
            </a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition">
            Start Publishing
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative space-y-5 pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>

        <div className="max-w-7xl mx-auto relative z-10 py-6">
          <div className="text-center space-y-6 mb-12 animate-float">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30">
              <p className="text-sm text-blue-300">Distribution Platform</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              Better terms for{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                game creators
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Distribute your games on the Epic Games Store. Keep 100% of the
              first $1M, then 88/12 split. No exclusivity. Access 295M+
              customers with industry-leading terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </button>
              <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-bold text-lg transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <div className=" rounded-xl bg-app text-center hover:border-blue-500 transition">
             <div className=" p-6 flex flex-col  justify-start text-start " > <p className="text-gray-400 text-sm mb-2">
                {" "}
                Keep 100% revenue share on your first $1M in net revenue per
                product, per year. Afterwards, return to our standard 88% / 12%
                model.
              </p>
              <p className="text-4xl font-bold "> <span className="underline text-sm lg:text-base">
                      Visit our FAQ
                    </span></p></div>
              <section className=" w-full bg-gradient-to-r from-[#000000] to-[#0E0E12] p-4 md:p-8 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
                  <div className="flex flex-col col-span-1 items-center text-center text-gray-400 md:hidden space-y-3">
                    <p className="text-sm leading-relaxed"></p>
                  </div>
                  <div className="w-full col-span-3 flex justify-center md:justify-start">
                    <Image
                      width={600}
                      height={600}
                      src="/img/dir-100.svg"
                      alt="Epic Games Store"
                      className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                    />
                  </div>
                  <div className="hidden md:flex flex-col col-span-1 items-center text-center text-gray-400 space-y-4">
                   
                   
                  </div>
                </div>
              </section>
            </div>
            <div className=" rounded-xl bg-app text-center hover:border-blue-500 transition">
             <div className=" p-6 flex flex-col  justify-start text-start " > <p className="text-gray-400 text-sm mb-2">
                {" "}
                Keep 100% revenue share on your first $1M in net revenue per
                product, per year. Afterwards, return to our standard 88% / 12%
                model.
              </p>
              <p className="text-4xl font-bold "> <span className="underline text-sm lg:text-base">
                      Visit our FAQ
                    </span></p></div>
              <section className=" w-full bg-gradient-to-r from-[#000000] to-[#0E0E12] p-4 md:p-8 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
                  <div className="flex flex-col col-span-1 items-center text-center text-gray-400 md:hidden space-y-3">
                    <p className="text-sm leading-relaxed"></p>
                  </div>
                  <div className="w-full col-span-3 flex items-center justify-center">
                    <Image
                      width={600}
                      height={600}
                      src="/img/dir-shop.svg"
                      alt="Epic Games Store"
                      className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                    />
                  </div>
                  <div className="hidden md:flex flex-col col-span-1 items-center text-center text-gray-400 space-y-4">
                   
                   
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
<div className="space-y-10 p-20">

              <section className="grid md:grid-cols-3 gap-4 ">
                {features.map((item) => (
                  <Card
                    key={item.title}
                    className="bg-bg-transparent border-white/20"
                  >
                    <CardContent className="p-8 text-center space-y-4 md:space-y-12 justify-center items-center flex flex-col">
                      <Image
                        width={100}
                        height={100}
                        src={item.icon}
                        alt="Epic Games Store"
                        className="w-40  mx-auto md:mx-0"
                      />
                      <h3 className="text-2xl font-normal text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-lg font-bold">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </section>
              <section className="rounded-2xl w-full border border-gray-500/20 bg-gradient-to-r from-[#000000] to-[#0E0E12] p-2 md:p-8 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3  md:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
                  <div className="flex flex-col col-span-1 items-center text-center text-gray-400 md:hidden space-y-3">
                    <p className="text-sm text-center leading-relaxed">
                      Keep 100% revenue share on your first $1M in net revenue per
                      product, per year. Afterwards, return to our standard 88% / 12%
                      model.
                    </p>
                    <span className="underline text-sm">Visit our FAQ</span>
                  </div>
                  <div className="w-full col-span-2 flex justify-center md:justify-start">
                    <Image
                      width={600}
                      height={400}
                      src="/img/rocketEpic.svg"
                      alt="Epic Games Store"
                      className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                    />
                  </div>
                  <div className="hidden md:flex flex-col col-span-1 items-center text-center text-gray-400 space-y-4">
                    <p className="w-86 text-sm lg:text-base leading-relaxed">
                      Keep 100% revenue share on your first $1M in net revenue per
                      product, per year. Afterwards, return to our standard 88% / 12%
                      model.
                    </p>
                    <span className="underline text-sm lg:text-base">
                      Visit our FAQ
                    </span>
                  </div>
                </div>
              </section>
      
              <section className="">
                <div className="w-full mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
                    <div className=" rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#101116] to-[#162731] overflow-hidden">
                      <div className="flex flex-col w-full justify-center bg-gradient-to-br from-[#0F1016] to-[#0E1128] opacity-70" />
                      <div className="w-48 flex">
                        <Image
                          width={600}
                          height={400}
                          src="/img/epic-dev.svg"
                          alt="Epic Games Store"
                          className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                        />
                      </div>
                      <div>
                        {" "}
                        <p className="text-gray-400 text-sm mb-4">
                          Join the discussion or create topics for community support
                          around distribution
                        </p>
                        <a className="text-blue-400 text-sm hover:underline">
                          Go to the community
                        </a>
                      </div>
                    </div>
                    <div className="relative rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#101116] to-[#162731] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1016] to-[#0E1128] opacity-70" />
                      <div>
                        <Image
                          width={600}
                          height={400}
                          src="/img/epic+unreal.svg"
                          alt="Epic Games Store"
                          className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
                        />
                      </div>
                      <div className="">
                        <h3 className="text-white text-xl font-semibold mb-2">
                          EPIC GAMES DEV
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Join the discussion or create topics for community support
                          around distribution
                        </p>
                        <a className="text-blue-400 text-sm hover:underline">
                          Go to the community
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
      
              <section className="">
                <div className="max-w-7xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                      className="rounded-2xl p-6 border border-white/10 bg-[linear-gradient(90deg,#0E1128_0%,#0E1128_47%,#14152B_53%,#101010_100%)]
      "
                    >
                      <div className="flex flex-row justify-center items-center">
                        <Image
                          width={100}
                          height={100}
                          src="/img/url-en.svg"
                          alt="Epic Games Store"
                          className="w-40"
                        />
                        <div className="flex flex-col p-6 m-4">
                          <p className="text-gray-400 text-md text-center  w-10">
                            The world{`'`}s most open and advanced real-time 3D
                            creation tool
                          </p>
                          <a className="text-blue-400 text-sm hover:underline">
                            Learn more
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className=" rounded-2xl p-6 border border-white/10 bg-[linear-gradient(90deg,#1A0C47_0%,#1A0C47_45%,#15112A_55%,#0F1012_100%)]
      "
                    >
                      <div className="flex flex-row justify-center items-center">
                        <Image
                          width={100}
                          height={100}
                          src="/img/epic-on.svg"
                          alt="Epic Games Store"
                          className="w-40"
                        />
                        <div className="flex flex-col p-6 m-4">
                          {" "}
                          <p className="text-gray-400 text-md text-center mb-4 w-10">
                            Modular online services to connect your community across
                            platforms
                          </p>
                          <a className="text-blue-400 text-sm hover:underline">
                            Explore our services
                          </a>
                        </div>
                      </div>
                    </div>
      
                    <div className="rounded-2xl p-6 border border-white/10 bg-[linear-gradient(90deg,#4B2A7A_0%,#4B2A7A_35%,#1A1326_65%,#0C0A12_100%)]">
                      <div className="flex flex-row justify-center items-center">
                        <Image
                          width={100}
                          height={100}
                          src="/img/kws.png"
                          alt="Epic Games Store"
                          className="w-40 h-40"
                        />
                        <div className="flex flex-col p-6 m-4">
                          {" "}
                          <p className="text-gray-400 text-md text-center mb-4 w-10">
                            The leading parent verification and consent management
                            toolkit
                          </p>
                          <a className="text-blue-400 text-sm hover:underline">
                            Learn more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="max-w-4xl mx-auto ">
                <h2 className="text-4xl font-bold text-center mb-10 ">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border-white/10"
                    >
                      <AccordionTrigger className="[&>svg]:hidden flex justify-between hover:text-btn-primary items-center text-left group">
                        <span>{faq.q}</span>
                        <span className="ml-4">
                          <Plus className="h-5 w-5 group-data-[state=open]:hidden" />
                          <Minus className="h-5 w-5 hidden group-data-[state=open]:block" />
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
</div>
      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-gray-950 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              Why choose Epic Games Store?
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful tools and features designed to help your game succeed
            </p>
          </div>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-600 transition hover:bg-gray-800"
                >
                  <Icon className={`${feature.color} mb-4`} size={32} />
                  <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div> */}
        </div>
      </section>

      {/* Revenue Split Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              Industry-Leading Revenue Share
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Keep more of what you earn. No other platform offers better terms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl border transition ${
                  tier.highlight
                    ? "bg-gradient-to-br from-blue-600 to-blue-500 border-transparent"
                    : "bg-gray-900 border-gray-800 hover:border-blue-600"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    BEST VALUE
                  </div>
                )}
                <h4
                  className={`text-2xl font-bold mb-2 ${tier.highlight ? "text-white" : ""}`}
                >
                  {tier.name}
                </h4>
                <p
                  className={`text-sm mb-6 ${tier.highlight ? "text-gray-100" : "text-gray-400"}`}
                >
                  {tier.description}
                </p>
                <div className="space-y-3 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {tier.highlight ? "" : "Annual Revenue"}
                    </p>
                    <p
                      className={`text-lg font-bold ${tier.highlight ? "text-white" : "text-blue-400"}`}
                    >
                      {tier.revenue}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Your Cut / Platform
                    </p>
                    <p
                      className={`text-3xl font-bold ${tier.highlight ? "text-white" : "text-cyan-400"}`}
                    >
                      {tier.split}
                    </p>
                  </div>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    tier.highlight
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "border border-gray-600 hover:border-blue-400"
                  }`}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publishing Process */}
      <section
        id="process"
        className="py-20 px-6 bg-gray-950 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              Simple Publishing Process
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get your game live in just 4 steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 mb-6 font-bold">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-bold mb-3">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-4xl font-bold">Ready to publish?</h3>
          <p className="text-lg text-gray-100">
            Join hundreds of developers distributing their games on Epic Games
            Store. Get better terms. Reach millions of players. Grow your
            business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition">
              Start Publishing Now
            </button>
            <button className="border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-bold transition">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
     
      {/* Footer */}
     
    </div>
  );
}
