import Image from "next/image";
import React, { Fragment } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen flex flex-col">
        <section
          className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://4kwallpapers.com/images/walls/thumbs_3t/13988.jpg')",
          }}
        >
          <HeroSection />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Home;
