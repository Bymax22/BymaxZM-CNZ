"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, ArrowRight } from "lucide-react";

export default function Hero() {
    const logos = [
      {
        name: "Zambia Children's Climate Council",
        src: "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779894075/ZCCC_logo_1-web-01_qixkfe.jpg",
      },
      {
        name: "Luapula Mining Indaba",
        src: "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779894063/webslogo-01_dtav55.png",
      },
      {
        name: "Women's Land Justice",
        src: "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779894071/webwlogo-01-01_eulcfw.jpg",
      },
      {
        name: "Zero Children in Mining",
        src: "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779894062/zero_logo-01_op6yqx.png",
      },
      
    ];

    const imageUrls = [
      // Replace these with your Cloudinary image URLs
      
      "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053946/692938516_1446768550815747_5499726643162476941_n_nv4vge.jpg",
      "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779731231/486835500_1068855051940434_4817210095087666781_n_s1fhv8.jpg",
      "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779727627/484946287_1060700342755905_5628316666382113607_n_ehpd5d.jpg",
      "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053944/689870554_1020652813653190_5398139666292164193_n_c8e1cx.jpg",
       "https://res.cloudinary.com/dwxlzl5us/image/upload/q_auto/f_auto/v1779053097/677790147_1429823699176899_1661133342896079994_n_xhjbav.jpg",
       
    
    
    ];

    const [currentImage, setCurrentImage] = useState(0);

    // Auto-advance slider every 6s
    useEffect(() => {
      const id = setInterval(() => {
        setCurrentImage((i) => (i + 1) % imageUrls.length);
      }, 6000);
      return () => clearInterval(id);
    }, [imageUrls.length]);

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      let raf = 0;
      const speed = 0.5; // pixels per frame

      function step() {
        if (!scroller) return;
        if (!isPaused) {
          scroller.scrollLeft += speed;
          if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
            scroller.scrollLeft = 0;
          }
        }
        raf = requestAnimationFrame(step);
      }

      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [isPaused]);

    return (
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          {imageUrls.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={idx === currentImage ? "Background image" : ""}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                idx === currentImage ? "opacity-100" : "opacity-0"
              }`}
              loading="eager"
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-[#e8eddf]/100 via-[#e8eddf]/100 to-transparent" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-10 lg:pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* LEFT CONTENT */}
            <div className="relative z-20 pb-10 lg:pb-0 lg:pl-8 xl:pl-12 space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-[#2f1000]">Care For Nature Zambia</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl text-[#7b3d1f]">
                Were humanity, Fauna and Flora flourish in harmony.
              </h1>
              <p className="mt-5 text-base leading-7 text-[#8b8c89]">
                Care for Nature Zambia (CNZ) is a local not-for-profit Non-Governmental Organization working with diverse groups of people and institutions to promote nature conservation and human rights for the attainment of sustainable development in Zambia.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="/programs"
                  className="h-10 px-5 rounded-lg bg-[#007200] text-white font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#005d00] transition-all"
                >
                  Explore Our Programs
                  <ArrowRight size={16} />
                </a>

                <a
                  href="/get-involved"
                  className="h-10 px-5 rounded-lg border border-[#d1d5db] bg-white text-[#101828] font-semibold text-sm inline-flex items-center justify-center hover:bg-gray-50 transition-all"
                >
                  Get Involved
                </a>
              </div>

              {/* INITIATIVES LOGOS */}
              <div className="w-full max-w-[760px] relative z-20 lg:-mr-16 xl:-mr-24">
                <div className="flex items-center gap-4 bg-white shadow-lg rounded-xl p-4">
                  <div className="flex-shrink-0">
                    <p className="text-sm uppercase tracking-[0.18em] text-[#2f1000]">Our Initiatives</p>
                  </div>

                  <div
                    className="flex-1 overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    ref={scrollerRef}
                  >
                    <div className="flex items-center gap-5 whitespace-nowrap">
                      {logos.concat(logos).map((logo, idx) => (
                        <div key={idx} className="min-w-[6rem] flex items-center justify-center h-10">
                          <img
                            src={logo.src}
                            alt={logo.name}
                            className="h-6 md:h-8 lg:h-10 object-contain mx-auto"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[320px] sm:h-[420px] lg:h-[600px] flex items-center justify-center overflow-hidden lg:justify-end">
              {/* MAIN IMAGE */}
              <div className="relative w-full lg:w-[105%] h-full overflow-hidden rounded-bl-3xl">
                {/* PLAY BUTTON */}
                <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 flex items-center gap-3 z-20">
                  <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-105 transition">
                    <Play size={14} className="text-[#007200] fill-[#007200]" />
                  </button>

                  <div>
                    <p className="text-white font-semibold text-sm">Watch Our Story</p>
                    <p className="text-white/80 text-xs">See the impact we are making</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }