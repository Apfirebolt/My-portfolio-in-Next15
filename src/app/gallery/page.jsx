import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GallerySection from "@/components/Gallery";
import { FaCamera } from "react-icons/fa";

export const metadata = {
  title: "Gallery | APGIIIT",
  description: "Explore my photo collections, travel diaries, landscapes, and creative captures.",
};

const GalleryPage = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen pt-20 pb-16 bg-neutral-950 text-white selection:bg-accent selection:text-neutral-950">
        
        {/* Hero Section Banner */}
        <section className="relative w-full overflow-hidden border-b border-white/10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          
          {/* Background Image using Next.js Image */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="https://hips.hearstapps.com/hmg-prod/images/alpe-di-siusi-sunrise-with-sassolungo-or-langkofel-royalty-free-image-1623254127.jpg"
              alt="Gallery Landscape Banner"
              fill
              priority
              quality={80}
              className="object-cover object-center opacity-25 filter blur-[1px] scale-105"
            />
          </div>

          {/* Ambient Glow & Dark Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/15 rounded-full blur-[120px] -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950/80 via-neutral-950/90 to-neutral-950"
          />

          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 flex items-center text-xs sm:text-sm text-neutral-400 space-x-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-accent font-medium">Gallery</span>
            </nav>

            <div className="max-w-3xl">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-neutral-300 mb-4 backdrop-blur-md">
                <FaCamera className="text-accent text-xs" />
                <span>Visual Stories & Travel Diaries</span>
              </div>

              {/* Headline & Description */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Photo <span className="bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent">Gallery</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                Discover my life in pictures, travel chronicles, architectural explorations, and candid moments captured through the lens.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Stream Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <GallerySection />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default GalleryPage;