"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  domain: string;
  brand: string;
}

export const ProjectSelector = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string>("");

  // ✅ Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // ✅ Function to fetch projects
  const fetchProjects = async () => {
    const res = await fetch("/api/projects/list", { credentials: "include" });
    const data = await res.json();
    setProjects(data.projects || []);

    if (data.projects?.length && !selected) {
      setSelected(data.projects[0].id);
      onSelect(data.projects[0].id);
    }
  };

  // ✅ Fetch projects initially
  useEffect(() => {
    fetchProjects();

    // ✅ Subscribe to Supabase changes
    const channel = supabase
      .channel("realtime-projects")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        (payload) => {
          console.log("📡 Realtime change detected:", payload);
          fetchProjects(); // refresh automatically
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-medium text-gray-700">Select Project:</span>
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
    </div>
  );
};
