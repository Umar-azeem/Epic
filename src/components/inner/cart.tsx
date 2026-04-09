"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { ExternalLink, Gift } from "lucide-react";
import { Star } from "../icons/indexs";

export default function Cart() {
  return (
    <div className="flex flex-col p-4 md:p-0 my-4">
      <div className="flex flex-col md:flex-row justify-between mb-8 text-white ">
        <h1 className="text-4xl font-bold hidden md:flex">My Wishlist</h1>
        <div className="flex items-center gap-4 pt-8 md:p-0">
          <div className="flex items-center gap-2 px-4 py-2 transition-colors cursor-pointer">
            <span className="text-sm font-medium">Epic Rewards</span>
            <ExternalLink size={16} />
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm font-semibold">
              $0.00
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2  transition-colors cursor-pointer">
            <span className="text-sm font-medium">Account Balance</span>
            <ExternalLink size={16} />
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm font-semibold">
              $0.00
            </span>
          </div>
        </div>
        <h1 className="text-4xl font-bold md:hidden flex border-t border-btn-secondary pt-8">
          My Wishlist
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-btn-cmpt border-[#2a2a2f] text-white">
          <CardContent className="p-6 flex md:flex-row flex-col gap-5 ">
            <Image
              src="/img/gloomy-eyes.png"
              alt="Viewfinder"
              width={100}
              height={100}
              className="rounded-md w-full h-48 md:w-40 md:h-48 object-cover"
            />
            <div className="flex-1 space-y-1 md:space-y-3">
              <span className="inline-block bg-[#2a2a2f] px-2 py-0.5 text-xs rounded">
                Base Game
              </span>

              <h3 className="text-lg font-semibold">Viewfinder</h3>

              <Card className="w-full text-white flex p-0 flex-row max-w-sm bg-transparent border border-text-clr/60">
                <div className="w-full flex p-3">
                  {" "}
                  <Image
                    src={"/img/7+.png"}
                    width={100}
                    height={100}
                    alt="Game screenshot"
                    className="w-14 h-14 object-cover "
                  />
                  <CardHeader className="w-full p-2">
                    <CardTitle className="">7+</CardTitle>
                    <CardDescription>Fear, Mild Violence </CardDescription>
                  </CardHeader>
                </div>
              </Card>
              <div className="flex items-center gap-2 text-sm text-yellow-400">
                <Star className="w-4 h-4" />
                Earn 5% back in Epic Rewards
              </div>
              <p className="text-sm text-gray-400">Self-Refundable</p>
              <div className="flex items-center justify-between gap-4 pt-2 w-full">
                <button className="text-sm text-gray-400 hover:text-white">
                  Remove
                </button>
                <Button
                  variant="outline"
                  className=" text-white hover:text-white bg-transparent hover:bg-text-clr-light"
                >
                  Move to wishlist
                </Button>
              </div>
            </div>
            <div className="text-lg font-semibold">$12.49</div>
          </CardContent>
        </Card>
        <Card className=" bg-transparent border-none text-white h-fit">
          <CardContent className="p-4 space-y-4">
            <h2 className=" text-2xl font-bold ">Games and Apps Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span>$12.49</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Taxes</span>
              <span>Calculated at Checkout</span>
            </div>
            <Separator className="bg-[#2a2a2f]" />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>$12.49</span>
            </div>
            <Button className="w-full bg-[#26bbff] hover:bg-[#1aa7e6] text-black font-semibold">
              Check Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
