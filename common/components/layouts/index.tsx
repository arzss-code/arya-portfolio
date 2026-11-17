"use client";

import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Header from "./Header";

const Notif = dynamic(() => import("../elements/Notif"), { ssr: false });

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      delay: 40,
      once: true,
      disable: () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-gradient-subtle">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <main id="main-content" tabIndex={-1} className="w-full outline-none">
          {children}
        </main>
      </div>
      <Notif />
    </div>
  );
};

export default Layouts;
