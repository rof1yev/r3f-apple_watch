import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "./components/loader";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Scene from "./components/scene";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      })
      .to(sceneRef.current, {
        x: "-25vw",
        y: "100vh",
      })
      .to(sceneRef.current, {
        x: "25vw",
        y: "200vh",
      })
      .to(sceneRef.current, {
        x: "-25vw",
        y: "300vh",
      });
  }, []);

  return (
    <main ref={mainRef} className="overflow-x-hidden bg-[#222222]">
      <section className="relative grid place-items-center h-screen">
        <h2 className="text-white text-center absolute top-1/12 mx-4 w-fit text-8xl font-bold z-10">
          Apple Watch
        </h2>

        <h2 className="text-white text-center absolute bottom-1/12 mx-4 w-fit text-8xl font-bold z-10">
          Ultra 2
        </h2>

        <div ref={sceneRef} className="sticky h-screen w-full">
          <Canvas>
            <Suspense fallback={<Loader />}>
              <Scene progress={progress} />
            </Suspense>
          </Canvas>
        </div>
      </section>
      <section className="relative flex items-center justify-evenly h-screen px-4">
        <div className="w-1/2 " />

        <p className="text-neutral-300 w-1/2 text-center text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          deserunt voluptas pariatur vitae neque ullam nihil odit blanditiis
          iusto facere.
        </p>
      </section>

      <section className="relative flex items-center justify-evenly h-screen px-4">
        <p className="text-neutral-300 w-1/2 text-center text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          deserunt voluptas pariatur vitae neque ullam nihil odit blanditiis
          iusto facere.
        </p>

        <div className="w-1/2 " />
      </section>

      <section className="relative flex items-center justify-evenly h-screen px-4">
        <div className="w-1/2 " />

        <p className="text-neutral-300 w-1/2 text-center text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          deserunt voluptas pariatur vitae neque ullam nihil odit blanditiis
          iusto facere.
        </p>
      </section>
    </main>
  );
}
