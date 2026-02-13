"use client";

import { useEffect, useState } from "react";
import FloatingBar from "@/components/ui/FloatingBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/ui/NavBar";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="h-screen bg-[#0a0015] flex">
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[128px] animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[128px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-fuchsia-500/8 blur-[128px] animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <NavBar />
      <div className="w-full overflow-y-auto mx-auto overflow-hidden relative z-10">
        <div className="px-5 md:px-10 lg:px-40">
          <FloatingBar />
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
