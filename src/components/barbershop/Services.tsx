import { motion } from "framer-motion";
import { Scissors, Sparkles } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Corte",
    description: "Corte moderno ou clássico, feito sob medida para o seu estilo.",
    price: "R$ 45",
  },
  {
    icon: Sparkles,
    title: "Barba",
    description: "Alinhamento e modelagem com toalha quente e produtos premium.",
    price: "R$ 35",
  },
  {
    icon: Scissors,
    title: "Corte + Barba",
    description: "O combo completo para quem quer sair impecável.",
    price: "R$ 70",
  },
];

const Services = () => (
  <section id="servicos" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">O que oferecemos</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Nossos <span className="gold-text">Serviços</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card rounded-sm p-8 text-center group hover:border-primary/50 transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <service.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">{service.title}</h3>
            <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">{service.description}</p>
            <p className="text-3xl font-display font-bold gold-text">{service.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
