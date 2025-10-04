import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    category: "Signature Brews",
    items: [
      { name: "Verdant Espresso", description: "Single-origin Ethiopian coffee with notes of bergamot and wildflowers", price: "$5.50", special: true },
      { name: "Forest Latte", description: "Smooth espresso with house-made oat milk and a hint of maple", price: "$6.50" },
      { name: "Garden Pour Over", description: "Precision-brewed Colombian coffee with citrus undertones", price: "$6.00" },
      { name: "Meadow Cappuccino", description: "Classic cappuccino with microfoam artistry", price: "$5.50" },
    ]
  },
  {
    category: "Artisan Pastries",
    items: [
      { name: "Honeycomb Croissant", description: "Buttery layers with wildflower honey glaze", price: "$4.50", special: true },
      { name: "Botanical Scone", description: "Lavender and lemon with clotted cream", price: "$4.00" },
      { name: "Forest Berry Tart", description: "Seasonal berries on almond cream", price: "$6.00" },
      { name: "Matcha Roll", description: "Green tea sponge with vanilla cream", price: "$5.50" },
    ]
  },
];

const Menu = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully curated selections that celebrate the artistry of coffee and the bounty of nature
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {menuItems.map((category, idx) => (
            <Card 
              key={idx}
              className="border-border/50 shadow-sm hover:shadow-md transition-shadow animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-border/30 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        {item.special && (
                          <Badge variant="secondary" className="text-xs">
                            Chef's Choice
                          </Badge>
                        )}
                      </div>
                      <span className="font-display text-primary font-semibold">{item.price}</span>
                    </div>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
