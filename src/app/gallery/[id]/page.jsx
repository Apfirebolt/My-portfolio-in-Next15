import React, { Fragment } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Header from "@/components/header-component";
import ImageComponent from "@/components/images";
import Footer from "@/components/footer";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(
      `https://softgenie.org/api/gallery-posts/${id}`
    );
    const gallery = response.data;

    return {
      title: gallery.title,
      description: gallery.meta_description,
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
        <div className="container mx-auto my-4">
          <h1 className="text-center text-2xl font-semibold text-red-500">
            Failed to load gallery details.
          </h1>
        </div>
        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header />
      <div className="min-h-screen mt-12 bg-neutral-50 py-10">
        <article className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            {gallery.title}
          </h1>
          <div className="flex justify-between items-center mb-4">
            {gallery.tags && gallery.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {gallery.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          {parse(gallery.description)}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Details:</h3>
            <p className="text-gray-600 mt-2">
              Created On: {new Date(gallery.date_posted).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-2">
              Updated On: {new Date(gallery.date_updated).toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6">
            {gallery.images && gallery.images.length > 0 ? (
              <ImageComponent images={gallery.images} />
            ) : (
              <p>No images available for this post.</p>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </Fragment>
  );
};

export default GalleryDetailPage;
