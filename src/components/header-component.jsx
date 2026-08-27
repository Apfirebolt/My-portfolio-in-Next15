"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/posts" },
    { name: "Gallery", path: "/gallery" },
  ];

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-primary/95 backdrop-blur-md text-accent border-b border-white/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={logo}
                  alt="APGIIIT Logo"
                  width={140}
                  height={45}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 hover:bg-secondary hover:text-accent hover:shadow-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                className="p-2.5 rounded-lg bg-secondary/50 text-accent hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <FaBars className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer Content */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-3/4 max-w-xs bg-primary text-accent shadow-2xl border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={40}
              className="object-contain rounded-full"
            />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-lg text-accent hover:bg-secondary transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={closeMenu}
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-secondary hover:translate-x-1"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer info */}
        <div className="p-4 border-t border-white/10 text-xs text-accent/70 text-center">
          &copy; {new Date().getFullYear()} APGIIIT
        </div>
      </aside>
    </>
  );
};

export default Header;