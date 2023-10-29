import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import Works from "../components/layout/Works";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <section>
      <Header />
      <Hero />
      <Features />
      <Works />
      <Footer />
    </section>
  );
};

export default HomePage;
