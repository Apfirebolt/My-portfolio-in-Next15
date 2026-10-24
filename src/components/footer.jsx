'use client'

import React from "react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: FaGithub },
    { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
    { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
    { name: "YouTube", href: "https://youtube.com", icon: FaYoutube },
    { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/posts" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <footer className="w-full border-t border-[var(--primary)]/20 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand, Bio & Navigation Column (Left) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/" className="inline-block">
                <span className="text-2xl font-black tracking-tight text-[var(--foreground)]">
                  APG<span className="text-[var(--accent)]">IIIT</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-[var(--primary)] mt-3 max-w-sm">
                Engineering web experiences, exploring scalable architectures, and sharing technical insights.
              </p>
            </div>

            {/* Availability Status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--secondary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--secondary)]"></span>
              </span>
              <span className="text-xs font-medium text-[var(--foreground)] opacity-80">Available for collaborations</span>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] opacity-70">Navigation</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block transition-colors duration-200 text-[var(--primary)] hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] opacity-70">Connect</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="p-2.5 rounded-lg bg-[var(--tertiary)]/30 border border-[var(--primary)]/20 text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <Icon className="text-lg" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Me Form Column (Right) */}
          <div className="lg:col-span-8 bg-[var(--tertiary)]/20 border border-[var(--primary)]/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="space-y-2 mb-6">
              <h3 className="text-lg font-bold text-[var(--foreground)]">Get in Touch</h3>
              <p className="text-sm text-[var(--primary)]">
                Have a project in mind, a question, or want to collaborate? Drop a message below.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[var(--foreground)] opacity-80">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--background)] border border-[var(--primary)]/30 text-[var(--foreground)] placeholder-[var(--primary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[var(--foreground)] opacity-80">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--background)] border border-[var(--primary)]/30 text-[var(--foreground)] placeholder-[var(--primary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[var(--foreground)] opacity-80">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--background)] border border-[var(--primary)]/30 text-[var(--foreground)] placeholder-[var(--primary)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-sm bg-[var(--accent)] text-[var(--background)] hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--primary)]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--primary)]">
          <p>&copy; {currentYear} APGIIIT.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;