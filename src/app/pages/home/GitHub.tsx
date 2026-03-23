"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitCommitHorizontal,
  Github,
  Star,
  GitBranch,
  Clock,
  ArrowUpRight,
  RefreshCw,
  ChevronRight,
  Flame,
  Code2,
  Activity,
} from "lucide-react";

const USERNAME = "gyanaprakashkhandual";

// ── Types ────────────────────────────────────────────────────────
interface ContribDay {
  date: string;
  contributionCount: number;
}
interface ContribWeek {
  contributionDays: ContribDay[];
}
interface CommitNode {
  message: string;
  committedDate: string;
  repository: {
    name: string;
    url: string;
  };
  url: string;
}

// ── Helpers ──────────────────────────────────────────────────────
const CELL_COLORS_LIGHT = [
  "bg-black/5 border-black/5",
  "bg-emerald-200 border-emerald-200",
  "bg-emerald-400 border-emerald-400",
  "bg-emerald-500 border-emerald-500",
  "bg-emerald-600 border-emerald-600",
];
const CELL_COLORS_DARK = [
  "dark:bg-white/5 dark:border-white/5",
  "dark:bg-emerald-900 dark:border-emerald-900",
  "dark:bg-emerald-700 dark:border-emerald-700",
  "dark:bg-emerald-500 dark:border-emerald-500",
  "dark:bg-emerald-400 dark:border-emerald-400",
];

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

// ── Month labels from weeks ───────────────────────────────────────
function getMonthLabels(weeks: ContribWeek[]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const d = new Date(week.contributionDays[0]?.date ?? "");
    const m = d.getMonth();
    if (m !== lastMonth) {
      labels.push({
        label: d.toLocaleString("default", { month: "short" }),
        col: i,
      });
      lastMonth = m;
    }
  });
  return labels;
}

// ── Main Component ───────────────────────────────────────────────
export default function GitHubSection() {
  const [weeks, setWeeks] = useState<ContribWeek[]>([]);
  const [totalContribs, setTotalContribs] = useState(0);
  const [commits, setCommits] = useState<CommitNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState<{ day: ContribDay; x: number; y: number } | null>(null);
  const [streak, setStreak] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? "";

  async function fetchData() {
    setRefreshing(true);
    setError("");
    try {
      const query = `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays { date contributionCount }
                }
              }
            }
            repositoriesContributedTo(first: 10, includeUserRepositories: true, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(first: 3) {
                        nodes {
                          message
                          committedDate
                          url
                          repository { name url }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        body: JSON.stringify({ query, variables: { login: USERNAME } }),
      });

      // Fallback: use unofficial contributions API if no token
      if (!TOKEN || !res.ok) {
        const r2 = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`);
        if (!r2.ok) throw new Error("Failed to fetch contributions");
        const d2 = await r2.json();
        // Map to weeks format
        const mapped: ContribWeek[] = [];
        let wk: ContribDay[] = [];
        d2.contributions.forEach((c: { date: string; count: number; level: number }, i: number) => {
          wk.push({ date: c.date, contributionCount: c.count });
          if (wk.length === 7 || i === d2.contributions.length - 1) {
            mapped.push({ contributionDays: wk });
            wk = [];
          }
        });
        setWeeks(mapped);
        setTotalContribs(d2.total[new Date().getFullYear()]);

        // Fetch recent events for commits (no token needed)
        const evRes = await fetch(
          `https://api.github.com/users/${USERNAME}/events/public?per_page=30`
        );
        if (evRes.ok) {
          const events = await evRes.json();
          const pushEvents = events.filter((e: any) => e.type === "PushEvent");
          const recent: CommitNode[] = [];
          for (const ev of pushEvents) {
            for (const c of ev.payload.commits ?? []) {
              recent.push({
                message: c.message,
                committedDate: ev.created_at,
                repository: { name: ev.repo.name.split("/")[1], url: `https://github.com/${ev.repo.name}` },
                url: `https://github.com/${ev.repo.name}/commit/${c.sha}`,
              });
              if (recent.length >= 8) break;
            }
            if (recent.length >= 8) break;
          }
          setCommits(recent);
        }
        // calc streak
        calcStreak(mapped);
        return;
      }

      const json = await res.json();
      const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
      setWeeks(cal.weeks);
      setTotalContribs(cal.totalContributions);

      // flatten commits
      const repoNodes = json.data?.user?.repositoriesContributedTo?.nodes ?? [];
      const flat: CommitNode[] = [];
      for (const rn of repoNodes) {
        const hist = rn?.defaultBranchRef?.target?.history?.nodes ?? [];
        for (const cm of hist) {
          flat.push({ ...cm, repository: cm.repository });
          if (flat.length >= 8) break;
        }
        if (flat.length >= 8) break;
      }
      flat.sort((a, b) => new Date(b.committedDate).getTime() - new Date(a.committedDate).getTime());
      setCommits(flat.slice(0, 8));
      calcStreak(cal.weeks);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function calcStreak(wks: ContribWeek[]) {
    const allDays = wks.flatMap((w) => w.contributionDays).reverse();
    let s = 0;
    for (const d of allDays) {
      if (d.contributionCount > 0) s++;
      else break;
    }
    setStreak(s);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const monthLabels = getMonthLabels(weeks);

  return (
    <section className="relative w-full bg-white dark:bg-black border-b border-black/10 dark:border-white/10 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute left-0 top-0 w-64 h-full bg-[linear-gradient(to_right,rgba(16,185,129,0.06),transparent)] pointer-events-none" />
      <div className="absolute right-0 top-0 w-48 h-full bg-[linear-gradient(to_left,rgba(16,185,129,0.04),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-black/70 dark:text-white/70" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-black">
                <motion.span
                  animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-emerald-500"
                />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3 text-black/50 dark:text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  GitHub Activity
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/8 text-black/60 dark:text-white/60">
                  @{USERNAME}
                </span>
              </div>
              <p className="text-sm sm:text-base font-black tracking-tight text-black dark:text-white leading-tight">
                Contributions & Recent Commits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Stats pills */}
            {[
              { icon: Activity, label: `${totalContribs.toLocaleString()} this year` },
              { icon: Flame, label: `${streak}d streak` },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1.5 rounded-lg bg-black/4 dark:bg-white/6 border border-black/8 dark:border-white/8 text-black/60 dark:text-white/60"
              >
                <Icon className="w-3 h-3" />
                {label}
              </span>
            ))}

            {/* Refresh */}
            <motion.button
              onClick={fetchData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={refreshing}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-40"
            >
              <motion.div animate={refreshing ? { rotate: 360 } : {}} transition={{ duration: 0.8, repeat: refreshing ? Infinity : 0, ease: "linear" }}>
                <RefreshCw className="w-3.5 h-3.5" />
              </motion.div>
            </motion.button>

            <motion.a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group hidden sm:flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              View Profile
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* ── Error ──────────────────────────────────── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-500/80 bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-3"
            >
              {error} — showing cached/demo data if available.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Contribution Graph ─────────────────────── */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-black/1.5 dark:bg-white/1.5 p-4 sm:p-6 overflow-hidden relative">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-black/40 dark:text-white/40" />
            <span className="text-xs font-semibold text-black/50 dark:text-white/50 tracking-wide uppercase">
              Contribution Graph — Past Year
            </span>
          </div>

          {loading ? (
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 53 * 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[10px] h-[10px] rounded-sm bg-black/5 dark:bg-white/5 animate-pulse"
                  style={{ animationDelay: `${(i % 20) * 0.03}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="relative overflow-x-auto pb-1">
              {/* Month labels */}
              <div className="relative mb-1" style={{ height: "16px" }}>
                <div className="flex gap-[3px]">
                  {weeks.map((_, wi) => {
                    const lbl = monthLabels.find((m) => m.col === wi);
                    return (
                      <div key={wi} className="shrink-0" style={{ width: "10px" }}>
                        {lbl && (
                          <span className="text-[8px] font-medium text-black/30 dark:text-white/30 whitespace-nowrap">
                            {lbl.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grid */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px] shrink-0">
                    {week.contributionDays.map((day, di) => {
                      const lvl = getLevel(day.contributionCount);
                      const lightCls = CELL_COLORS_LIGHT[lvl];
                      const darkCls = CELL_COLORS_DARK[lvl];
                      return (
                        <motion.div
                          key={di}
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: (wi * 7 + di) * 0.0004,
                            duration: 0.2,
                            ease: "easeOut",
                          }}
                          className={`w-[10px] h-[10px] rounded-sm border cursor-pointer ${lightCls} ${darkCls} hover:ring-1 hover:ring-emerald-500/60 transition-shadow`}
                          onMouseEnter={(e) => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect();
                            setHovered({ day, x: rect.left, y: rect.top });
                          }}
                          onMouseLeave={() => setHovered(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-1.5 mt-3 justify-end">
                <span className="text-[9px] text-black/30 dark:text-white/30 font-medium">Less</span>
                {CELL_COLORS_LIGHT.map((c, i) => (
                  <div key={i} className={`w-[10px] h-[10px] rounded-sm border ${c} ${CELL_COLORS_DARK[i]}`} />
                ))}
                <span className="text-[9px] text-black/30 dark:text-white/30 font-medium">More</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Recent Commits ─────────────────────────── */}
        <div className="rounded-2xl border border-black/8 dark:border-white/8 bg-black/1.5 dark:bg-white/1.5 overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-black/6 dark:border-white/6">
            <div className="flex items-center gap-2">
              <GitCommitHorizontal className="w-4 h-4 text-black/40 dark:text-white/40" />
              <span className="text-xs font-semibold text-black/50 dark:text-white/50 tracking-wide uppercase">
                Recent Commits
              </span>
            </div>
            <motion.a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
              whileHover={{ x: 2 }}
            >
              All Activity
              <ChevronRight className="w-3 h-3" />
            </motion.a>
          </div>

          {loading ? (
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-4 sm:px-6 py-4 flex items-start gap-3 animate-pulse">
                  <div className="w-6 h-6 rounded-md bg-black/5 dark:bg-white/5 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-black/5 dark:bg-white/5 rounded w-3/4" />
                    <div className="h-2.5 bg-black/5 dark:bg-white/5 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : commits.length === 0 ? (
            <p className="text-xs text-black/40 dark:text-white/40 px-6 py-8 text-center">
              No recent commits found.
            </p>
          ) : (
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {commits.map((cm, i) => (
                <motion.a
                  key={i}
                  href={cm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.018)" }}
                  className="group flex items-start gap-3 px-4 sm:px-6 py-4 transition-colors"
                >
                  {/* Icon */}
                  <div className="shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/8 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-colors">
                    <GitCommitHorizontal className="w-3.5 h-3.5 text-black/40 dark:text-white/40 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {truncate(cm.message.split("\n")[0], 80)}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-black/45 dark:text-white/45 bg-black/4 dark:bg-white/5 border border-black/6 dark:border-white/6 rounded-md px-2 py-0.5">
                        <GitBranch className="w-2.5 h-2.5" />
                        {cm.repository.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-black/35 dark:text-white/35">
                        <Clock className="w-2.5 h-2.5" />
                        {timeAgo(cm.committedDate)}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight className="shrink-0 w-3.5 h-3.5 text-black/20 dark:text-white/20 group-hover:text-black/60 dark:group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom chips ──────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { icon: Activity, text: "Live contribution data" },
            { icon: GitCommitHorizontal, text: "All repos included" },
            { icon: Star, text: "Public activity" },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="shrink-0 inline-flex items-center gap-1.5 text-[10px] text-black/40 dark:text-white/40 font-medium"
            >
              <Icon className="w-3 h-3" />
              {text}
              <span className="text-black/20 dark:text-white/20 last:hidden">·</span>
            </span>
          ))}
          <motion.a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 flex items-center gap-1 text-[10px] font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            whileHover={{ x: 2 }}
          >
            Open GitHub
            <ChevronRight className="w-3 h-3" />
          </motion.a>
        </div>
      </div>

      {/* ── Tooltip ──────────────────────────────────── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none"
            style={{ left: hovered.x + 14, top: hovered.y - 40 }}
          >
            <div className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              {hovered.day.contributionCount} contribution{hovered.day.contributionCount !== 1 ? "s" : ""}
              <span className="font-normal opacity-70 ml-1">on {hovered.day.date}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}