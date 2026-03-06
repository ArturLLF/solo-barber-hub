import foto1 from "@/assets/foto1barber.jpeg";
import foto2 from "@/assets/foto2barber.jpeg";
import foto3 from "@/assets/foto3barber.jpeg";
import foto4 from "@/assets/foto4barber.png";
import foto5 from "@/assets/foto5barber.png";
import foto6 from "@/assets/foto6barber.png";

const photos = [foto1, foto2, foto3, foto4, foto5, foto6];

const Gallery = () => {
  return (
    <section id="galeria" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold gold-text mb-4">
            Galeria de Clientes
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Confira alguns dos nossos trabalhos realizados
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {photos.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm overflow-hidden border border-border hover:border-primary/50 transition-colors"
            >
              <img
                src={src}
                alt={`Cliente ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
