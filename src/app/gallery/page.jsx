import React, { Fragment } from "react";
import Header from "@/components/header-component";
import Footer from "@/components/footer";
import GallerySection from "@/components/gallery-section";

export const metadata = {
  title: "Gallery Page",
  description: "Explore my photo and art gallery.",
};

const GalleryPage = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen mt-12 bg-neutral-50 py-10">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center bg-primary py-4 text-accent">
            Gallery
          </h1>
          <section
            className="relative bg-cover bg-center h-64 flex items-center justify-center text-white"
            style={{
              backgroundImage:
                "url('https://hips.hearstapps.com/hmg-prod/images/alpe-di-siusi-sunrise-with-sassolungo-or-langkofel-royalty-free-image-1623254127.jpg')",
            }}
          >
            <div className="bg-black bg-opacity-50 p-6 rounded">
              <h2 className="text-3xl font-bold">Welcome to My Gallery</h2>
              <p className="mt-2 text-lg">
                Discover my life in pictures and my penchant for photography.
              </p>
            </div>
          </section>
          <GallerySection />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default GalleryPage;
