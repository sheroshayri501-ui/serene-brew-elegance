import coffeePour from "@/assets/coffee-pour.jpg";

const About = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <img 
              src={coffeePour}
              alt="Artisanal coffee brewing process"
              className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
              style={{ boxShadow: 'var(--shadow-elegant)' }}
            />
          </div>
          
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Born from a passion for exceptional coffee and a deep reverence for nature, 
              Verdant Brew is more than a café—it's a sanctuary where every cup tells a story.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We source only the finest organic beans from sustainable farms around the world, 
              roasting them in small batches to preserve their unique character. Our space is 
              designed to reflect the harmony between modern luxury and natural beauty.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Organic</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Origins</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary mb-2">Daily</div>
                <div className="text-sm text-muted-foreground">Fresh Roasted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
