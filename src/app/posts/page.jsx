import React, { Fragment } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Blog Page",
  description: "Read the latest articles and updates.",
};

const BlogPage = () => {
  const blogs = [
    {
      title: "Understanding React Hooks",
      description:
        "A deep dive into React Hooks and how to use them effectively.",
      link: "/blog/react-hooks",
    },
    {
      title: "Next.js for Beginners",
      description:
        "Learn the basics of Next.js and how to build server-rendered React apps.",
      link: "/blog/nextjs-basics",
    },
    {
      title: "CSS Grid vs Flexbox",
      description:
        "A comparison of CSS Grid and Flexbox for modern web layouts.",
      link: "/blog/css-grid-vs-flexbox",
    },
    {
      title: "JavaScript ES6 Features",
      description:
        "Explore the new features introduced in ES6 and how they improve JavaScript.",
      link: "/blog/javascript-es6",
    },
  ];

  return (
    <Fragment>
      <Header />
      <main className="min-h-screen bg-gray-100 py-10">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <a
                  href={blog.link}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default BlogPage;
