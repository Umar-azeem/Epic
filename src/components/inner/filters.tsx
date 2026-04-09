"use client";

import * as React from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";

type FilterSectionProps = {
  title: string;
  items: string[];
};

const FilterSection = ({ title, items }: FilterSectionProps) => {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-sm font-medium text-white hover:no-underline">
        {title}
      </AccordionTrigger>

      <AccordionContent>
        <ul className="space-y-2 pt-2">
          {items.map((item) => (
            <li
              key={item}
              className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default function Filters() {
  return (
    <div className="w-64 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters (2)</h2>
        <button className="text-blue-400 text-sm hover:text-blue-300">
          reset
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <Input
          placeholder="Keywords"
          className="pl-9 bg-[#1b1b1f] border-[#2a2a2f] text-white placeholder:text-gray-500"
        />
      </div>

      {/* Filters */}
      <Accordion
        type="multiple"
        defaultValue={["Events"]}
        className="space-y-1"
      >
        <FilterSection
          title="Events"
          items={["Deals of the Week", "EA Classic Games on Epic", "First Run"]}
        />

        <FilterSection
          title="Price"
          items={[
            "Free",
            "Under $5.00",
            "Under $10.00",
            "Under $20.00",
            "$14.99 and above",
          ]}
        />

        <FilterSection
          title="Genre"
          items={[
            "Action",
            "Adventure",
            "RPG",
            "Shooter",
            "Simulation",
            "Strategy",
          ]}
        />

        <FilterSection
          title="Features"
          items={[
            "Achievements",
            "Cloud Saves",
            "Multiplayer",
            "Single Player",
          ]}
        />

        <FilterSection
          title="Platform"
          items={["Windows", "Mac OS", "Android", "iOS"]}
        />
      </Accordion>
    </div>
  );
}
