import React, { Fragment } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "About Me - Amit Prafulla",
  description: "Learn more about me, my life and my work.",
  keywords: "About Me, Amit Prafulla, Portfolio, Web Developer",
};

const AboutPage = () => {
  return (
    <Fragment>
      <Header />
      <main
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://4kwallpapers.com/images/walls/thumbs_3t/13988.jpg')",
        }}
      >
        <section className="text-center text-white bg-primary bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-6xl font-bold mb-4">Welcome to my Portfolio</h1>
          <p className="text-2xl">
            Discover me in little more depth. I am a passionate developer with a
            love for creating beautiful and functional web applications. My
            journey in the tech world has been filled with learning, growth, and
            exciting projects. I believe in the power of technology to transform
            ideas into reality, and I'm always eager to take on new challenges.
          </p>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default AboutPage;
