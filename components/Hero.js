'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      const mm = gsap.matchMedia()

      mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)"
      }, (context) => {

        const { isMobile } = context.conditions

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isMobile ? "+=2000" : "+=3500",
            scrub: 1.2,
            pin: true
          }
        })

        tl.from('.letter', {
          y: isMobile ? 60 : 120,
          opacity: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out"
        })

        tl.from('.stat', {
          opacity: 0,
          y: 40,
          stagger: 0.2,
          duration: 1
        }, "-=0.8")

        tl.fromTo(panelRef.current,
          {
            y: 200,
            scale: isMobile ? 0.9 : 0.7,
            opacity: 0,
            rotateX: isMobile ? 0 : 40
          },
          {
            y: 0,
            scale: 1.05,
            opacity: 1,
            rotateX: 0,
            duration: 3
          }
        )

        if (!isMobile) {
          tl.to(panelRef.current, {
            rotateY: 360,
            duration: 4
          })
        }

        tl.to(panelRef.current, {
          y: -20,
          duration: 2
        })

        gsap.utils.toArray('.letter').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -6 : 6,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.08
          })
        })

      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headline = "WELCOME ITZFIZZ"

  return (
    <section
      ref={sectionRef}
      className="h-screen relative flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 mesh-bg"></div>

      <div className="relative flex flex-col items-center justify-center">

        <div
          ref={panelRef}
          className="absolute inset-0 -z-10 
                     bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-indigo-600
                     rounded-3xl blur-xl opacity-90
                     shadow-[0_0_150px_rgba(236,72,153,0.9)]"
          style={{
            transform: "scale(1.1)",
            transformStyle: "preserve-3d"
          }}
        ></div>

        <h1 className="
          text-3xl sm:text-4xl md:text-6xl lg:text-7xl
          tracking-[0.3em] md:tracking-[0.6em]
          text-center font-semibold relative z-10
          px-6 md:px-16 py-8 md:py-12
        ">
          {headline.split("").map((char, index) => (
            <span key={index} className="letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

      </div>

      <div className="flex gap-6 md:gap-12 mt-16 md:mt-20 z-20 text-sm md:text-base">
        <div className="stat text-center">
          <h2 className="text-xl md:text-3xl font-bold">98%</h2>
          <p>Client Satisfaction</p>
        </div>
        <div className="stat text-center">
          <h2 className="text-xl md:text-3xl font-bold">120+</h2>
          <p>Projects Delivered</p>
        </div>
        <div className="stat text-center">
          <h2 className="text-xl md:text-3xl font-bold">5X</h2>
          <p>Growth Rate</p>
        </div>
      </div>

    </section>
  )
}