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
import { CheckCircle2, XCircle, TrendingUp, TrendingDown, Minus, Eye, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const keywords = [
  {
    id: 1,
    keyword: "best travel planner",
    chatgpt: true,
    gemini: false,
    claude: true,
    perplexity: true,
    trend: "up",
    trendValue: 12,
    visibility: 75,
    position: 2.4,
  },
  {
    id: 2,
    keyword: "cheap transport booking",
    chatgpt: true,
    gemini: true,
    claude: false,
    perplexity: true,
    trend: "neutral",
    trendValue: 0,
    visibility: 75,
    position: 3.1,
  },
  {
    id: 3,
    keyword: "ai travel site",
    chatgpt: false,
    gemini: false,
    claude: true,
    perplexity: false,
    trend: "down",
    trendValue: -8,
    visibility: 25,
    position: 5.2,
  },
  {
    id: 4,
    keyword: "online trip organizer",
    chatgpt: true,
    gemini: true,
    claude: true,
    perplexity: true,
    trend: "up",
    trendValue: 15,
    visibility: 100,
    position: 1.8,
  },
  {
    id: 5,
    keyword: "vacation planner app",
    chatgpt: true,
    gemini: false,
    claude: true,
    perplexity: true,
    trend: "up",
    trendValue: 5,
    visibility: 75,
    position: 2.7,
  },
];

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEngine, setFilterEngine] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"keyword" | "visibility" | "trend">("visibility");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    setIsMounted(true);
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
            <p className="text-sm text-gray-500">Initializing...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter and sort keywords
  const filteredKeywords = keywords
    .filter((item) => {
      // Search filter
      if (searchTerm && !item.keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Engine filter
      if (filterEngine !== "all") {
        if (filterEngine === "chatgpt" && !item.chatgpt) return false;
        if (filterEngine === "gemini" && !item.gemini) return false;
        if (filterEngine === "claude" && !item.claude) return false;
        if (filterEngine === "perplexity" && !item.perplexity) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
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
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
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
                    {sortBy === "keyword" && (
                      sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
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
                    {sortBy === "visibility" && (
                      sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-center cursor-pointer hover:bg-blue-100/50 transition-colors"
                  onClick={() => handleSort("trend")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Trend
                    {sortBy === "trend" && (
                      sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeywords.map((item) => (
                <>
                  <TableRow key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleRowExpansion(item.id)}
                        >
                          {expandedRows.includes(item.id) ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </Button>
                        {item.keyword}
                      </div>
                    </TableCell>
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
                  {expandedRows.includes(item.id) && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-4 bg-blue-50/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-3 rounded-lg border border-blue-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Metrics</h4>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Click-through Rate:</span>
                                <span className="font-medium">{(Math.random() * 10 + 2).toFixed(1)}%</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Impressions:</span>
                                <span className="font-medium">{Math.floor(Math.random() * 1000 + 500)}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Conversions:</span>
                                <span className="font-medium">{Math.floor(Math.random() * 50 + 10)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-blue-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Historical Trend</h4>
                            <div className="h-16 flex items-end justify-between gap-1">
                              {Array.from({ length: 7 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                                  style={{ height: `${Math.random() * 100}%` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-blue-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                            <ul className="text-xs space-y-1">
                              <li className="flex items-start gap-1">
                                <span className="text-blue-500">•</span>
                                <span>Focus on improving Gemini visibility</span>
                              </li>
                              <li className="flex items-start gap-1">
                                <span className="text-blue-500">•</span>
                                <span>Optimize content for better positioning</span>
                              </li>
                              <li className="flex items-start gap-1">
                                <span className="text-blue-500">•</span>
                                <span>Consider long-tail variations</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredKeywords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-2">No keywords found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFilterEngine("all");
            }}>
              Clear filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};