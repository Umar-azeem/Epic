"use client";
import * as React from "react";
import Link from "next/link";
import { Map, Store } from "@/src/components/icons/index";
import { useTranslation } from "react-i18next";

// In your component

import { useIsMobile } from "./../hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import Epic from "./epic";
import { X } from "lucide-react";

const username = "umar4436";
const profileImage = "";
const languages = [
  { code: "id", name: "Bahasa Indonesia" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "da", name: "Dansk" },
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "es-419", name: "Español (LA)" },
  { code: "fil", name: "Filipino" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "hu", name: "Magyar" },
  { code: "nl", name: "Nederlands" },
  { code: "no", name: "Norsk" },
];
// const changeLanguage = (languageCode: string) => {
//   setCurrentLanguage(languageCode);
//   localStorage.setItem('preferredLanguage', languageCode);
// };
export default function Topber() {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <NavigationMenu viewport={isMobile}>
        <NavigationMenuList className="flex-wrap font-sans flex justify-between bg-app px-5  py-2 w-screen  rounded-b-lg overflow-hidden">
          <div className="flex justify-center gap-5 items-center text-white ">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="">
                <Image
                  src="/assets/icons/lll.jpg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-[25px] h-7 bg-white rounded-xs"
                />
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" md:border md:border-[#3a3a3a] bg-app border-red-900  md:rounded-lg p-0  shadow-xl">
                <h1 className="text-white font-bold text-3xl  w-full flex px-4 py-3 md:hidden">
                  Epic Games
                </h1>
                <Epic />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" className="text-white">
                <Store className="w-14 h-14 " />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="no-chevron hidden md:flex">
                <Link href="/support" className="text-white text-[15px]">
                  Support
                </Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="p-0 text-[15px] hidden md:flex">
                Distribute
              </NavigationMenuTrigger>
              <NavigationMenuContent className="border border-[#3a3a3a] rounded-lg p-1  shadow-xl">
                {" "}
                <div className=" w-64 space-y-5">
                  <div className="p-1 text-white w-full">
                    <ul className="space-y-1 ">
                      <li>
                        <a
                          href="#"
                          className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors"
                        >
                          Distribute on Epic Games Store
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center  px-3 py-2 text-[15px]    hover:bg-[#3a3a3a] rounded  transition-colors"
                        >
                          Developer forums
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="flex items-center   px-3 py-2 text-[15px]   hover:bg-[#3a3a3a] rounded  transition-colors"
                        >
                          Documentation
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="flex items-center   px-3 py-2 text-[15px]  hover:bg-[#3a3a3a] rounded  transition-colors"
                        >
                          Learning
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </div>

          <div className="hidden md:flex mr-3 relative ">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Map className="w-6 h-6 text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 absolute -right-5 z-10 bg-[#292D2F]/85 backdrop-blur-md px-4 py-3 font-medium  text-white rounded-lg shadow-xl text-md space-y-3 max-h-[420px ] overflow-y-auto "
                align="start"
              >
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    className="menu-item py-1.5  cursor-pointer  hover:bg-[#3a3a3a]  outline-transparent transition-colors" // onClick={() => changeLanguage(language.code)}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="text-white bg-transparent hover:bg-transparent"
              >
                <Button variant="default">
                  <div className="flex items-center gap-2 ">
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 absolute -right-5 z-10 bg-[#292D2F]/85 backdrop-blur-md px-4 py-2 space-y-2 font-medium  text-white rounded-lg p-1  shadow-xl  text-md "
                align="start"
              >
                <DropdownMenuItem className="flex items-center  px-3 py-2 border-none  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  {" "}
                  My Achievements
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  {" "}
                  Account Balance
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  {" "}
                  Epic Rewards
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  Gifts
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                    Coupons
                  </DropdownMenuSubTrigger>
                </DropdownMenuSub>
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  Accounts
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  Redeem code
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  redeem fortnite gift card
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  support
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center  px-3 py-2  text-[15px]  hover:bg-[#3a3a3a] rounded = transition-colors">
                  Logout Page
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavigationMenuItem className="text-samibold flex justify-center items-center">
              <Link
                href="#"
                className="bg-btn-primary hover:bg-btn-primary/75 hover:shadow-md transition-all duration-200 font-semibold px-3 py-1.5 text-sm rounded-sm"
              >
                {" "}
                Download
              </Link>
            </NavigationMenuItem>
          </div>
          <X className="text-gray-400 md:hidden flex w-6 h-6" />
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
