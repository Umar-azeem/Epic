// Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
// File: app/distribution/page.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Minus, Plus } from "lucide-react";
import faqs from "./faq.json";
import Image from "next/image";
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
export default function OnEpicGameStore() {
  return (
    <main className=" text-white min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <section className="bg-gradient-to-r from-[#040425] to-[#0C0850] text-white py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="flex flex-row text-center w-full justify-between">
              <div className="mb-4 md:flex hidden ">
                <Image
                  width={100}
                  height={100}
                  src="/img/Dir-Ani.webp"
                  alt="Epic Games Store"
                  className="w-100  mx-auto md:mx-0"
                />
              </div>
              <div className="flex flex-col items-center space-y-16">
                <Image
                  width={100}
                  height={100}
                  src="/img/logo-Epic.svg"
                  alt="Epic Games Store"
                  className="w-16 mx-auto md:mx-0"
                />
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Open to all developers and publishers
                </h2>
                <button className="bg-white text-[#0F1016] w-42 text-xs font-bold py-4 px-8 rounded-xs hover:bg-gray-200 transition">
                  SIGN UP TODAY
                </button>
                <p className="mt-4 text-sm text-gray-300">
                  Start distributing PC games on the Epic Games Store with our
                  self-service publishing tools.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="rounded-2xl w-full border border-gray-500/20 bg-gradient-to-r from-[#000000] to-[#0E0E12] p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="flex flex-col col-span-1 items-center text-center text-gray-400 md:hidden space-y-3">
              <p className="text-sm leading-relaxed">
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
                src="/img/dir-100.svg"
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
        <section className="rounded-2xl w-full border border-purple-500/30 bg-gradient-to-r from-[#000000] to-[#0E0E12] p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="flex flex-col md:hidden items-center text-center text-gray-400 space-y-4">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed max-w-md">
                Built for mobile and PC. Platform-agnostic, revenue-friendly and
                easy to set up.
              </p>
              <span className="underline text-sm lg:text-base">
                Explore Web Shops Now
              </span>
            </div>
            <div className="w-full flex justify-center md:justify-start">
              <Image
                width={600}
                height={400}
                src="/img/dir-shop.svg"
                alt="Epic Games Store"
                className="w-full h-auto max-w-[220px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px]"
              />
            </div>
            <div className="md:flex hidden flex-col items-center text-center text-gray-400 space-y-4">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed max-w-md">
                Built for mobile and PC. Platform-agnostic, revenue-friendly and
                easy to set up.
              </p>
              <span className="underline text-sm lg:text-base">
                Explore Web Shops Now
              </span>
            </div>
          </div>
        </section>
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
    </main>
  );
}
