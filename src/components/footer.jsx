import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-accent">
      <div className="grid grid-cols-2">
        {/* Left Grid */}
        <div className="bg-accent text-black p-4 flex flex-col justify-between">
          <p>&copy; {new Date().getFullYear()} APGIIIT.com All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com" target="_blank">
              <FaFacebook className="text-2xl hover:text-primary" />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              <FaTwitter className="text-2xl hover:text-primary" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <FaInstagram className="text-2xl hover:text-primary" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <FaYoutube className="text-2xl hover:text-primary" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <FaGithub className="text-2xl hover:text-primary" />
            </Link>
          </div>
        </div>

        {/* Right Grid */}
        <div className="bg-primary text-white p-8">
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-accent">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/posts" className="hover:text-accent">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-accent">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
