import { Scissors } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border bg-surface">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Scissors className="w-5 h-5 text-primary" />
        <span className="font-display font-bold gold-text">Barbosa's Barber</span>
      </div>
      <p className="text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} Barbosa's Barber. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
