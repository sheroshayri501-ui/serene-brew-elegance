import cafeInterior from "@/assets/cafe-interior.jpg";
import pastries from "@/assets/pastries.jpg";
import coffeePour from "@/assets/coffee-pour.jpg";

const Gallery = () => {
  const images = [
    { src: cafeInterior, alt: "Cozy cafe interior with natural elements", span: "md:col-span-2" },
    { src: pastries, alt: "Fresh organic pastries and coffee", span: "md:col-span-1" },
    { src: coffeePour, alt: "Artisanal coffee pour over", span: "md:col-span-1" },
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 luxury-text-shadow">
            Experience the Ambiance
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mx-auto mb-6" />
          <p className="text-lg md:text-xl font-serif text-muted-foreground max-w-2xl mx-auto italic">
            A visual journey through our tranquil space where nature and luxury converge
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image, idx) => (
            <div 
              key={idx}
              className={`${image.span} group relative overflow-hidden rounded-2xl animate-scale-in border border-accent/20`}
              style={{ 
                animationDelay: `${idx * 0.15}s`,
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[400px] object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-1 ring-inset ring-accent/0 group-hover:ring-accent/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
