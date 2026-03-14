"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    title: "Winter Collection 2026",
    desc: "Up to 70% OFF on Top Brands",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
    btn: "Shop Now",
  },
  {
    title: "New Arrivals",
    desc: "Trending Styles Just Dropped",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    btn: "Explore",
  },
  {
    title: "Mega Sale",
    desc: "Fashion Under ₹999",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200",
    btn: "Shop Sale",
  },
];

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () =>
    setActive((p) => (p === 0 ? slides.length - 1 : p - 1));

  const next = () =>
    setActive((p) => (p === slides.length - 1 ? 0 : p + 1));

  // ✅ SINGLE autoplay (hydration safe)
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === active
              ? "opacity-100 translate-x-0 z-10"
              : "opacity-0 translate-x-10 z-0"
          }`}
        >
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority={index === active}
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-20">
           <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
              <div className="text-white max-w-xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>

                <p className="text-xl md:text-2xl mb-8">
                  {slide.desc}
                </p>

                <button className="bg-[#F8D6A4] hover:bg-[#D4A574] text-gray-900 text-lg px-8 py-4 rounded-md transition-all">
                  {slide.btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev Button */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white z-30"
      >
        <ChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white z-30"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
