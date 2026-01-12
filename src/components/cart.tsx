import React from 'react';
import { Gift, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Cart() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold">My Cart</h1>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 text-sm border border-gray-700 rounded px-3 py-2 hover:border-gray-500 transition">
              <span>Epic Rewards</span>
              <ExternalLink size={14} />
              <span className="px-2 py-1 bg-gray-900 rounded text-xs">$0.00</span>
            </button>
            <button className="flex items-center gap-2 text-sm border border-gray-700 rounded px-3 py-2 hover:border-gray-500 transition">
              <span>Account Balance</span>
              <ExternalLink size={14} />
              <span className="px-2 py-1 bg-gray-900 rounded text-xs">$0.00</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Item */}
          <div className="lg:col-span-2 bg-btn-cmpt rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-shrink-0">
                <Image
                width={100}
                height={100}
                  src="/img/gloomy-eyes.png" 
                  alt="Viewfinder"
                  className="w-full sm:w-36 h-48 sm:h-52 object-cover rounded"
                />
                <div className="absolute bottom-2 left-2 w-6 h-6  rounded flex items-center justify-center border border-gray-600">
                  <div className="w-3 h-3 border border-gray-400"></div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded mb-2">
                      Base Game
                    </span>
                    <h2 className="text-xl sm:text-2xl font-normal">Viewfinder</h2>
                  </div>
                  <span className="text-xl font-semibold">${'12.49'}</span>
                </div>

                <div className=" bg-opacity-60 rounded border border-gray-700 p-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-white text-black px-1.5 py-1 rounded flex flex-col items-center justify-center" style={{width: '42px', height: '48px'}}>
                      <div className="text-[8px] font-bold leading-none mb-0.5">IARC</div>
                      <div className="text-2xl font-bold leading-none">3+</div>
                    </div>
                    <span className="text-base">3+</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10"/>
                    <path d="M10 5 L13 12 L6 8 L14 8 L7 12 Z" fill="black"/>
                  </svg>
                  <span className="text-sm text-yellow-500">Earn 5% back in Epic Rewards</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm">Self-Refundable</span>
                  <div className="w-4 h-4 border border-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">?</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto justify-end">
                  <button className="text-sm text-gray-400 hover:text-white transition">
                    Remove
                  </button>
                  <button className="p-2 border border-gray-700 rounded hover:border-gray-500 transition">
                    <Gift size={18} />
                  </button>
                  <button className="text-sm px-4 py-2 border border-gray-700 rounded hover:border-gray-500 transition">
                    Move to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Games and Apps<br/>Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span>Price</span>
                <span className="font-semibold">${'12.49'}</span>
              </div>
              <div className="flex justify-between items-start">
                <span>Taxes</span>
                <span className="text-sm text-right">Calculated at Checkout</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold">${'12.49'}</span>
              </div>
            </div>

            <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black text-base font-semibold py-3.5 rounded transition">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}