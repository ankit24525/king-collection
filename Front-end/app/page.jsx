"use client";

import HeroSlider from "./components/HeroSection";
import CategoryGrid from "./components/Category";
import Deals from "./components/Deals";
import Trending from "./components/trending";
import Arrivals from "./components/Arrivals";
import Services from "./components/Services";
import AppDownload from "./components/Download";

export default function Page() {
  return (
    <>
     <div className="space-y-12">
     
      <HeroSlider />
      <CategoryGrid />
      <Deals />
      <Trending />
      <Arrivals />
      <Services />
      <AppDownload />
      </div>
    </>
  );
}