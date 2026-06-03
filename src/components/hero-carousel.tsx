"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&q=80",
    title: "One View of Every Intervention",
    subtitle: "Dignity for Every Citizen",
    description: "A unified national system for coordinating, tracking, and monitoring all humanitarian and poverty-alleviation interventions across every agency, state, and community.",
    cta: { label: "Learn More", href: "/about" },
    cta2: { label: "Access Dashboard", href: "/login" },
  },
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80",
    title: "Driving Social Investment",
    subtitle: "for a Better Future",
    description: "Building sustainable livelihoods through targeted empowerment programmes and social protection systems.",
    cta: { label: "Explore Programmes", href: "/our-programmes" },
    cta2: { label: "Get Started", href: "/login" },
  },
  {
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=80",
    title: "Creating Equal Opportunities",
    subtitle: "for Every Nigerian",
    description: "From cash transfers to emergency relief — ensuring no citizen is left behind through coordinated national response.",
    cta: { label: "Our Mission", href: "/about" },
    cta2: { label: "View Programmes", href: "/our-programmes" },
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden sm:h-[600px]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(26, 46, 26, 0.75), rgba(26, 46, 26, 0.85)), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto flex h-full max-w-4xl items-center px-6 text-center">
            <div className="w-full">
              <span className="inline-block rounded-full bg-emerald-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-sm">
                National Humanitarian Platform
              </span>
              <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {slide.title}
                <br />
                <span className="text-emerald-300">{slide.subtitle}</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-100/80 sm:text-lg">
                {slide.description}
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href={slide.cta.href}
                  className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
                >
                  {slide.cta.label}
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="rounded-lg border border-emerald-400/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800/50"
                >
                  {slide.cta2.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
