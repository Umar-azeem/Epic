"use client";
import React, { useState } from "react";
import { Face, Store, X, Yt } from "./icons";
import Link from "next/link";
import { ChevronDown, CircleArrowUp } from "lucide-react";

const footerData = [
  {
    title: "Games",
    links: [
      { name: "Fortnite", href: "#" },
      { name: "Fall Guys", href: "#" },
      { name: "Rocket League", href: "#" },
      { name: "Unreal Tournament", href: "#" },
      { name: "Infinity Blade", href: "#" },
      { name: "Shadow Complex", href: "#" },
      { name: "Robo Recall", href: "#" },
    ],
  },
  {
    title: "Marketplaces",
    links: [
      { name: "Epic Games Store", href: "#" },
      { name: "Fab", href: "#" },
      { name: "Sketchfab", href: "#" },
      { name: "ArtStation", href: "#" },
      { name: "Store Refund Policy", href: "#" },
      { name: "Store EULA", href: "#" },
    ],
  },
  {
    title: "Tools",
    links: [
      { name: "Unreal Engine", href: "#" },
      { name: "UEFN", href: "#" },
      { name: "MetaHuman", href: "#" },
      { name: "Twinmotion", href: "#" },
      { name: "Megascans", href: "#" },
      { name: "RealityScan", href: "#" },
      { name: "RAD Game Tools", href: "#" },
    ],
  },
  {
    title: "Online Services",
    links: [
      { name: "Epic Online Services", href: "#" },
      { name: "Kids Web Services", href: "#" },
      { name: "Services Agreement", href: "#" },
      { name: "Acceptable Use Policy", href: "#" },
      { name: "Trust Statement", href: "#" },
      { name: "Subprocessor List", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Newsroom", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Students", href: "#" },
      { name: "UX Research", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Dev Community", href: "#" },
      { name: "MegaGrants", href: "#" },
      { name: "Support-A-Creator", href: "#" },
      { name: "Creator Agreement", href: "#" },
      { name: "Distribute on Epic Games", href: "#" },
      { name: "Unreal Engine Branding Guidelines", href: "#" },
      { name: "Fan Art Policy", href: "#" },
      { name: "Community Rules", href: "#" },
      { name: "EU Digital Services Act Inquiries", href: "#" },
      { name: "Epic Pro Support", href: "#" },
    ],
  },
];

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <footer className="bg-compt-bg text-text-clr-light">
      <div className="container flex flex-col justify-center m-auto">
        {/* Mobile View: ≤768px */}
        <div className="md:hidden">
          {/* STORE Title & Social Icons */}
          <div className="text-center py-8 border-b border-[#3A3A3E]">
            <h2 className="text-white text-2xl font-bold mb-6">STORE</h2>
            <div className="flex justify-center gap-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Face className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Yt className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Accordion Sections */}
          <div>
            {footerData.map((section) => (
              <div key={section.title} className="border-b border-[#3A3A3E]">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between py-5 px-4 text-left"
                >
                  <span className="text-white font-semibold text-lg">{section.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white transition-transform duration-300 ${
                      expandedSection === section.title ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSection === section.title ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <ul className="space-y-3 px-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[15px] font-medium text-text-clr-light hover:text-white transition-colors block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Copyright - Mobile */}
          <div className="px-4 py-8 text-center text-gray-500 text-xs leading-relaxed">
            <p>
              © 2026, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere.
            </p>
          </div>
        </div>

        {/* Desktop View: >768px */}
        <div className="hidden md:block">
          {/* Header with STORE and Social Icons */}
          <div className="w-full mx-auto px-7">
            <div className="flex justify-between items-center border-b py-8 border-[#3A3A3E]">
              <Store className="w-15 h-15" />
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Face className="w-7 h-7" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-7 h-7" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Yt className="w-7 h-7" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="w-full mx-auto px-7 py-9">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {footerData.map((section) => (
                <div key={section.title}>
                  <h3 className="text-white text-xl font-bold mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[15px] font-medium hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Copyright and Back to Top */}
            <div className="border-t border-[#3A3A3E] pt-8 flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <p className="text-[14px] font-normal text-text-clr-light max-w-4xl">
                  © 2026, Epic Games, Inc. All rights reserved. Epic, Epic Games,
                  the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal
                  Engine, the Unreal Engine logo, Unreal Tournament, and the
                  Unreal Tournament logo are trademarks or registered trademarks
                  of Epic Games, Inc. in the United States of America and
                  elsewhere. Other brands or product names are the trademarks of
                  their respective owners. Our websites may contain links to other
                  sites and resources provided by third parties. These links are
                  provided for your convenience only. Epic Games has no control
                  over the contents of those sites or resources, and accepts no
                  responsibility for them or for any loss or damage that may arise
                  from your use of them.
                </p>

                <ul className="flex flex-wrap items-center gap-6 py-10 text-sm">
                  <li>
                    <Link href="/terms-of-service" className="hover:text-white transition-colors">
                      Terms of service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">
                      Privacy policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/safety-security" className="hover:text-white transition-colors">
                      Safety & security
                    </Link>
                  </li>
                  <li>
                    <Link href="/store-refund-policy" className="hover:text-white transition-colors">
                      Store refund policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/publisher-index" className="hover:text-white transition-colors">
                      Publisher Index
                    </Link>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 text-white bg-[#3A3A3E] py-3 px-5 rounded-sm text-sm font-medium hover:bg-[#505053] transition-colors whitespace-nowrap"
              >
                Back to top
                <CircleArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}