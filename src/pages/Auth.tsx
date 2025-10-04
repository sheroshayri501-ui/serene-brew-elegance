import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-3xl text-primary flex items-center justify-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Cloud Setup Required
          </CardTitle>
          <CardDescription>
            Authentication requires Lovable Cloud to be initialized
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Once Lovable Cloud is fully set up, you'll be able to create an admin account and sign in here.
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

export default Auth;
