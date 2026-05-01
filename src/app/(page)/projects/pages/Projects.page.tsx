"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Loader2 } from "lucide-react";
import ProjectCard from "../components/Project.card";

interface ProjectMeta {
  slug: string;
  title: string;
  type: string;
  tags: string[];
  technologies: string[];
  liveDemo: string;
  repositoryFrontend: string;
  description: string;
  overview: string;
}

function parseFrontmatter(raw: string): {
  meta: Record<string, unknown>;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, unknown> = {};
  const yamlBlock = match[1];
  const body = match[2].trim();

  let currentKey = "";
  let inArray = false;
  const arrayBuffer: string[] = [];

  for (const line of yamlBlock.split("\n")) {
    const arrayItem = line.match(/^\s{2}-\s+(.+)/);
    const keyValue = line.match(/^([a-zA-Z0-9_]+):\s*(.*)/);

    if (arrayItem && inArray) {
      arrayBuffer.push(arrayItem[1].trim());
    } else if (keyValue) {
      if (inArray && currentKey) {
        meta[currentKey] = [...arrayBuffer];
        arrayBuffer.length = 0;
        inArray = false;
      }
      currentKey = keyValue[1];
      const val = keyValue[2].trim();
      if (val === "") {
        inArray = true;
      } else {
        meta[currentKey] = val;
        inArray = false;
      }
    }
  }

  if (inArray && currentKey) meta[currentKey] = [...arrayBuffer];

  return { meta, body };
}

function extractOverview(body: string): string {
  const overviewMatch = body.match(/## Overview\n+([\s\S]*?)(?=\n##|$)/);
  return overviewMatch?.[1]?.trim() ?? "";
}

function extractDescription(body: string): string {
  const lines = body.split("\n").filter((l) => l.trim() && !l.startsWith("#"));
  return lines[0]?.replace(/^##\s*/, "").trim() ?? "";
}

async function loadProjectMeta(slug: string): Promise<ProjectMeta | null> {
  try {
    const res = await fetch(`/projects/${slug}.md`);
    if (!res.ok) return null;
    const raw = await res.text();
    const { meta, body } = parseFrontmatter(raw);

    return {
      slug: (meta.slug as string) ?? slug,
      title: (meta.title as string) ?? "",
      type: (meta.type as string) ?? "",
      tags: (meta.tags as string[]) ?? [],
      technologies: (meta.technologies as string[]) ?? [],
      liveDemo: (meta.liveDemo as string) ?? "",
      repositoryFrontend: (meta.repositoryFrontend as string) ?? "",
      description: extractDescription(body),
      overview: extractOverview(body),
    };
  } catch {
    return null;
  }
}

const PROJECT_SLUGS = ["caffetest", "resolution-pro"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all(PROJECT_SLUGS.map(loadProjectMeta))
      .then((results) => {
        const valid = results.filter(Boolean) as ProjectMeta[];
        if (valid.length === 0) throw new Error("No projects found.");
        setProjects(valid);
      })
      .catch(() => setError("Failed to load projects."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="px-5 py-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50">
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <Layers
              className="w-4 h-4 text-gray-600 dark:text-gray-400"
              strokeWidth={1.8}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            All Projects
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500 ml-12">
          {projects.length} projects — click any card to explore details
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
