"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Tutorial Videos", href: "/tutorials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-16">
              <Image
                src="/images/courtlogo.png"
                alt="Courtpath"
                fill
                className="object-contain object-left"
                sizes="192px"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/pricing"
              className="px-4 py-2 text-sm text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Log In
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-2.5 text-sm text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-200 my-2" />
              <Link
                href="/pricing"
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/pricing"
                className="mx-4 my-2 px-4 py-3 text-center text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
