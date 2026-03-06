import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Scissors } from "lucide-react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Contato", href: "#contato" },
];


interface HeaderProps {
  onLogoClick: () => void;
}

const Header = ({ onLogoClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "glass-card shadow-lg shadow-gold/5" : "bg-transparent"}`
      }>
      
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-2 group">
          <Scissors className="w-8 h-8 text-primary transition-transform group-hover:rotate-45" />
          <span className="text-2xl font-display font-bold gold-text">Barbosa's Barber & Tattoo

          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
            
              {item.label}
            </a>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground">
          
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen &&
      <motion.nav
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="md:hidden glass-card border-t border-border">
        
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) =>
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
            
                {item.label}
              </a>
          )}
          </div>
        </motion.nav>
      }
    </motion.header>);

};

export default Header;