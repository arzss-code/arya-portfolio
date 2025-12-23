"use client";

import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import ChatButton from "../../../modules/chat/components/ChatButton";

import Header from "./Header";

const Notif = dynamic(() => import("../elements/Notif"), { ssr: false });

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  const pathname = usePathname();

  const isShowChatButton = pathname !== "/chat";

  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 50,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <main className="w-full transition-all duration-300">
          {children}
        </main>
      </div>
      <Notif />
      {isShowChatButton && <ChatButton />}
    </div>
  );
};

export default Layouts;

