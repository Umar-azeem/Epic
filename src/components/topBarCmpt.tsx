import React, { useState } from "react";
import { X, Globe, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react";

import Link from "next/link";
import {
  CreditCard,
  Gift,
  Logout,
  Star,
  Store,
  Trophy,
  User,
  Wallet,
  Wishlist,
} from "./icons/indexs";
import Image from "next/image";
function TopBarCmpt({
  menuOpen,
  handleMenuToggle,
}: {
  menuOpen: boolean;
  handleMenuToggle: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [islanguageOpen, setisLanguageOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh", name: "中文" },
    { code: "ar", name: "العربية" },
    { code: "tr", name: "Türkçe" },
    { code: "pl", name: "Polski" },
    { code: "nl", name: "Nederlands" },
  ];
  const profileItems = [
    { icon: Trophy, label: "My Achievements", section: "store" },
    { icon: Star, label: "Epic Rewards", section: "store" },
    { icon: Wallet, label: "Account Balance", section: "store" },
    { icon: Gift, label: "Gifts", section: "store" },
    { icon: Store, label: "Coupons", section: "store", hasSubmenu: true },
    { icon: User, label: "Accounts", section: "store" },
    { icon: CreditCard, label: "Redeem code", section: "store" },
    { icon: Gift, label: "Redeem Fortnite Gift Card", section: "store" },
    { icon: Wishlist, label: "Wishlist", section: "store" },
    { icon: HelpCircle, label: "Support", section: "other", divider: true },
    { icon: Logout, label: "Logout Page", section: "other" },
  ];

  const menuItems = [
    { label: "Distribute on Epic Games Store", href: "/distribute" },
    { label: "Developer Forums", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Learning", href: "#" },
  ];
  const username = "umar4436";
  const profileImage = "";
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-app z-50 overflow-hidden transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-2 flex items-center justify-between ">
          {" "}
          <Store className="w-14 h-14 " />
          <button
            onClick={handleMenuToggle}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-6.5 h-6.5 " />
          </button>{" "}
        </div>
        <div className="flex items-center justify-end gap-1 px-4 py-2">
          <button
            onClick={() => setLanguageOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Globe className="w-5.5 h-5.5 text-white" />
          </button>

          <div
            className={`fixed inset-y-0 overflow-auto scroll-hidden left-0 w-full max-w-sm bg-app-secondary transform transition-transform duration-300 ease-out z-50 ${
              languageOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 flex items-center justify-between ">
              {" "}
              <Store className="w-14 h-14 " />
              <button
                onClick={handleMenuToggle}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>{" "}
            </div>
            <button
              onClick={() => setLanguageOpen(false)}
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 mr-2" />
              <span className="text-base font-medium">Back</span>
            </button>

            <nav className="max-h-screen px-6 py-2">
              <div className="">
                <h2 className="text-white text-4xl font-bold">language</h2>
              </div>
              <ul className="space-y-1">
                {languages.map((language, index) => (
                  <li
                    key={language.code}
                    className={`transform transition-all duration-300 ${
                      languageOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: languageOpen
                        ? `${(index + 1) * 30}ms`
                        : "0ms",
                    }}
                  >
                    <button
                      className="w-full text-left text-white text-base py-2 px-3 hover:bg-[#3a3a3a] rounded transition-colors"
                      onClick={() => {
                        console.log(`Selected: ${language.name}`);
                        setLanguageOpen(false); // optional auto close
                      }}
                    >
                      {language.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div
            className={`fixed overflow-auto scrollbar-hide inset-y-0 left-0 w-full max-w-sm bg-app-secondary transform transition-transform duration-300 ease-out z-50 ${
              isOpenProfile ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 flex items-center justify-between ">
              <Store className="w-14 h-14 " />
              <button
                onClick={handleMenuToggle}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>{" "}
            </div>
            <button
              onClick={() => setIsOpenProfile(false)}
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 mr-2" />
              <span className="text-base font-medium">Back</span>
            </button>

            <nav className="p-4">
              <div className="flex items-center gap-2 m-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3e3e42] overflow-hidden">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-white uppercase">
                      {username?.charAt(0)?.toLowerCase()}
                    </span>
                  )}
                </div>

                <span className="text-[15px] font-medium text-[#d1d1d1]">
                  {username}
                </span>
              </div>
              <ul className="space-y-1 p-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-4">
                  Store
                </p>
                {profileItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.divider && (
                      <div className="border-t border-gray-800 my-2" />
                    )}

                    <li
                      onClick={() => {
                        console.log(`Selected: ${item?.label}`);
                        setIsOpenProfile(false); // optional auto close
                      }}
                      className={`transform transition-all duration-300 ${
                        isOpenProfile
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isOpenProfile
                          ? `${(index + 1) * 40}ms`
                          : "0ms",
                      }}
                    >
                      <a
                        href="#"
                        className="flex items-center gap-3 text-white py-3 px-3 hover:bg-[#3a3a3a] rounded"
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.label}
                      </a>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </nav>
          </div>

          <button
            onClick={() => setIsOpenProfile(true)}
            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium transition-colors"
          >
            u
          </button>
        </div>

        <div className="px-6 pb-8">
          <h2 className="text-white text-3xl font-bold">Menu</h2>
        </div>
        <nav className="px-6">
          <div className="flex flex-col space-y-5 text-white text-start justify-center items-start ">
            <Link href="/support" className="text-white">
              Support
            </Link>
            <div className="min-h-screen  ">
              <button
                onClick={() => setIsOpen(true)}
                className=" rounded-lg   transition-colors"
              >
                Distribute
              </button>
              <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                  isOpen
                    ? "opacity-50 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
              />
              <div
                className={`fixed inset-y-0 left-0 w-full max-w-sm bg-app-secondary transform transition-transform duration-300 ease-out ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ zIndex: 1000 }}
              >
                <div className="p-4 flex items-center justify-between ">
                  {" "}
                  <Store className="w-14 h-14 " />
                  <button
                    onClick={handleMenuToggle}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>{" "}
                </div>
                <div className="flex items-center px-4 py-6 ">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center text-white hover:text-gray-300 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 mr-2" />
                    <span className="text-base font-medium">Back</span>
                  </button>
                </div>
                <div className="px-6 py-6">
                  <h2 className="text-white text-4xl font-bold">Distribute</h2>
                </div>
                <nav className="px-6">
                  <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className={`transform transition-all duration-200 ${
                          isOpen
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isOpen
                            ? `${(index + 1) * 50}ms`
                            : "0ms",
                        }}
                      >
                        <a
                          href={item.href}
                          className="block text-white text-lg py-2 hover:text-gray-300 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(`Clicked: ${item.label}`);
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0  bg-app-secondary p-4 justify-center items-center flex">
          <button className="w-full bg-btn-primary hover:bg-[#0095c8] text-white py-3 rounded-lg font-medium transition-colors">
            Download
          </button>
        </div>
      </div>
    </>
  );
}

export default TopBarCmpt;
