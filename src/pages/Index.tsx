import { useState, useEffect, useRef } from "react";
import Header from "@/components/barbershop/Header";
import Hero from "@/components/barbershop/Hero";
import About from "@/components/barbershop/About";
import Services from "@/components/barbershop/Services";
import BookingSystem from "@/components/barbershop/BookingSystem";
import Contact from "@/components/barbershop/Contact";
import Footer from "@/components/barbershop/Footer";
import AdminPanel from "@/components/barbershop/AdminPanel";
import WhatsAppButton from "@/components/barbershop/WhatsAppButton";

const Index = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout>>();

  /* Ctrl+Shift+A to open admin */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setAdminOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* 5 rapid clicks on logo */
  const handleLogoClick = () => {
    clickCount.current++;
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      setAdminOpen(true);
    }
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogoClick={handleLogoClick} />
      <Hero />
      <About />
      <Services />
      <BookingSystem />
      <Contact />
      <Footer />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
