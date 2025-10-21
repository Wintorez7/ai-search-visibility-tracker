"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const AddProjectModal = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    domain: "",
    brand: "",
    competitors: "",
    keywords: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ Create the new project
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...form,
        competitors: form.competitors
          ? form.competitors.split(",").map((c) => c.trim())
          : [],
        keywords: form.keywords
          ? form.keywords.split(",").map((k) => k.trim())
          : [],
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert("❌ " + data.error);
      return;
    }

    alert("✅ Project added successfully!");

    // 2️⃣ Automatically generate fake checks for this new project
    try {
      await fetch("/api/checks/run", {
        method: "POST",
      });
      console.log("✅ Auto visibility checks added!");
    } catch (err) {
      console.error("Error running auto checks:", err);
    }

    // 3️⃣ Clear form & refresh dashboard
    setForm({ domain: "", brand: "", competitors: "", keywords: "" });
    router.refresh(); // 🔥 This revalidates charts, tables & metrics
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="gap-2 bg-white text-primary hover:bg-gray-100"
        >
          + Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input
            placeholder="Domain (example.com)"
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            required
          />
          <Input
            placeholder="Brand Name"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            required
          />
          <Input
            placeholder="Competitors (comma-separated)"
            value={form.competitors}
            onChange={(e) => setForm({ ...form, competitors: e.target.value })}
          />
          <Input
            placeholder="Keywords (comma-separated)"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
