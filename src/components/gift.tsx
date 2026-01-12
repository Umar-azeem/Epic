"use client"
import React, { useState } from 'react';
import { Wishlist } from './icons';

export default function Gift() {
  const [activeTab, setActiveTab] = useState('sent');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unopened', label: 'Unopened' },
    { id: 'received', label: 'Received' },
    { id: 'sent', label: 'Sent' }
  ];

  return (
    <div className="min-h-screen ">
      <div className="">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 font-medium transition relative ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        {activeTab === "all" && (
          <div className="text-center py-20">
            <Wishlist className="w-16 h-16 mx-auto mb-4 text-blue-400"  />
            <h2 className="text-xl font-semibold text-white mb-2">No gifts yet...</h2>
            <p className="text-gray-400 mb-6">All your gifts will appear here.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition">
              Browse Games
            </button>
          </div>
        )}

        {activeTab === "unopened" && (
          <div className="text-center py-20">
            <Wishlist className="w-16 h-16 mx-auto mb-4 text-blue-400"  />
            <h2 className="text-xl font-semibold text-white mb-2">No unopened gifts...</h2>
            <p className="text-gray-400 mb-6">Gifts you haven't opened yet will appear here.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition">
              Browse Games
            </button>
          </div>
        )}

        {activeTab === "received" && (
          <div className="text-center py-20">
            <Wishlist className="w-16 h-16 mx-auto mb-4 text-blue-400"  />
            <h2 className="text-xl font-semibold text-white mb-2">No received gifts...</h2>
            <p className="text-gray-400 mb-6">Gifts you've received will appear here.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition">
              Browse Games
            </button>
          </div>
        )}

        {activeTab === "sent" && (
          <div className="text-center py-20">
            <Wishlist className="w-16 h-16 mx-auto mb-4 text-blue-400"  />
            <h2 className="text-xl font-semibold text-white mb-2">No sent gifts...</h2>
            <p className="text-gray-400">Thinking of treating someone? Find a game in the store and gift it to a friend.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md mt-6 transition">
              Browse Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
}