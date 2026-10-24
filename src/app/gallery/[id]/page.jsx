import React, { Fragment } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Link from "next/link";
import Header from "@/components/Header";
import ImageComponent from "@/components/Images";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(
      `https://softgenie.org/api/gallery-posts/${id}`
    );
    const gallery = response.data;

    return {
      title: `${gallery.title} | Gallery`,
      description: gallery.meta_description || "Explore photo story and gallery details.",
    };
  } catch (error) {
    console.error("Error fetching gallery metadata:", error);
    return {
      title: "Gallery Details",
      description: "Details about the gallery.",
    };
  }
}

const GalleryDetailPage = async ({ params }) => {
  const { id } = await params;

  let gallery = null;

  try {
    const response = await axios.get(
      `https://softgenie.org/api/gallery-posts/${id}`
    );
    gallery = response.data;
  } catch (error) {
    console.error("Error fetching gallery details:", error);
    return (
      <Fragment>
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4 bg-neutral-50/50">
          <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-4 font-bold text-xl">
              !
            </div>
            <h1 className="text-xl font-bold text-neutral-900 mb-2">
              Failed to load gallery
            </h1>
            <p className="text-sm text-neutral-500 mb-6">
              The requested gallery item could not be retrieved or has been removed.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              &larr; Back to Gallery
            </Link>
          </div>
        </main>
        <Footer />
      </Fragment>
    );
  }

  const formattedCreatedDate = gallery.date_posted
    ? new Date(gallery.date_posted).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedUpdatedDate = gallery.date_updated
    ? new Date(gallery.date_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Fragment>
      <Header />
      <main className="min-h-screen pt-24 pb-16 bg-neutral-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center text-xs sm:text-sm text-neutral-400 space-x-2">
            <Link href="/" className="hover:text-neutral-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-neutral-700 transition-colors">
              Gallery
            </Link>
            <span>/</span>
            <span className="text-neutral-600 font-medium truncate max-w-[200px] sm:max-w-xs">
              {gallery.title}
            </span>
          </nav>

          {/* Article Container */}
          <article className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden p-6 sm:p-10">
            
            {/* Header / Meta Section */}
            <header className="border-b border-neutral-100 pb-6 mb-8">
              {/* Tags */}
              {gallery.tags && gallery.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {gallery.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-0.5 bg-neutral-100 text-neutral-700 font-medium rounded-full text-xs tracking-wide uppercase"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
                {gallery.title}
              </h1>

              {/* Timestamp Metadata Details */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-neutral-500">
                {formattedCreatedDate && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-neutral-700">Published:</span>
                    <time dateTime={gallery.date_posted}>{formattedCreatedDate}</time>
                  </div>
                )}
                {formattedUpdatedDate && formattedUpdatedDate !== formattedCreatedDate && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-neutral-700">Updated:</span>
                    <time dateTime={gallery.date_updated}>{formattedUpdatedDate}</time>
                  </div>
                )}
              </div>
            </header>

            {/* Content Body */}
            {gallery.description && (
              <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-4 mb-10">
                {parse(gallery.description)}
              </div>
            )}

            {/* Image Gallery Stream */}
            <section className="pt-6 border-t border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">
                Captured Moments
              </h2>
              {gallery.images && gallery.images.length > 0 ? (
                <div className="w-full">
                  <ImageComponent images={gallery.images} />
                </div>
              ) : (
                <div className="p-8 text-center bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
                  <p className="text-sm text-neutral-500">
                    No visual assets available for this post.
                  </p>
                </div>
              )}
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default GalleryDetailPage;