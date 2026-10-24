"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaLeaf } from "react-icons/fa";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("theme-light");

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/posts" },
    { name: "Gallery", path: "/gallery" },
  ];

  const themes = [
    { id: "theme-light", name: "Light", icon: FaSun },
    { id: "theme-dark", name: "Dark", icon: FaMoon },
    { id: "theme-eco", name: "Eco", icon: FaLeaf },
  ];

  // Initialize theme from localStorage or document
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "theme-light";
    setCurrentTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem("portfolio-theme", themeId);
    document.documentElement.className = themeId;
  };

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
      <header className="fixed top-0 left-0 w-full z-40 bg-[var(--background)]/90 backdrop-blur-md text-[var(--foreground)] border-b border-[var(--primary)]/20 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={logo}
                  alt="APGIIIT Logo"
                  width={130}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation & Theme Switcher */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center space-x-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 text-[var(--primary)] hover:text-[var(--accent)] hover:bg-[var(--tertiary)]/30"
                  >
                    {item.label || item.name}
                  </Link>
                ))}
              </nav>

              {/* Desktop Theme Switcher Pills */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--tertiary)]/30 border border-[var(--primary)]/20">
                {themes.map((t) => {
                  const Icon = t.icon;
                  const isActive = currentTheme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      aria-label={`${t.name} theme`}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[var(--accent)] text-[var(--background)] shadow-sm"
                          : "text-[var(--primary)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <Icon className="text-sm" />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                className="p-2.5 rounded-lg bg-[var(--tertiary)]/30 border border-[var(--primary)]/20 text-[var(--foreground)] hover:border-[var(--accent)] transition-colors focus:outline-none"
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-3/4 max-w-xs bg-[var(--background)] text-[var(--foreground)] shadow-2xl border-r border-[var(--primary)]/20 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--primary)]/20">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={110}
              height={35}
              className="object-contain rounded-full"
            />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--tertiary)]/30 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Mobile Theme Switcher Section */}
        <div className="p-4 border-b border-[var(--primary)]/20 bg-[var(--tertiary)]/10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)] mb-3 px-1">
            Select Theme
          </p>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = currentTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-[var(--accent)] text-[var(--background)] border-[var(--accent)] shadow-sm"
                      : "bg-[var(--background)] text-[var(--primary)] border-[var(--primary)]/20 hover:border-[var(--accent)]"
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={closeMenu}
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-[var(--primary)] hover:bg-[var(--tertiary)]/30 hover:text-[var(--accent)]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer info */}
        <div className="p-4 border-t border-[var(--primary)]/20 text-xs text-[var(--primary)] text-center">
          &copy; {new Date().getFullYear()} APGIIIT
        </div>
      </aside>
    </>
  );
};

Header.displayName = "Header";

export default Header;