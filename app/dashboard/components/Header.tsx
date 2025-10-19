import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-primary backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <span className="text-lg font-bold text-white">AI</span>
          </div>
          <h1 className="text-xl font-semibold text-white">
            AI Search Visibility Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="gap-2 bg-white text-primary hover:bg-white/90">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
          <Button size="sm" variant="outline" className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20">
            <Plus className="h-4 w-4" />
            Add Keyword
          </Button>
          <div className="ml-2 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5">
            <User className="h-4 w-4 text-white" />
            <span className="text-sm text-white">rohan@example.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};
