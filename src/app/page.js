import React from "react";
import Image from "next/image";
import Header from "@/components/header-component";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white selection:bg-accent selection:text-neutral-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section Container */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
          
          {/* Optimized Next.js Background Image */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="https://4kwallpapers.com/images/walls/thumbs_3t/13988.jpg"
              alt="Hero Background Wallpaper"
              fill
              priority
              quality={85}
              className="object-cover object-center transform scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Layered Gradient & Vignette Overlay */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/65 to-neutral-950 backdrop-blur-[1px]" 
          />

          {/* Interactive Hero Content */}
          <div className="w-full relative z-10">
            <HeroSection />
          </div>

          {/* Subtle Bottom Fade to Page Content */}
          <div 
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;