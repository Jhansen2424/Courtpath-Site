"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search functionality here
    console.log("Search query:", searchQuery);
  };

  return (
    <footer className="relative bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left - Logo and Contact Info */}
          <div>
            <Link href="/" className="inline-block mb-8">
              <div className="relative w-64 h-20">
                <Image
                  src="/images/courtlogo.png"
                  alt="Courtpath Incorporated"
                  fill
                  className="object-contain object-left"
                  sizes="256px"
                />
              </div>
            </Link>

            <div className="space-y-4 text-gray-600">
              <div>
                <span className="font-semibold text-gray-900">Phone:</span>{" "}
                <a
                  href="tel:+18552622748"
                  className="hover:text-accent transition-colors"
                >
                  (855) 262-2748
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                <a
                  href="mailto:support@courtpath.com"
                  className="hover:text-accent transition-colors"
                >
                  support@courtpath.com
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-900">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/company/courtpath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Courtpath
                </a>
              </div>
            </div>
          </div>

          {/* Middle - About Courtpath */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">About Courtpath</h3>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">Courtpath</span> is an
                environmentally conscious electronic court filing application that values sound
                judgment, respect for clients, low environmental impact while having a high impact
                on the efficiency of court filing.
              </p>
              <p>
                Through its advanced online application and mobile optimization, help take your
                practice to the next level.
              </p>
            </div>
          </div>

          {/* Right - Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="block text-gray-600 hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                href="/faq"
                className="block text-gray-600 hover:text-accent transition-colors"
              >
                Frequently Asked Questions
              </Link>
              <Link
                href="/contact"
                className="block text-gray-600 hover:text-accent transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-600 hover:text-accent transition-colors"
              >
                Plans
              </Link>
              <Link
                href="/affiliates"
                className="block text-gray-600 hover:text-accent transition-colors"
              >
                Affiliates
              </Link>
              <Link
                href="/privacy"
                className="block text-gray-600 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-gray-600 hover:text-accent transition-colors"
              >
                Terms of Service Agreement
              </Link>
            </nav>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:text-accent-dark transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Courtpath Incorporated. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms
              </Link>
              <a
                href="https://www.linkedin.com/company/courtpath"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
