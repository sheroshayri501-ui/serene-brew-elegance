import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MenuCategoryCard from "./MenuCategoryCard";
import MenuItemDialog from "./MenuItemDialog";
import CategoryDialog from "./CategoryDialog";

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  is_special: boolean;
  display_order: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  display_order: number;
  items?: MenuItem[];
}

const AdminMenuManager = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const { data: categoriesData, error: catError } = await supabase
        .from("menu_categories")
        .select("*")
        .order("display_order");

      if (catError) throw catError;

      const { data: itemsData, error: itemsError } = await supabase
        .from("menu_items")
        .select("*")
        .order("display_order");

      if (itemsError) throw itemsError;

      const categoriesWithItems = categoriesData.map(cat => ({
        ...cat,
        items: itemsData.filter(item => item.category_id === cat.id)
      }));

      setCategories(categoriesWithItems);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setEditingItem(null);
    setItemDialogOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setSelectedCategoryId(item.category_id);
    setItemDialogOpen(true);
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      
      fetchMenuData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: MenuCategory) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const { error } = await supabase
        .from("menu_categories")
        .delete()
        .eq("id", categoryId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      
      fetchMenuData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading menu data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold text-foreground">
          Menu Management
        </h2>
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6">
        {categories.map((category) => (
          <MenuCategoryCard
            key={category.id}
            category={category}
            onAddItem={handleAddItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        ))}
      </div>

      <MenuItemDialog
        open={itemDialogOpen}
        onOpenChange={setItemDialogOpen}
        categoryId={selectedCategoryId}
        editingItem={editingItem}
        onSuccess={fetchMenuData}
      />

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        editingCategory={editingCategory}
        onSuccess={fetchMenuData}
      />
    </div>
  );
};

export default AdminMenuManager;
