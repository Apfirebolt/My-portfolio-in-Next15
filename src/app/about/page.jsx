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
      <main className="min-h-screen pt-28 bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-[var(--background)] transition-colors duration-300">
        
        {/* Hero Section Banner with Background */}
        <section className="relative w-full overflow-hidden border-b border-[var(--primary)]/20 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          
          {/* Background Wallpaper */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="https://4kwallpapers.com/images/walls/thumbs_3t/13988.jpg"
              alt="About Background Wallpaper"
              fill
              priority
              quality={85}
              className="object-cover object-center opacity-20 filter blur-[1px] scale-105"
            />
          </div>

          {/* Ambient Glows & Gradient Vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-[var(--accent)]/15 rounded-full blur-[130px] -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/90 to-[var(--background)]"
          />

          <div className="max-w-7xl mx-auto">
            
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 flex items-center text-xs sm:text-sm text-[var(--primary)] space-x-2">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                Home
              </Link>
              <span className="opacity-60">/</span>
              <span className="text-[var(--accent)] font-medium">About</span>
            </nav>

            {/* Main Bio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text & Experience */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Status / Role Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--tertiary)]/20 border border-[var(--primary)]/20 text-xs font-medium text-[var(--foreground)] backdrop-blur-md shadow-xs">
                  <FaTerminal className="text-[var(--accent)] text-xs" />
                  <span>Full-Stack Engineer</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--foreground)] leading-tight">
                  About <span className="text-[var(--accent)]">Me</span>
                </h1>

                <p className="text-base sm:text-lg text-[var(--primary)] leading-relaxed">
                  Hey there, thanks for visiting this website! My name is Amit
                  Prafulla and I am a passionate software developer and an
                  enthusiastic individual who thrives on new experiences. I belong
                  to this city called Allahabad/Prayagraj in India. I have a
                  Bachelor's degree in Computer Science as well as a Master's degree
                  in Information Technology with specialization in Cyber Security.
                </p>

                <div className="pt-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-3">
                    "I pursue a career in..."
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--primary)] leading-relaxed">
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
                    className="absolute -inset-1 rounded-3xl bg-[var(--accent)]/30 blur-xl opacity-50 group-hover:opacity-90 transition duration-500" 
                  />

                  {/* Image Container Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-[var(--primary)]/20 bg-[var(--tertiary)]/15 shadow-2xl backdrop-blur-md">
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
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[var(--background)]/90 backdrop-blur-md border border-[var(--primary)]/20 flex items-center justify-between shadow-lg">
                      <div>
                        <p className="text-sm font-bold text-[var(--foreground)]">Amit Prafulla</p>
                        <p className="text-xs text-[var(--primary)]">Prayagraj, India</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-semibold">
                        <FaUserGraduate className="text-[11px]" />
                        <span>7+ YOE</span>
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