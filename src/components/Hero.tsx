import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroFallback from "@/assets/hero-fallback.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={heroFallback}
        >
          <source src="/videos/cafe-ambiance.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'var(--gradient-overlay)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(45_70%_55%/0.1),transparent_70%)]" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="relative mb-6">
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-primary-foreground luxury-text-shadow tracking-tight">
              Verdant Brew
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-3xl -z-10" />
          </div>
          
          <div className="flex items-center justify-center gap-4 text-primary-foreground/90 mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <p className="text-xl md:text-2xl lg:text-3xl font-serif font-light tracking-widest italic">
              Where Nature Meets Luxury
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-accent via-accent to-transparent" />
          </div>
          
          <p className="text-base md:text-lg lg:text-xl font-serif text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience artisanal coffee crafted with organic ingredients in a tranquil, nature-inspired sanctuary
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 rounded-full font-serif tracking-wide relative overflow-hidden group"
              style={{ boxShadow: 'var(--shadow-luxury)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Reserve a Table
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10 py-7 rounded-full border-2 border-primary-foreground/80 text-primary-foreground font-serif tracking-wide hover:bg-primary-foreground/10 hover:border-accent hover:text-accent transition-all duration-500 backdrop-blur-sm"
            >
              Explore Menu
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
