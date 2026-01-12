"use client"
import { useState } from "react";
import { Mail, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function Wishlist() {
  const [isSubscribed, setIsSubscribed] = useState(true);
  return (
    <div className="min-h-screen text-white">
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <h1 className="text-4xl font-bold">My Wishlist</h1>
        <div className="flex items-center gap-4">
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
      </div>
      <div className="px-8">
        <div className="mt-6">
          <div className="flex items-center justify-between bg-[#1a1a1a] border-l-4 border-blue-500 px-6 py-4 rounded">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-400" size={20}/>
              <span className="text-sm">
                You are subscribed to wishlist email notifications.{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  Manage Preferences
                  <ExternalLink size={14} />
                </a>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="subscription"
                checked={isSubscribed}
                onCheckedChange={setIsSubscribed}
                className="bg-red-500 "
              />
              <Label htmlFor="subscription">
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-32">
          <h2 className="text-3xl font-bold text-center mb-6">
            You haven{`'`}t added anything to
            <br />
            your wishlist yet.
          </h2>
          <Button
            className=" flex-1 h-10 bg-sky-400 text-sm font-medium  hover:bg-sky-500 text-black rounded-md"
          >
            Shop for Games & Apps
          </Button>
        </div>
      </div>
    </div>
  );
}
