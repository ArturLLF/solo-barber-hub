import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const info = [
  { icon: MapPin, label: "Endereço", value: "Qno 15 Conj A Loja 05" },
  { icon: Phone, label: "Telefone", value: "(61) 9698-0205" },
  { icon: Clock, label: "Horário", value: "Seg–Sáb: 09h às 19h30" },
];

const Contact = () => (
  <section id="contato" className="py-24 bg-background">
    <div className="container mx-auto px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">Fale conosco</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
          <span className="gold-text">Contato</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {info.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }} className="glass-card rounded-sm p-6 text-center">
            <item.icon className="w-7 h-7 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-body uppercase tracking-wider mb-1">{item.label}</p>
            <p className="text-foreground font-body font-medium">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
