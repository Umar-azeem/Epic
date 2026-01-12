"use client";
import React from "react";
import OverView from "./gloomy/overView";
import AddOne from "./gloomy/addOne";
import Achievements from "./gloomy/achievements";

export default function AddToCart() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "add-ons", label: "Add-Ons" },
    { id: "achievements", label: "Achievements" },
  ];

  return (
    <>
      <main className="max-w-5xl mx-auto ">
        <div className="border-b border-gray-800">
          <nav className="flex gap-8 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="grid gap-8 py-8">
          <div>
            {activeTab === "overview" && (
              <>
                <OverView />
              </>
            )}

            {activeTab === "add-ons" && (
              <>
                <AddOne />
              </>
            )}

            {activeTab === "achievements" && <>
              <Achievements />
            </>}
          </div>
        </div>
      </main>
    </>
  );
}
