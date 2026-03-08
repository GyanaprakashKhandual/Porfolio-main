"use client";

import { useState } from "react";
import SkillsSidebar from "@/app/components/Skill.sidebar";

interface Skill {
  skillName: string;
  totalProjects: string;
  totalExperience: string;
  description: string;
  githubLink: string;
  learningLink: string;
  learningSource: string;
}

interface SkillsLayoutProps {
  children: React.ReactNode;
}

// Context to share skills state between layout and page
import { createContext, useContext } from "react";

interface SkillsContextType {
  skills: Skill[];
  loading: boolean;
  selectedKey: string;
  setSkillsData: (data: Skill[], key: string, loading: boolean) => void;
  onKeyChange: (key: string) => void;
}

export const SkillsContext = createContext<SkillsContextType>({
  skills: [],
  loading: true,
  selectedKey: "web/backend",
  setSkillsData: () => {},
  onKeyChange: () => {},
});

export function useSkillsContext() {
  return useContext(SkillsContext);
}

export default function SkillsLayout({ children }: SkillsLayoutProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState("web/backend");

  function setSkillsData(data: Skill[], key: string, isLoading: boolean) {
    setSkills(data);
    setLoading(isLoading);
  }

  return (
    <SkillsContext.Provider value={{
      skills,
      loading,
      selectedKey,
      setSkillsData,
      onKeyChange: setSelectedKey,
    }}>
      <div className="flex h-[calc(100vh-56px)] bg-white overflow-hidden dark:bg-gray-950">
        <SkillsSidebar
          onSelect={setSkillsData}
          selectedKey={selectedKey}
          onKeyChange={setSelectedKey}
        />
        <main className="flex-1 flex flex-col overflow-y-auto">
          {children}
        </main>
      </div>
    </SkillsContext.Provider>
  );
}