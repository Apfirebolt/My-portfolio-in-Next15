"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/posts" },
    { name: "Gallery", path: "/gallery" },
  ];

  const closeOnClickOutside = (e) => {
    if (isOpen && !e.target.closest(".fixed")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeOnClickOutside);
    return () => {
      document.removeEventListener("click", closeOnClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-primary text-accent">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-2xl w-full md:w-1/2 bg-accent p-3 font-bold">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={60}
            className="mx-auto hidden md:block rounded-full"
          />
          <FaBars
            className="text-2xl ml-auto cursor-pointer md:hidden text-primary"
            onClick={toggleMenu}
          />
        </div>
        <nav className="w-full md:w-1/2 p-5 hidden md:block">
          <ul className="flex space-x-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="px-3 py-2 hover:bg-secondary border hover:text-accent transition-all duration-300 shadow rounded"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full bg-primary text-accent w-1/2 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={60}
              className="ml-4 rounded-full"
            />
            </Link>
          </h1>
          <FaTimes className="text-2xl cursor-pointer text-black" onClick={toggleMenu} />
        </div>
        <ul className="space-y-4 p-5">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="block px-4 py-2 text-lg font-medium hover:bg-secondary hover:text-accent transition-all duration-300 rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
