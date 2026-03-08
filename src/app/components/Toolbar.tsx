"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Menu,
  Copy,
  FileText,
  Download,
  PanelRight,
  MoreHorizontal,
  EyeOff,
  Eye,
  Settings,
  Sun,
  Moon,
  PanelLeft,
  PanelRightClose,
  Pin,
  Edit,
  Check,
  Layers,
  Flame,
  Trees,
  Gem,
  Snowflake,
  Crown,
  Waves,
  Heart,
  Wrench,
  Flower,
  Sword,
  GitCommit,
  User,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";

const THEME_ICON_MAP: Record<string, React.ElementType> = {
  Sun,
  Moon,
  Layers,
  Flame,
  Trees,
  Gem,
  Sword,
  Snowflake,
  Crown,
  Waves,
  Heart,
  Wrench,
  Flower,
};

const dropdownItems = [
  { label: "Hide Toolbar", key: "toolbar" },
  { label: "Hide Left Sidebar", key: "leftSidebar" },
  { label: "Hide Outline Sidebar", key: "outlineSidebar" },
];

interface Tab {
  label: string;
  value: string;
}

interface Action {
  icon: React.ElementType;
  label: string;
}

interface Theme {
  id: string;
  label: string;
  icon: string;
}

interface ToolbarProps {
  tabs?: Tab[];
  actions?: Action[];
  defaultTab?: string;
  onTabChange?: (tab: Tab) => void;
  onMenuToggle?: () => void;
  className?: string;
  onToggleToolbar?: (v: boolean) => void;
  onToggleLeftSidebar?: (v: boolean) => void;
  onToggleOutlineSidebar?: (v: boolean) => void;
  onStickyChange?: (key: string, value: boolean) => void;
  previewContent?: React.ReactNode;
  rawContent?: React.ReactNode;
  theme?: string;
  toggleTheme?: () => void;
  setThemeById?: (id: string) => void;
  themes?: Theme[];
  mounted?: boolean;
  activeSlug?: string;
  content?: string;
}

function BlamePanel() {
  const [commits, setCommits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/GyanaprakashKhandual/Portfolio/commits?path=src/app/note&per_page=20",
    )
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch commits");
        return r.json();
      })
      .then((data) => {
        setCommits(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-40 gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-40 text-sm text-red-500 dark:text-red-400">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col gap-0 overflow-y-auto">
      {commits.map((c) => {
        const sha = c.sha?.slice(0, 7);
        const message = c.commit?.message?.split("\n")[0];
        const author = c.commit?.author?.name;
        const date = c.commit?.author?.date
          ? new Date(c.commit.author.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "";
        const avatar = c.author?.avatar_url;
        const url = c.html_url;

        return (
          <div
            key={c.sha}
            className="flex items-start gap-3 px-4 py-3 transition-colors duration-150 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            {avatar ? (
              <img
                src={avatar}
                alt={author}
                className="w-7 h-7 rounded-full shrink-0 mt-0.5"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate sm:text-sm text-gray-800 dark:text-gray-200">
                {message}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                  {sha}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  ·
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  {author}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  ·
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  {date}
                </span>
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        );
      })}
    </div>
  );
}

const Toolbar = ({
  tabs = [
    { label: "Preview", value: "preview" },
    { label: "Code", value: "code" },
    { label: "Blame", value: "blame" },
  ],
  actions = [
    { icon: Copy, label: "Copy" },
    { icon: FileText, label: "Raw" },
    { icon: Download, label: "Download" },
    { icon: PanelRight, label: "Panel" },
  ],
  defaultTab = "preview",
  onTabChange,
  className = "",
  onToggleToolbar = () => {},
  onToggleLeftSidebar = () => {},
  onToggleOutlineSidebar = () => {},
  onStickyChange = () => {},
  previewContent = null,
  theme,
  toggleTheme,
  setThemeById,
  themes = [],
  mounted = true,
  activeSlug = "",
  content = "",
}: ToolbarProps) => {
  const [activeTab, setActiveTabLocal] = useState(defaultTab);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rawOpen, setRawOpen] = useState(false);
  const [visible, setVisible] = useState({
    toolbar: true,
    leftSidebar: true,
    outlineSidebar: true,
  });
  const [sticky, setSticky] = useState({
    sidebar: false,
    outline: false,
    tooltips: true,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const uniqueThemes = themes.filter(
    (t, index, self) => self.findIndex((x) => x.id === t.id) === index,
  );

  const ThemeIcon = !mounted ? Sun : theme === "dark" ? Sun : Moon;
  const themeLabel = !mounted
    ? "Toggle Theme"
    : theme === "dark"
      ? "Light Mode"
      : "Dark Mode";

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      )
        setSettingsOpen(false);
    }
    if (dropdownOpen || settingsOpen)
      document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen, settingsOpen]);

  function handleTabClick(tab: Tab) {
    setActiveTabLocal(tab.value);
    if (onTabChange) onTabChange(tab);
  }

  function toggleVisible(key: string) {
    setVisible((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === "toolbar") onToggleToolbar(!prev[key]);
      if (key === "leftSidebar") onToggleLeftSidebar(!prev[key]);
      if (key === "outlineSidebar") onToggleOutlineSidebar(!prev[key]);
      return next;
    });
    setDropdownOpen(false);
  }

  function toggleSticky(key: string) {
    setSticky((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === "sidebar" || key === "outline")
        onStickyChange(key, !prev[key]);
      return next;
    });
  }

  function handleCopy() {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    if (!content) return;
    const filename = activeSlug ? `${activeSlug}.md` : "document.md";
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleActionClick(label: string) {
    if (label === "Copy") handleCopy();
    if (label === "Raw") setRawOpen(true);
    if (label === "Download") handleDownload();
    if (label === "Panel") {
      onToggleOutlineSidebar(!visible.outlineSidebar);
      setVisible((prev) => ({ ...prev, outlineSidebar: !prev.outlineSidebar }));
    }
  }

  return (
    <>
      {/* ── Toolbar Bar ── */}
      <div
        className={`w-full h-12 flex items-center bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-2 sm:px-4 shrink-0 ${className}`}
      >
        {/* Left — Menu */}
        <div className="flex items-center w-8 shrink-0 sm:w-24">
          <button
            onClick={() => router.push("/docs")}
            aria-label="Open docs menu"
            className="p-1.5 rounded text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center — Tabs */}
        <div className="flex flex-1 items-center justify-center gap-0.5 sm:gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab)}
                className={`relative px-2 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors duration-150 rounded-sm whitespace-nowrap ${
                  isActive
                    ? "text-gray-900 dark:text-gray-100 font-medium"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="toolbar-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-0.5">
            {actions.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                title={label === "Copy" && copied ? "Copied!" : label}
                onClick={() => handleActionClick(label)}
                className="p-2 transition-colors duration-150 rounded text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {label === "Copy" && copied ? (
                  <Check className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>

          {/* Edit on GitHub */}
          <button
            title="Edit on GitHub"
            onClick={() =>
              router.push(
                "https://github.com/GyanaprakashKhandual/Portfolio/blob/main/src/app/note",
              )
            }
            className="p-2 transition-colors duration-150 rounded text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Edit className="w-4 h-4" />
          </button>

          {/* Theme toggle */}
          {toggleTheme && (
            <button
              title={themeLabel}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 transition-colors duration-150 rounded text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ThemeIcon className="w-4 h-4" />
            </button>
          )}

          {/* Settings dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              title="Settings"
              onClick={() => {
                setSettingsOpen((p) => !p);
                setDropdownOpen(false);
              }}
              aria-label="Settings"
              className={`p-2 rounded transition-colors duration-150 ${
                settingsOpen
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="absolute right-0 z-50 py-1.5 mt-1 origin-top-right top-full w-48 sm:w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-gray-200/60 dark:shadow-black/50"
                >
                  <p className="px-3.5 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    Sticky
                  </p>

                  {[
                    {
                      key: "sidebar",
                      label: "Sidebar Sticky",
                      Icon: PanelLeft,
                    },
                    {
                      key: "outline",
                      label: "Outline Sticky",
                      Icon: PanelRightClose,
                    },
                    { key: "tooltips", label: "Tooltips Sticky", Icon: Pin },
                  ].map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      onClick={() => toggleSticky(key)}
                      className="flex items-center justify-between gap-2.5 rounded-md mx-2 px-3 py-2.5 text-xs sm:text-sm text-left w-[calc(100%-1rem)] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-100 cursor-pointer select-none"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                        {label}
                      </span>
                      <span
                        className={`relative inline-flex h-4 w-7 shrink-0 rounded-full border transition-colors duration-200 ${
                          sticky[key as keyof typeof sticky]
                            ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
                            : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 mt-0.5 rounded-full shadow transition-transform duration-200 ${
                            sticky[key as keyof typeof sticky]
                              ? "translate-x-3.5 bg-white dark:bg-gray-900"
                              : "translate-x-0.5 bg-white dark:bg-gray-600"
                          }`}
                        />
                      </span>
                    </button>
                  ))}

                  {mounted && uniqueThemes.length > 0 && (
                    <>
                      <div className="my-1.5 mx-3 h-px bg-gray-100 dark:bg-gray-800" />
                      <p className="px-3.5 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        Theme
                      </p>
                      {uniqueThemes.map(({ id, label, icon }) => {
                        const IconComponent = THEME_ICON_MAP[icon] ?? Sun;
                        const isActive = theme === id;
                        return (
                          <button
                            key={id}
                            onClick={() => setThemeById?.(id)}
                            className="flex items-center justify-between gap-2.5 rounded-md mx-2 px-3 py-2.5 text-xs sm:text-sm text-left w-[calc(100%-1rem)] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-100 cursor-pointer select-none"
                          >
                            <span className="flex items-center gap-2.5">
                              <IconComponent className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                              {label}
                            </span>
                            {isActive && (
                              <Check className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* More dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              title="More options"
              onClick={() => {
                setDropdownOpen((p) => !p);
                setSettingsOpen(false);
              }}
              aria-label="More options"
              className={`p-2 rounded transition-colors duration-150 ${
                dropdownOpen
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="max-h-48 absolute right-0 z-50 py-1.5 mt-1 origin-top-right top-full w-48 sm:w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-gray-200/60 dark:shadow-black/50"
                >
                  {/* Mobile-only actions */}
                  <div className="md:hidden">
                    <p className="px-3.5 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Actions
                    </p>
                    {actions.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        onClick={() => {
                          handleActionClick(label);
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 rounded-md mx-2 px-3 py-2.5 text-xs sm:text-sm text-left w-[calc(100%-1rem)] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-100 cursor-pointer select-none"
                      >
                        {label === "Copy" && copied ? (
                          <Check className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 shrink-0" />
                        ) : (
                          <Icon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                        )}
                        {label === "Copy" && copied ? "Copied!" : label}
                      </button>
                    ))}
                    <div className="my-1.5 mx-3 h-px bg-gray-100 dark:bg-gray-800" />
                  </div>

                  <p className="px-3.5 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    Visibility
                  </p>
                  {dropdownItems.map(({ label, key }) => {
                    const isVisible = visible[key as keyof typeof visible];
                    return (
                      <button
                        key={key}
                        onClick={() => toggleVisible(key)}
                        className="flex items-center justify-between gap-2.5 rounded-md mx-2 px-3 py-2.5 text-xs sm:text-sm text-left w-[calc(100%-1rem)] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-100 cursor-pointer select-none"
                      >
                        <span className="flex items-center gap-2.5">
                          {isVisible ? (
                            <EyeOff className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                          )}
                          {isVisible ? label : label.replace("Hide", "Show")}
                        </span>
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            isVisible
                              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                              : "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                          }`}
                        >
                          {isVisible ? "on" : "off"}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === "preview" && previewContent && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {previewContent}
          </motion.div>
        )}

        {activeTab === "code" && (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-auto"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-800 shrink-0">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                {activeSlug ? `${activeSlug}.md` : "document.md"}
              </span>
              <button
                title={copied ? "Copied!" : "Copy"}
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />{" "}
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 font-mono text-xs leading-relaxed break-words whitespace-pre-wrap text-gray-600 dark:text-gray-400 sm:text-sm">
              {content || "No content loaded."}
            </pre>
          </motion.div>
        )}

        {activeTab === "blame" && (
          <motion.div
            key="blame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-auto"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 shrink-0">
              <GitCommit className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
                Commits — src/app/note
              </span>
            </div>
            <BlamePanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Raw Modal ── */}
      <AnimatePresence>
        {rawOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setRawOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex flex-col max-h-screen min-h-screen overflow-hidden border shadow-2xl bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-800 sm:px-4 sm:py-3 shrink-0">
                <div className="flex items-center min-w-0 gap-2">
                  <FileText className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                  <span className="text-xs font-medium truncate text-gray-700 dark:text-gray-300 sm:text-sm">
                    Raw — {activeSlug ? `${activeSlug}.md` : "document.md"}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    title={copied ? "Copied!" : "Copy raw content"}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />{" "}
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                  <button
                    title="Download .md"
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button
                    title="Close Raw View"
                    onClick={() => setRawOpen(false)}
                    className="p-1.5 ml-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <pre className="p-3 font-mono text-xs leading-relaxed break-words whitespace-pre-wrap text-gray-600 dark:text-gray-400 sm:p-4 md:p-6 sm:text-sm">
                  {content || "No content loaded."}
                </pre>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Toolbar;
