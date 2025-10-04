import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <AlertCircle className="h-5 w-5" />
            Cloud Setup Required
          </CardTitle>
          <CardDescription>
            The admin panel requires Lovable Cloud to be fully initialized
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Once Cloud is ready, run the SQL setup script provided in the chat, then return here to manage your menu.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-primary hover:underline"
          >
            ← Back to main site
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
