import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  is_special: boolean;
}

interface MenuCategory {
  id: string;
  category: string;
  items: MenuItem[];
}

const Menu = () => {
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const { data: categories, error: catError } = await supabase
        .from("menu_categories")
        .select("*")
        .order("display_order");

      if (catError) throw catError;

      const { data: items, error: itemsError } = await supabase
        .from("menu_items")
        .select("*")
        .order("display_order");

      if (itemsError) throw itemsError;

      const formattedData: MenuCategory[] = categories.map(cat => ({
        id: cat.id,
        category: cat.name,
        items: items.filter(item => item.category_id === cat.id)
      }));

      setMenuData(formattedData);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">Loading menu...</p>
        </div>
      </section>
    );
  }

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
          {menuData.map((category, idx) => (
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
                        {item.is_special && (
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
