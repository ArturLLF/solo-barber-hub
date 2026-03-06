import { useState } from "react";
import { Camera } from "lucide-react";

const placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

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
          {placeholders.map((num) => (
            <div
              key={num}
              className="aspect-square rounded-sm overflow-hidden border border-border bg-muted/30 flex items-center justify-center group hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                <Camera className="w-8 h-8" />
                <span className="text-xs font-body">Foto {num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
