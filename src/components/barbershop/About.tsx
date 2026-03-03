import { motion } from "framer-motion";
import { Award, Clock, Users } from "lucide-react";

const stats = [
  { icon: Clock, label: "Anos de experiência", value: "10+" },
  { icon: Users, label: "Clientes satisfeitos", value: "5.000+" },
  { icon: Award, label: "Profissionais", value: "4" },
];

const About = () => (
  <section id="sobre" className="py-24 bg-surface">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">Sobre nós</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
          Tradição & <span className="gold-text">Modernidade</span>
        </h2>
        <p className="text-muted-foreground font-body leading-relaxed text-lg">
          A Barbosa's Barber nasceu da paixão pelo cuidado masculino. Combinamos técnicas clássicas
          com tendências contemporâneas para entregar uma experiência única. Aqui, cada corte é
          uma obra de arte e cada cliente sai com a confiança renovada.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center p-6 glass-card rounded-sm"
          >
            <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-display font-bold gold-text mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground font-body uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
