import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroFallback from "@/assets/hero-fallback.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background - can be replaced with actual video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={heroFallback}
        >
          {/* Add your video source here */}
          <source src="/videos/cafe-ambiance.mp4" type="video/mp4" />
        </video>
        {/* Fallback image when video is not available */}
        <img 
          src={heroFallback} 
          alt="Verdant Brew Cafe Interior"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'var(--gradient-overlay)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6">
            Verdant Brew
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-4 font-light">
            Where Nature Meets Luxury
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Experience artisanal coffee crafted with organic ingredients in a tranquil, nature-inspired sanctuary
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 group"
            >
              Reserve a Table
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm"
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
