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
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://4kwallpapers.com/images/walls/thumbs_3t/13988.jpg')",
        }}
      >
        <section className="text-white pt-5 container mx-auto bg-primary bg-opacity-50 p-8 rounded-lg flex flex-col lg:flex-row items-center lg:items-start">
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
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 lg:ml-8">
            <img
              className="h-64 w-full object-cover rounded-lg"
              src="https://softgenie.org/media/images/generic/my_pic1.jpeg"
              alt="Amit Prafulla"
            />
          </div>
        </section>
        <div
          className="card container mx-auto my-4 py-4 px-6 border bg-white rounded shadow"
          data-aos="fade-up"
        >
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

        <div
          className="card my-4 py-4 px-6 border bg-white rounded shadow mx-auto container"
          data-aos="zoom-in-left"
        >
          <h2 className="text-2xl font-bold my-3">
            "My screen time is reserved for real life."
          </h2>
          <p className="text-gray-500">
            Everyone around me seems to love watching movies and TV shows. I am
            not a big fan of them. I'd often watch movies with my friends and
            family but I don't have a habit of watching them alone. I'd often
            watch movies in theaters with my friends and family and there would
            often be a big gap between the movies I watch. I am a big fan of
            Marvel and DC movies and have watched most of them. My favorite
            movies are Avengers Endgame, LOTR, The Dark Knight, Harry Potter
            Series, Inception, Good Will Hunting, The Shawshank Redemption,
            original Spider-Man .
          </p>
          <p className="mt-5">
            In bollywood I'd often watch movies which have a good storyline and
            acting. I'd really think a lot before watching a movie because I
            believe that time is precious and I don't want to waste it on
            something that doesn't add value to my life.
          </p>
        </div>

        
      </main>

      <AboutSection />
      <Footer />
    </Fragment>
  );
};

export default AboutPage;
