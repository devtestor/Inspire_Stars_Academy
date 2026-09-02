"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { sports } from "@/content/siteContent";
import SplitHeading from "./SplitHeading";

export default function SportsCarousel({ heading = true }) {
  const carouselRef = useRef(null);

  const slide = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <section className="sports" id="sports">
      <div className="sports-header">
        {heading && <SplitHeading eyebrow="Sports Ecosystem" title="More Than" accent="A Game" />}
        <div className="carousel-controls" aria-label="Sports carousel controls">
          <button type="button" onClick={() => slide(-1)} aria-label="Show previous sports">
            <ChevronLeft size={22} />
          </button>
          <button type="button" onClick={() => slide(1)} aria-label="Show next sports">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
      <div className="sports-strip" ref={carouselRef} aria-label="Sports offered by Inspire Stars Academy">
        {sports.map(([name, image, body]) => (
          <article className="sport-card" key={name} data-reveal>
            <img src={image} alt={`${name} development at Inspire Stars Academy`} loading="lazy" />
            <div>
              <h3>{name}</h3>
              <p>{body}</p>
              <Link href="/programs">Explore <ArrowRight size={16} /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
