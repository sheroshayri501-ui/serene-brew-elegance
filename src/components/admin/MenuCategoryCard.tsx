import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { MenuCategory, MenuItem } from "./AdminMenuManager";
import { Badge } from "@/components/ui/badge";

interface MenuCategoryCardProps {
  category: MenuCategory;
  onAddItem: (categoryId: string) => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (itemId: string) => void;
  onEditCategory: (category: MenuCategory) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const MenuCategoryCard = ({
  category,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onEditCategory,
  onDeleteCategory,
}: MenuCategoryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4">
        <CardTitle className="font-display text-xl sm:text-2xl text-primary">
          {category.name}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditCategory(category)}
          >
            <Edit className="h-4 w-4 sm:mr-0" />
            <span className="sm:hidden ml-2">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteCategory(category.id)}
          >
            <Trash2 className="h-4 w-4 sm:mr-0" />
            <span className="sm:hidden ml-2">Delete</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onAddItem(category.id)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {category.items?.length === 0 ? (
            <p className="text-muted-foreground text-sm">No items in this category</p>
          ) : (
            category.items?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors gap-4"
              >
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    {item.is_special && (
                      <Badge variant="secondary" className="text-xs">
                        Chef's Choice
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.description}
                  </p>
                  <span className="font-display text-primary font-semibold">
                    {item.price}
                  </span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditItem(item)}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="ml-2 sm:hidden">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteItem(item.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="ml-2 sm:hidden">Delete</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCategoryCard;
