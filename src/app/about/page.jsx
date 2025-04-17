import React, { Fragment } from "react";
import Header from "@/components/header-component";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-section";

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
        className="h-screen bg-cover mt-24 bg-center"
        style={{
          backgroundImage:
            "url('https://4kwallpapers.com/images/walls/thumbs_3t/13988.jpg')",
        }}
      >
        <section className="text-white pt-5 container mx-auto bg-primary bg-opacity-50 p-8 flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/2 mt-10 text-center lg:text-left">
            <h1 className="text-6xl font-bold mb-12">ABOUT ME</h1>
            <p className="mt-4">
              Hey there, thanks for visiting this website! My name is Amit
              Prafulla and I am a passionate software developer and an
              enthusiastic individual who thrives on new experiences. I belong
              to this city called Allahabad/Prayagraj in India. I have a
              Bachelor's degree in Computer Science as well as a Master's degree
              in Information Technology with specialization in Cyber Security.
            </p>

            <h2 className="text-2xl font-bold my-3">"I pursue a career in..."</h2>
            <p className="mt-5">
              I have been working in the software industry for over 6 years now
              and have experience in various technologies such as Python, Django,
              FastAPI, React, Angular, Vue, Node.js, Express.js, MongoDB,
              PostgreSQL, MySQL, Docker, Kubernetes, AWS, Azure, Google Cloud, and
              more. I have worked on various projects ranging from web development
              to cloud computing and have a keen interest in learning new
              technologies and frameworks. I am always looking for new
              opportunities to learn and grow as a software developer. In my spare
              time I like to work on personal projects, do video editing, travel
              and play video games.
            </p>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 lg:ml-8">
            <img
              className="h-128 w-full object-cover rounded-lg"
              src="https://softgenie.org/media/images/generic/my_pic1.jpeg"
              alt="Amit Prafulla"
            />
          </div>
        </section>
      </main>

      <AboutSection />
      <Footer />
    </Fragment>
  );
};

export default AboutPage;
