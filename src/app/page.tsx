import React from "react";
import { Hero } from "@/components/Hero/Hero";
import { Marquee } from "@/components/Marquee/Marquee";
import { Services } from "@/components/Services/Services";
import { Portfolio } from "@/components/Portfolio/Portfolio";
import { Calculator } from "@/components/Calculator/Calculator";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Calculator />
      <Contact />
      <Footer />
    </main>
  );
}
