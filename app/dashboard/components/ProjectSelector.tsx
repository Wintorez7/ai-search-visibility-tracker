"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Project {
  id: string;
  domain: string;
  brand: string;
}

export const ProjectSelector = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // ✅ Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // ✅ Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects/list", { credentials: "include" });
      const data = await res.json();
      setProjects(data.projects || []);

      // Auto-select first project if none selected
      if (data.projects?.length && !selected) {
        setSelected(data.projects[0].id);
        onSelect(data.projects[0].id);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // ✅ Delete project
  const handleDelete = async () => {
    if (!selected) return alert("Please select a project to delete.");
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/projects/${selected}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      console.log("🧩 Delete response:", data);

      if (!res.ok) throw new Error("Failed to delete project");
      alert("Project deleted successfully ✅");

      // Refresh project list
      await fetchProjects();
      setSelected("");
      onSelect("");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting project ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch projects + realtime subscription
  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel("realtime-projects")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => fetchProjects()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-medium text-gray-700">Select Project:</span>

      {/* Project Selector */}
      <Select
        value={selected}
        onValueChange={(val) => {
          setSelected(val);
          onSelect(val);
        }}
      >
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Choose a project" />
        </SelectTrigger>
        <SelectContent>
          {projects.length > 0 ? (
            projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.brand} ({project.domain})
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="none">
              No projects available
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Delete Button */}
      <Button
        variant="destructive"
        disabled={!selected || loading}
        onClick={handleDelete}
        className="flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};
