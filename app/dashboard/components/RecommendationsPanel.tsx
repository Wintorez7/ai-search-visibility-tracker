import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, CheckCircle } from "lucide-react";

const recommendations = [
  {
    type: "warning",
    icon: AlertTriangle,
    message: "Missing on Gemini for 4 keywords",
    color: "text-warning",
  },
  {
    type: "error",
    icon: TrendingDown,
    message: 'Low citations for "ai travel site"',
    color: "text-destructive",
  },
  {
    type: "success",
    icon: CheckCircle,
    message: "Strong visibility on ChatGPT",
    color: "text-success",
  },
];

export const RecommendationsPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
        <p className="text-sm text-muted-foreground">Action items to improve visibility</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => (
          <Alert key={index} className="border-l-4" style={{ borderLeftColor: `hsl(var(--${rec.type === 'warning' ? 'warning' : rec.type === 'error' ? 'destructive' : 'success'}))` }}>
            <rec.icon className={`h-4 w-4 ${rec.color}`} />
            <AlertDescription className="ml-2">
              {rec.message}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};
