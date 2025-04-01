import React, { Fragment } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Header from "@/components/header-component";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await axios.get(`https://softgenie.org/api/blogs/${id}`);
    const post = response.data;

    return {
      title: post.title,
      description: post.meta_description,
    };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "Post Details",
      description: "Details about the post.",
    };
  }
}

const PostDetailPage = async ({ params }) => {
  const { id } = await params;

  let post = null;

  try {
    const response = await axios.get(`https://softgenie.org/api/blogs/${id}`);
    post = response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    return (
      <Fragment>
        <Header />
        <div className="container mx-auto my-4">
          <h1 className="text-center text-2xl font-semibold text-red-500">
            Failed to load post details.
          </h1>
        </div>
        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header />
      <div className="container mx-auto my-4">
        <article className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-2">{post.title}</h1>
          <div className="flex justify-between items-center mb-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
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
          {parse(post.content)}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Details:</h3>
            <p className="text-gray-600 mt-2">
              Created On: {new Date(post.date_posted).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-2">
              Updated On: {new Date(post.date_updated).toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={`https://softgenie.org${image.image}`}
                alt={`Post Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        </article>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PostDetailPage;
