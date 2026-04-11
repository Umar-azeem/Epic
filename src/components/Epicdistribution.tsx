"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Zap, Globe, Users, TrendingUp, Lock, DollarSign } from "lucide-react";

export default function EpicDistribution() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: DollarSign,
      title: "Better Revenue Split",
      description: "Keep 100% of the first $1M, then 88/12 split. Industry-leading terms for creators.",
      color: "text-green-400",
    },
    {
      icon: Globe,
      title: "295M+ Customers",
      description: "Access one of the largest digital distribution audiences in gaming.",
      color: "text-blue-400",
    },
    {
      icon: Zap,
      title: "Easy Publishing",
      description: "Self-service publishing tools make it simple to get your game live.",
      color: "text-purple-400",
    },
    {
      icon: Users,
      title: "Community & Support",
      description: "Connect with millions of gamers and get dedicated support.",
      color: "text-pink-400",
    },
    {
      icon: TrendingUp,
      title: "Marketing Tools",
      description: "Free promotional opportunities and featured placement on the store.",
      color: "text-orange-400",
    },
    {
      icon: Lock,
      title: "Developer Friendly",
      description: "No exclusive requirements. Publish on multiple platforms simultaneously.",
      color: "text-cyan-400",
    },
  ];

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
      description: "Industry-leading 88% share on revenue exceeding $1M annually",
      highlight: false,
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up with your Epic Games account and set up your developer profile.",
    },
    {
      number: 2,
      title: "Submit Your Game",
      description: "Fill out game details, set pricing, and upload your builds.",
    },
    {
      number: 3,
      title: "Technical Review",
      description: "We review for technical quality and general guidelines compliance.",
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
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
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

        <div className="max-w-7xl mx-auto relative z-10">
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
              Distribute your games on the Epic Games Store. Keep 100% of the first
              $1M, then 88/12 split. No exclusivity. Access 295M+ customers with
              industry-leading terms.
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
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { label: "Platform Reach", value: "295M+" },
              { label: "Revenue Share (Year 1)", value: "100%" },
              { label: "Ongoing Share", value: "88%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gray-900 border border-gray-800 text-center hover:border-blue-500 transition"
              >
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-blue-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why choose Epic Games Store?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful tools and features designed to help your game succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>

      {/* Revenue Split Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Industry-Leading Revenue Share</h3>
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
                <h4 className={`text-2xl font-bold mb-2 ${tier.highlight ? "text-white" : ""}`}>
                  {tier.name}
                </h4>
                <p className={`text-sm mb-6 ${tier.highlight ? "text-gray-100" : "text-gray-400"}`}>
                  {tier.description}
                </p>
                <div className="space-y-3 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {tier.highlight ? "" : "Annual Revenue"}
                    </p>
                    <p className={`text-lg font-bold ${tier.highlight ? "text-white" : "text-blue-400"}`}>
                      {tier.revenue}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Your Cut / Platform
                    </p>
                    <p className={`text-3xl font-bold ${tier.highlight ? "text-white" : "text-cyan-400"}`}>
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
      <section id="process" className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Simple Publishing Process</h3>
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Complete Developer Support</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to publish and succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-900 transition"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-4xl font-bold">Ready to publish?</h3>
          <p className="text-lg text-gray-100">
            Join hundreds of developers distributing their games on Epic Games Store.
            Get better terms. Reach millions of players. Grow your business.
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
      <section className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              {
                q: "Do I need to be exclusive to Epic Games Store?",
                a: "No, there are no exclusivity requirements. You can publish on any platform simultaneously.",
              },
              {
                q: "When do I get the better revenue split?",
                a: "Immediately! You keep 100% of the first $1M in net revenue per product per year, then 88/12 after that.",
              },
              {
                q: "How long is the review process?",
                a: "Our technical review typically takes 1-2 weeks. We focus on quality and guideline compliance, not content curation.",
              },
              {
                q: "What platforms does Epic Games Store support?",
                a: "We support Windows PC, with mobile support through Epic Games App on iOS and Android.",
              },
              {
                q: "Do you offer marketing support?",
                a: "Yes! Free promotional opportunities, featured placement, and marketing support to help your game succeed.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="text-blue-400">Q:</span> {faq.q}
                </h4>
                <p className="text-gray-400 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">A:</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400">Developer Portal</a></li>
                <li><a href="#" className="hover:text-blue-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400">Discord</a></li>
                <li><a href="#" className="hover:text-blue-400">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Epic Games, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}