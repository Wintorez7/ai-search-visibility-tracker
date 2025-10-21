"use client";

import { useState, useEffect } from "react";
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
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KeywordData {
  id: number;
  keyword: string;
  chatgpt: boolean;
  gemini: boolean;
  claude: boolean;
  perplexity: boolean;
  trend: "up" | "down" | "neutral";
  trendValue: number;
  visibility: number;
  position: number;
}

const StatusIcon = ({ visible }: { visible: boolean }) => {
  return visible ? (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
      <CheckCircle2 className="h-5 w-5 text-green-600" />
    </div>
  ) : (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
      <XCircle className="h-5 w-5 text-red-600" />
    </div>
  );
};

const TrendIcon = ({ trend, value }: { trend: string; value: number }) => {
  if (trend === "up") {
    return (
      <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full">
        <TrendingUp className="h-4 w-4" />
        <span className="text-xs font-medium">+{value}%</span>
      </div>
    );
  }
  if (trend === "down") {
    return (
      <div className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded-full">
        <TrendingDown className="h-4 w-4" />
        <span className="text-xs font-medium">{value}%</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
      <Minus className="h-4 w-4" />
      <span className="text-xs font-medium">0%</span>
    </div>
  );
};

const VisibilityBadge = ({ visibility }: { visibility: number }) => {
  if (visibility === 100) {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Full</Badge>;
  }
  if (visibility >= 75) {
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">High</Badge>;
  }
  if (visibility >= 50) {
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge>;
  }
  return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Low</Badge>;
};

export const KeywordTable = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEngine, setFilterEngine] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"keyword" | "visibility" | "trend">("visibility");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    setIsMounted(true);

    async function fetchKeywords() {
      try {
        const res = await fetch("/api/keywords");
        const data = await res.json();
        setKeywords(data);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    }

    fetchKeywords();
  }, []);

  if (!isMounted) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Keyword Visibility</CardTitle>
          <p className="text-sm text-gray-500">Loading data...</p>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">Fetching...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredKeywords = keywords
    .filter((item) => {
      if (searchTerm && !item.keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (filterEngine !== "all") {
        if (filterEngine === "chatgpt" && !item.chatgpt) return false;
        if (filterEngine === "gemini" && !item.gemini) return false;
        if (filterEngine === "claude" && !item.claude) return false;
        if (filterEngine === "perplexity" && !item.perplexity) return false;
      }

      return true;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;

      if (sortBy === "keyword") {
        aValue = a.keyword;
        bValue = b.keyword;
      } else if (sortBy === "visibility") {
        aValue = a.visibility;
        bValue = b.visibility;
      } else {
        aValue = a.trendValue;
        bValue = b.trendValue;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSort = (column: "keyword" | "visibility" | "trend") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">Keyword Visibility</CardTitle>
            <p className="text-sm text-gray-500">Track keyword performance across engines</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search keywords..."
                className="pl-8 w-full sm:w-[200px] bg-white/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/70">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterEngine("all")}>All Engines</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterEngine("chatgpt")}>ChatGPT Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterEngine("gemini")}>Gemini Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterEngine("claude")}>Claude Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterEngine("perplexity")}>Perplexity Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md overflow-hidden border border-white/50 bg-white/70 backdrop-blur-sm">
          <Table>
            <TableHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <TableRow>
                <TableHead
                  className="w-[250px] cursor-pointer hover:bg-blue-100/50 transition-colors"
                  onClick={() => handleSort("keyword")}
                >
                  <div className="flex items-center gap-1">
                    Keyword
                    {sortBy === "keyword" &&
                      (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </TableHead>
                <TableHead className="text-center">ChatGPT</TableHead>
                <TableHead className="text-center">Gemini</TableHead>
                <TableHead className="text-center">Claude</TableHead>
                <TableHead className="text-center">Perplexity</TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-blue-100/50 transition-colors"
                  onClick={() => handleSort("visibility")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Visibility
                    {sortBy === "visibility" &&
                      (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer hover:bg-blue-100/50 transition-colors"
                  onClick={() => handleSort("trend")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Trend
                    {sortBy === "trend" &&
                      (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredKeywords.map((item) => (
                <TableRow key={item.id} className="hover:bg-blue-50/30 transition-colors">
                  <TableCell className="font-medium">{item.keyword}</TableCell>
                  <TableCell className="text-center"><StatusIcon visible={item.chatgpt} /></TableCell>
                  <TableCell className="text-center"><StatusIcon visible={item.gemini} /></TableCell>
                  <TableCell className="text-center"><StatusIcon visible={item.claude} /></TableCell>
                  <TableCell className="text-center"><StatusIcon visible={item.perplexity} /></TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <VisibilityBadge visibility={item.visibility} />
                      <span className="text-xs text-gray-500">Pos: {item.position}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <TrendIcon trend={item.trend} value={item.trendValue} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm" className="gap-1 hover:bg-blue-100">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredKeywords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-2">No keywords found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterEngine("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
