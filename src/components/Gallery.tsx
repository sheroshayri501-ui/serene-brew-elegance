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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience the Ambiance
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A visual journey through our tranquil space where nature and luxury converge
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image, idx) => (
            <div 
              key={idx}
              className={`${image.span} group relative overflow-hidden rounded-2xl animate-scale-in`}
              style={{ 
                animationDelay: `${idx * 0.15}s`,
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
