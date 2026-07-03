import React from "react";
import { Hero } from "@/components/Hero/Hero";
import { Marquee } from "@/components/Marquee/Marquee";
import { Services } from "@/components/Services/Services";
import { Calculator } from "@/components/Calculator/Calculator";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Calculator />
      <Contact />
      <Footer />
    </main>
  );
}
