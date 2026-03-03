import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => (
  <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 bg-background">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, hsl(51 100% 50%) 0, hsl(51 100% 50%) 1px, transparent 0, transparent 50%)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>

    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-4">
          Barbearia Premium
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 text-shadow-gold">
          <span className="gold-text">Barbosa's</span>
          <br />
          <span className="text-foreground">Barber</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto mb-10">
          Estilo, tradição e excelência. A arte de ser cavalheiro começa aqui.
        </p>
        <a
          href="#agendamento"
          className="inline-block gold-gradient text-primary-foreground font-body font-semibold px-10 py-4 rounded-sm uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
        >
          Agendar Horário
        </a>
      </motion.div>
    </div>

    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <ChevronDown className="w-6 h-6 text-primary" />
    </motion.div>
  </section>
);

export default Hero;
