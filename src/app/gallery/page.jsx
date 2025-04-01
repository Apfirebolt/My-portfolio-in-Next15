import React, { Fragment } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
    title: "Gallery Page",
    description: "Explore the portfolio gallery.",
};

const GalleryPage = () => {
    const images = [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
    ];

    return (
        <Fragment>
            <Header />
            <main className="min-h-screen bg-gray-100 py-10">
                <section className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((src, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={src}
                                    alt={`Gallery item ${index + 1}`}
                                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </Fragment>
    );
};

export default GalleryPage;
