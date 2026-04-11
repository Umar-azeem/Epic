"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Globe, Lock, Check, Users, BarChart3, Shield } from "lucide-react";

export default function KidsWebServices() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companies = [
    { name: "Fortnite", icon: "🎮" },
    { name: "Milestone", icon: "🏁" },
    { name: "Among Us", icon: "👾" },
    { name: "2K Games", icon: "🎯" },
    { name: "Rocket League", icon: "🚀" },
    { name: "Bungie", icon: "🌙" },
    { name: "Riot Games", icon: "⚔️" },
    { name: "Innersloth", icon: "🔴" },
    { name: "Fall Guys", icon: "👖" },
    { name: "EA", icon: "🏆" },
    { name: "Marmalade", icon: "🍊" },
  ];

  const features = [
    {
      title: "Parent Verification",
      icon: Shield,
      description: "Market-leading parent verification solution that enables developers to obtain parental consent globally.",
      points: ["AgeGraph network of verified parents", "Reduce parent friction", "Improve completion rates"],
    },
    {
      title: "Age Verification",
      icon: Lock,
      description: "Effective age assurance solution that preserves privacy with multiple verification methods.",
      points: ["Privacy-focused methods", "No data storage", "Multiple verification options"],
    },
    {
      title: "Consent Management",
      icon: Users,
      description: "Flexible consent tools tailored to your specific needs and global regulations.",
      points: ["Regulatory compliance", "Parent empowerment", "Customizable flows"],
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Global Support",
      description: "Designed for maximum flexibility to navigate youth data privacy laws worldwide",
    },
    {
      icon: BarChart3,
      title: "Scalable Solutions",
      description: "Built to handle millions of concurrent users across multiple account systems",
    },
    {
      icon: Check,
      title: "Completely Free",
      description: "No upfront costs, recurring charges, or volume restrictions for any developer",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Register with KWS",
      description: "Using your Epic Games sign-in details, register directly with KWS as the first/sole user for your organization.",
    },
    {
      number: 2,
      title: "Setup your organization",
      description: "KWS prompts you to set up your organization and invite colleagues to join your team.",
    },
    {
      number: 3,
      title: "Configure your product",
      description: "Set up your product in KWS and get it ready to integrate with KWS.",
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Kids Web Services
          </h1>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-green-400 transition">
              Features
            </a>
            <a href="#why" className="hover:text-green-400 transition">
              Why KWS
            </a>
            <a href="#partners" className="hover:text-green-400 transition">
              Partners
            </a>
          </div>
          <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
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

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-12 animate-float">
            <div className="inline-block px-4 py-2 rounded-full bg-green-600 bg-opacity-20 border border-green-500 border-opacity-30">
              <p className="text-sm text-green-300">Youth Safety & Compliance</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              Tools to help developers manage{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                youth audiences at scale
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Kids Web Services is built to enable safer digital experiences for young
              audiences. Navigate global parental consent and verification requirements
              with confidence. Free for all developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 flex items-center justify-center gap-2">
                Get Started Now
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </button>
              <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-bold text-lg transition">
                View Docs
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { label: "Verified Parents", value: "25M+" },
              { label: "PreVerified Adults", value: "30M+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gray-900 border border-gray-800 text-center hover:border-green-500 transition"
              >
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-green-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Complete Youth Safety Suite</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Services designed to handle the complexities of global parental consent and youth privacy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-green-600 transition hover:bg-gray-800"
                >
                  <Icon className="text-green-400 mb-6" size={40} />
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose KWS */}
      <section id="why" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why choose Kids Web Services?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The most widely deployed parent verification solution in the market
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-green-600 transition">
                  <Icon className="text-green-400 mb-6" size={40} />
                  <h4 className="text-2xl font-bold mb-3">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AgeGraph Section */}
      <section className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6">Boost parental consent completion rates</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Use the power of our AgeGraph, a vast and rapidly-growing network of pre-verified parents from around the world, to maximize completion and improve the experience for children and their parents.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Once a parent or guardian has been verified using KWS, they do not need to re-verify with any other app or service that uses KWS technology and can skip straight to managing consent for their child.
              </p>
              <div className="space-y-4">
                {[
                  "Reduce friction in the verification process",
                  "Reuse verification across multiple services",
                  "Increase completion rates significantly",
                  "Better user experience for parents",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="text-green-400 flex-shrink-0" size={24} />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">👨‍👩‍👧‍👦</div>
                <p className="text-gray-400">AgeGraph Network</p>
                <p className="text-3xl font-bold text-green-400 mt-4">30M+ Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Trusted by leading developers</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Major studios and indie developers rely on KWS for youth safety
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {companies.map((company, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-green-500 transition hover:scale-105"
              >
                <div className="text-center">
                  <span className="text-4xl block mb-2">{company.icon}</span>
                  <p className="text-sm font-semibold">{company.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Challenge Section */}
      <section className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-8 text-center">The Global Challenge with Parental Consent and Verification</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Global regulation is complex and challenging, with many different jurisdictions and countries evolving their requirements in real time. Getting the flow right for permissions, consent, and verification for youth audiences and parents in games and online platforms is a huge challenge.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            KWS consists of services that can be used individually or in conjunction, depending on your requirements. Our comprehensive suite adapts to your needs while maintaining the highest standards of youth safety and privacy.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Get Started with KWS</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simple integration process in 3 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 mb-6 font-bold text-xl">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-gray-400 text-sm mb-6">{step.description}</p>
                  <a href="#" className="text-green-400 hover:text-green-300 font-semibold text-sm flex items-center gap-2">
                    Learn more <ArrowRight size={16} />
                  </a>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-gradient-to-r from-green-600 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Ready to protect your young audience?</p>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
              Register Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              {
                q: "Is Kids Web Services really free?",
                a: "Yes, KWS is completely free for developers and parents. There are no upfront costs, recurring charges, or volume restrictions.",
              },
              {
                q: "Which countries and regulations does KWS support?",
                a: "KWS is designed to support global youth privacy regulations including COPPA, GDPR, LGPD, and many others. We continuously update to support new regulations.",
              },
              {
                q: "What is the AgeGraph?",
                a: "The AgeGraph is our network of verified parents and users. Once verified, users don't need to re-verify across other KWS-enabled services, improving completion rates.",
              },
              {
                q: "How do we integrate KWS into our game?",
                a: "Integration is straightforward. Register on the Developer Portal, configure your product, and follow our documentation for your platform.",
              },
              {
                q: "Can we use KWS alongside other services?",
                a: "Yes, KWS services can be used individually or combined. You choose which services fit your needs.",
              },
              {
                q: "What happens to user data collected by KWS?",
                a: "KWS is designed with privacy in mind. Data is minimized, secured, and used only for verification and compliance purposes.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="text-green-400">Q:</span> {faq.q}
                </h4>
                <p className="text-gray-400 flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">A:</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-4xl font-bold">Protect young audiences responsibly</h3>
          <p className="text-lg text-gray-100">
            KWS makes it easy to comply with global regulations while creating safe, enjoyable experiences for young players.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition">
              Get Started Today
            </button>
            <button className="border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-bold transition">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">Platform</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400">Features</a></li>
                <li><a href="#" className="hover:text-green-400">Pricing</a></li>
                <li><a href="#" className="hover:text-green-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400">Documentation</a></li>
                <li><a href="#" className="hover:text-green-400">API Reference</a></li>
                <li><a href="#" className="hover:text-green-400">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400">About</a></li>
                <li><a href="#" className="hover:text-green-400">Contact</a></li>
                <li><a href="#" className="hover:text-green-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-green-400">Terms</a></li>
                <li><a href="#" className="hover:text-green-400">Privacy</a></li>
                <li><a href="#" className="hover:text-green-400">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Epic Games, Inc. All rights reserved. Kids Web Services.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}