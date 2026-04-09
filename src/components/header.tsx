"use client";
import { Bookmark, ChevronDown, Gift, Search, SearchIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinkClass = (path: string, currentPath: string) =>
    `px-4 py-2 text-[15px] font-medium transition-colors ${
      currentPath.includes(path) ? "text-white" : "text-gray-400 hover:text-white"
    }`;
  return (
    <>
      <header className="hidden md:block bg-app-secondary sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-1 py-7">
          <div className="flex items-center justify-between"> 
            <div className="flex items-center gap-2">
              <div className="relative">
                <SearchIcon className="absolute text-gray-200 w-4 h-4 left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search store"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-btn-cmpt text-gray-100 pl-10 pr-4 py-2.5 rounded-full text-sm w-58"
                />
              </div>
              <nav className="flex gap-1 text-white text-lg font-semibold p-1">
                <Link
                  href="/home/discover"
                  className={navLinkClass("/discover", pathname)}
                >
                  Discover
                </Link>
                <Link
                  href="/home/browser"
                  className={navLinkClass("/browser", pathname)}
                >
                  Browse
                </Link>
                <Link
                  href="/home/news"
                  className={navLinkClass("/news", pathname)}
                >
                  News
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/home/wishList"
                className={navLinkClass("/wishList", pathname)}
              >
                Wishlist
              </Link>
              <Link
                href="/home/gifts"
                className={navLinkClass("/gifts", pathname)}
              >
                Gifts
              </Link>
              <Link
                href="/home/cart"
                className={navLinkClass("/cart", pathname)}
              >
                Cart
              </Link>
            </div>
          </div>
        </div>
      </header>

      <header className="md:hidden block bg-[#1a1a1a] sticky top-0 z-50">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <button className="p-2">
            <Search className="w-5 h-5 text-white" />
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1 text-white font-medium"
          >
            Discover
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Link href="/home/wishList">
              <Bookmark className="w-5 h-5 text-white" />
            </Link>
            <Link href="/home/gifts">
              <Gift className="w-5 h-5 text-white" />
            </Link>
            <Link href="/home/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="bg-[#121212] border-t border-gray-800">
            <nav className="py-2">
              <Link
                href="/home/discover"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-6 py-4 text-base font-medium ${
                  pathname === '/home/discover'
                    ? 'text-white bg-gray-800'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                Discover
              </Link>

              <div className="h-px bg-gray-800 mx-6" />

              <Link
                href="/home/browser"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-6 py-4 text-base font-medium ${
                  pathname === '/home/browser'
                    ? 'text-white bg-gray-800'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                Browse
              </Link>

              <div className="h-px bg-gray-800 mx-6" />

              <Link
                href="/home/news"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-6 py-4 text-base font-medium ${
                  pathname === '/home/news'
                    ? 'text-white bg-gray-800'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                News
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}