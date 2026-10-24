import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserGraduate, FaTerminal } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/About";

export const metadata = {
  title: "About Me - Amit Prafulla",
  description: "Learn more about me, my life and my work.",
  keywords: "About Me, Amit Prafulla, Portfolio, Web Developer",
};

const AboutPage = () => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen pt-20 bg-neutral-950 text-white selection:bg-accent selection:text-neutral-950">
        
        {/* Hero Section Banner with Background */}
        <section className="relative w-full overflow-hidden border-b border-white/10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          
          {/* Background Wallpaper */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="https://4kwallpapers.com/images/walls/thumbs_3t/13988.jpg"
              alt="About Background Wallpaper"
              fill
              priority
              quality={85}
              className="object-cover object-center opacity-25 filter blur-[1px] scale-105"
            />
          </div>

          {/* Ambient Glows & Gradient Vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-accent/20 rounded-full blur-[130px] -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950/80 via-neutral-950/90 to-neutral-950"
          />

          <div className="max-w-7xl mx-auto">
            
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 flex items-center text-xs sm:text-sm text-neutral-400 space-x-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-accent font-medium">About</span>
            </nav>

            {/* Main Bio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text & Experience */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Status / Role Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-neutral-300 backdrop-blur-md">
                  <FaTerminal className="text-accent text-xs" />
                  <span>Full-Stack Engineer</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  About <span className="bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent">Me</span>
                </h1>

                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                  Hey there, thanks for visiting this website! My name is Amit
                  Prafulla and I am a passionate software developer and an
                  enthusiastic individual who thrives on new experiences. I belong
                  to this city called Allahabad/Prayagraj in India. I have a
                  Bachelor's degree in Computer Science as well as a Master's degree
                  in Information Technology with specialization in Cyber Security.
                </p>

                <div className="pt-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    "I pursue a career in..."
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
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
              </div>

              {/* Right Column: Profile Picture Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative group w-full max-w-md">
                  {/* Subtle Accent Glow Ring */}
                  <div 
                    aria-hidden="true" 
                    className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/40 via-amber-400/20 to-accent/40 blur-xl opacity-60 group-hover:opacity-90 transition duration-500" 
                  />

                  {/* Image Container Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src="https://softgenie.org/media/images/generic/my_pic1.jpeg"
                        alt="Amit Prafulla"
                        fill
                        priority
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Floating Info Tag on Card */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">Amit Prafulla</p>
                        <p className="text-xs text-neutral-400">Prayagraj, India</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold">
                        <FaUserGraduate className="text-[11px]" />
                        <span>6+ YOE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Detailed About Bento / Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AboutSection />
        </section>
      </main>

      <Footer />
    </Fragment>
  );
};

export default AboutPage;