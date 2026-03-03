import { motion } from "framer-motion";

const cuts = [
  { id: 1, url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500", title: "Degradê Moderno" },
  { id: 2, url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500", title: "Barba Alinhada" },
  { id: 3, url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500", title: "Corte Clássico" },
  { id: 4, url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500", title: "Social Executivo" },
];

const Gallery = () => (
  <section id="galeria" className="py-24 bg-surface">
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-3">Nosso Portfólio</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Cortes de <span className="gold-text">Referência</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cuts.map((cut, i) => (
          <motion.div
            key={cut.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative aspect-[3/4] overflow-hidden group rounded-sm"
          >
            <img 
              src={cut.url} 
              alt={cut.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-primary font-display font-bold uppercase tracking-widest">{cut.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
