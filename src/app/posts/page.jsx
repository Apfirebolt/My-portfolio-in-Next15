import React, { Fragment } from "react";
import Header from "@/components/header-component";
import Footer from "@/components/footer";
import BlogSection from "@/components/blog-section";

export const metadata = {
  title: "Blogs Page",
  description: "Read my latest blogs and articles.",
};

const BlogsPage = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen mt-12 bg-neutral-50 py-10">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center bg-primary py-4 text-accent">Blogs</h1>
          <section
            className="relative bg-cover bg-center h-64 flex items-center justify-center text-white"
            style={{ backgroundImage: "url('https://neilpatel.com/wp-content/uploads/2017/02/blogging.jpg')" }}
          >
            <div className="bg-black bg-opacity-50 p-6 rounded">
              <h2 className="text-3xl font-bold">Welcome to My Blogs</h2>
              <p className="mt-2 text-lg">Discover my thoughts, insights, and stories.</p>
            </div>
          </section>
          <BlogSection />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default BlogsPage;
