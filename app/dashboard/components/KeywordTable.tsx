import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, TrendingUp, TrendingDown, Minus, Eye } from "lucide-react";

const keywords = [
  {
    keyword: "best travel planner",
    chatgpt: true,
    gemini: false,
    claude: true,
    perplexity: true,
    trend: "up",
  },
  {
    keyword: "cheap transport booking",
    chatgpt: true,
    gemini: true,
    claude: false,
    perplexity: true,
    trend: "neutral",
  },
  {
    keyword: "ai travel site",
    chatgpt: false,
    gemini: false,
    claude: true,
    perplexity: false,
    trend: "down",
  },
  {
    keyword: "online trip organizer",
    chatgpt: true,
    gemini: true,
    claude: true,
    perplexity: true,
    trend: "up",
  },
  {
    keyword: "vacation planner app",
    chatgpt: true,
    gemini: false,
    claude: true,
    perplexity: true,
    trend: "up",
  },
];

const StatusIcon = ({ visible }: { visible: boolean }) => {
  return visible ? (
    <CheckCircle2 className="h-5 w-5 text-success" />
  ) : (
    <XCircle className="h-5 w-5 text-destructive" />
  );
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") {
    return <TrendingUp className="h-5 w-5 text-success" />;
  }
  if (trend === "down") {
    return <TrendingDown className="h-5 w-5 text-destructive" />;
  }
  return <Minus className="h-5 w-5 text-muted-foreground" />;
};

export const KeywordTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Visibility</CardTitle>
        <p className="text-sm text-muted-foreground">Track keyword performance across engines</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Keyword</TableHead>
              <TableHead className="text-center">ChatGPT</TableHead>
              <TableHead className="text-center">Gemini</TableHead>
              <TableHead className="text-center">Claude</TableHead>
              <TableHead className="text-center">Perplexity</TableHead>
              <TableHead className="text-center">Trend</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywords.map((item) => (
              <TableRow key={item.keyword}>
                <TableCell className="font-medium">{item.keyword}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <StatusIcon visible={item.chatgpt} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <StatusIcon visible={item.gemini} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <StatusIcon visible={item.claude} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <StatusIcon visible={item.perplexity} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <TrendIcon trend={item.trend} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
