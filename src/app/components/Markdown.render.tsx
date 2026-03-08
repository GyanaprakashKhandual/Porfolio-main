/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Hash,
  Terminal,
} from "lucide-react";
import {
  FiTerminal,
  FiDatabase,
  FiCpu,
  FiFileText,
  FiGlobe,
} from "react-icons/fi";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiRust,
  SiGo,
  SiBabel,
  SiCsdn,
} from "react-icons/si";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeBlockProps {
  code: string;
  language: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getLangIcon(lang: string) {
  const map: Record<string, React.ReactNode> = {
    javascript: <SiJavascript className="text-yellow-400" size={14} />,
    js: <SiJavascript className="text-yellow-400" size={14} />,
    typescript: <SiTypescript className="text-blue-400" size={14} />,
    ts: <SiTypescript className="text-blue-400" size={14} />,
    tsx: <SiTypescript className="text-blue-400" size={14} />,
    jsx: <SiJavascript className="text-yellow-400" size={14} />,
    python: <SiPython className="text-blue-300" size={14} />,
    py: <SiPython className="text-blue-300" size={14} />,
    rust: <SiRust className="text-orange-400" size={14} />,
    go: <SiGo className="text-cyan-400" size={14} />,
    css: <SiCsdn className="text-blue-500" size={14} />,
    bash: <SiBabel className="text-green-400" size={14} />,
    sh: <Terminal className="text-green-400" size={14} />,
    shell: <Terminal className="text-green-400" size={14} />,
    sql: <FiDatabase className="text-purple-400" size={14} />,
    json: <FiFileText className="text-orange-300" size={14} />,
    html: <FiGlobe className="text-red-400" size={14} />,
    xml: <FiGlobe className="text-red-400" size={14} />,
    cpp: <FiCpu className="text-blue-300" size={14} />,
    c: <FiCpu className="text-blue-300" size={14} />,
    default: <FiTerminal className="text-notion-gray" size={14} />,
  };
  return map[lang.toLowerCase()] || map.default;
}

// ─── Syntax Highlighter ───────────────────────────────────────────────────────

function syntaxHighlight(code: string, lang: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const escaped = escape(code);

  if (["javascript", "js", "typescript", "ts", "tsx", "jsx"].includes(lang)) {
    return escaped
      .replace(
        /\b(const|let|var|function|class|return|if|else|for|while|do|switch|case|break|continue|import|export|default|from|async|await|try|catch|finally|new|delete|typeof|instanceof|void|in|of|throw|extends|implements|interface|type|enum|namespace|declare|abstract|public|private|protected|static|readonly|override)\b/g,
        '<span style="color:#cf9cff">$1</span>',
      )
      .replace(
        /\b(true|false|null|undefined|NaN|Infinity)\b/g,
        '<span style="color:#f8965d">$1</span>',
      )
      .replace(
        /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
        '<span style="color:#a3e4a1">$1</span>',
      )
      .replace(
        /\/\/[^\n]*/g,
        '<span style="color:#8b8b8b;font-style:italic">$&</span>',
      )
      .replace(
        /\/\*[\s\S]*?\*\//g,
        '<span style="color:#8b8b8b;font-style:italic">$&</span>',
      )
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#f8965d">$1</span>');
  }

  if (["python", "py"].includes(lang)) {
    return escaped
      .replace(
        /\b(def|class|return|if|elif|else|for|while|import|from|as|pass|break|continue|try|except|finally|with|lambda|yield|global|nonlocal|del|assert|raise|not|and|or|in|is|None|True|False)\b/g,
        '<span style="color:#cf9cff">$1</span>',
      )
      .replace(
        /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|"""[\s\S]*?"""|\'\'\'[\s\S]*?\'\'\')/g,
        '<span style="color:#a3e4a1">$1</span>',
      )
      .replace(
        /#[^\n]*/g,
        '<span style="color:#8b8b8b;font-style:italic">$&</span>',
      )
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#f8965d">$1</span>')
      .replace(
        /@[\w.]+/g,
        '<span style="color:#ffd700;font-style:italic">$&</span>',
      );
  }

  if (["css", "scss"].includes(lang)) {
    return escaped
      .replace(
        /([.#][\w-]+|[a-zA-Z][\w-]*(?=\s*\{))/g,
        '<span style="color:#f8965d">$1</span>',
      )
      .replace(/([\w-]+)(?=\s*:)/g, '<span style="color:#cf9cff">$1</span>')
      .replace(/:\s*([^;{]+)/g, ': <span style="color:#a3e4a1">$1</span>')
      .replace(
        /\/\*[\s\S]*?\*\//g,
        '<span style="color:#8b8b8b;font-style:italic">$&</span>',
      );
  }

  if (["bash", "sh", "shell"].includes(lang)) {
    return escaped
      .replace(
        /\b(echo|cd|ls|mkdir|rm|cp|mv|cat|grep|sed|awk|find|chmod|chown|sudo|apt|npm|yarn|git|docker|curl|wget|export|source|set|unset|if|then|else|fi|for|do|done|while|function)\b/g,
        '<span style="color:#cf9cff">$1</span>',
      )
      .replace(
        /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
        '<span style="color:#a3e4a1">$1</span>',
      )
      .replace(
        /#[^\n]*/g,
        '<span style="color:#8b8b8b;font-style:italic">$&</span>',
      )
      .replace(/\$[\w{][^}\s]*/g, '<span style="color:#f8965d">$&</span>');
  }

  if (["sql"].includes(lang)) {
    return escaped
      .replace(
        /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|VIEW|FUNCTION|PROCEDURE|AS|AND|OR|NOT|IN|LIKE|BETWEEN|IS|NULL|DISTINCT|COUNT|SUM|AVG|MAX|MIN|COALESCE|CASE|WHEN|THEN|ELSE|END|WITH|UNION|ALL)\b/gi,
        '<span style="color:#cf9cff">$1</span>',
      )
      .replace(
        /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
        '<span style="color:#a3e4a1">$1</span>',
      )
      .replace(
        /--[^\n]*/g,
        '<span style="color:#8b8b8b;font-style:italic">$&</span>',
      )
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#f8965d">$1</span>');
  }

  if (["json"].includes(lang)) {
    return escaped
      .replace(
        /"([\w\s-]+)"(?=\s*:)/g,
        '"<span style="color:#cf9cff">$1</span>"',
      )
      .replace(
        /:\s*("(?:[^"\\]|\\.)*")/g,
        ': <span style="color:#a3e4a1">$1</span>',
      )
      .replace(
        /\b(true|false|null)\b/g,
        '<span style="color:#f8965d">$1</span>',
      )
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#69b3ff">$1</span>');
  }

  return escaped;
}

// ─── Code Block Component ─────────────────────────────────────────────────────

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lang = language.toLowerCase().trim();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const lines = code.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group my-4 rounded-lg overflow-hidden border border-[#e3e2e0] bg-[#1e1e2e] shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2d2d3f] bg-[#181825]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            {getLangIcon(lang)}
            <span className="text-xs font-medium text-[#6c7086] font-mono tracking-wide uppercase">
              {lang || "plain text"}
            </span>
          </div>
        </div>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs
                     text-[#6c7086] hover:text-[#cdd6f4] hover:bg-[#2d2d3f]
                     transition-all duration-150 font-medium"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 text-green-400"
              >
                <Check size={12} />
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1"
              >
                <Copy size={12} />
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-[#2d2d3f]/40 transition-colors">
                <td className="select-none text-right text-[#3d3d52] text-xs px-3 py-0 font-mono w-10 min-w-10 border-r border-[#2d2d3f]">
                  {i + 1}
                </td>
                <td className="px-4 py-0 font-mono text-[13px] leading-6 text-[#cdd6f4] whitespace-pre">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: syntaxHighlight(
                        line
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;"),
                        lang,
                      ),
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── Inline Renderer ──────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns: [RegExp, (match: RegExpMatchArray) => React.ReactNode][] = [
    // Inline code
    [
      /`([^`]+)`/,
      (m) => (
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded-md text-[0.85em] font-mono
                     bg-[#f1f0ef] text-[#eb5757] border border-[#e3e2e0]"
        >
          {m[1]}
        </code>
      ),
    ],
    // Bold italic
    [
      /\*\*\*(.+?)\*\*\*/,
      (m) => (
        <strong key={key++}>
          <em>{renderInline(m[1])}</em>
        </strong>
      ),
    ],
    // Bold
    [
      /\*\*(.+?)\*\*/,
      (m) => (
        <strong key={key++} className="font-semibold text-[#37352f]">
          {renderInline(m[1])}
        </strong>
      ),
    ],
    // Italic
    [
      /\*(.+?)\*/,
      (m) => (
        <em key={key++} className="italic">
          {renderInline(m[1])}
        </em>
      ),
    ],
    // Bold italic underscore
    [
      /___(.+?)___/,
      (m) => (
        <strong key={key++}>
          <em>{renderInline(m[1])}</em>
        </strong>
      ),
    ],
    // Bold underscore
    [
      /__(.+?)__/,
      (m) => (
        <strong key={key++} className="font-semibold">
          {renderInline(m[1])}
        </strong>
      ),
    ],
    // Italic underscore
    [/_(.+?)_/, (m) => <em key={key++}>{renderInline(m[1])}</em>],
    // Strikethrough
    [
      /~~(.+?)~~/,
      (m) => (
        <del key={key++} className="line-through text-[#9b9a97]">
          {renderInline(m[1])}
        </del>
      ),
    ],
    // Highlight ==text==
    [
      /==(.+?)==/,
      (m) => (
        <mark
          key={key++}
          className="bg-[#fef9c3] text-[#37352f] px-0.5 rounded-sm"
        >
          {m[1]}
        </mark>
      ),
    ],
    // Superscript
    [
      /\^(.+?)\^/,
      (m) => (
        <sup key={key++} className="text-xs">
          {m[1]}
        </sup>
      ),
    ],
    // Subscript
    [
      /~(.+?)~/,
      (m) => (
        <sub key={key++} className="text-xs">
          {m[1]}
        </sub>
      ),
    ],
    // Keyboard
    [
      /<kbd>(.+?)<\/kbd>/,
      (m) => (
        <kbd
          key={key++}
          className="px-1.5 py-0.5 text-xs font-mono rounded-md
                     bg-[#f7f6f3] border border-[#d0cec8] border-b-2
                     text-[#37352f] shadow-sm"
        >
          {m[1]}
        </kbd>
      ),
    ],
    // Image ![alt](src)
    [
      /!\[([^\]]*)\]\(([^)]+)\)/,
      (m) => (
        <span key={key++} className="block my-4">
          <img
            src={m[2]}
            alt={m[1]}
            className="max-w-full rounded-lg border border-[#e3e2e0] shadow-sm"
          />
          {m[1] && (
            <span className="block text-center text-xs text-[#9b9a97] mt-2 italic">
              {m[1]}
            </span>
          )}
        </span>
      ),
    ],
    // Link with title [text](url "title")
    [
      /\[([^\]]+)\]\(([^)"]+)(?:\s+"([^"]*)")?\)/,
      (m) => (
        <a
          key={key++}
          href={m[2]}
          title={m[3]}
          target={m[2].startsWith("http") ? "_blank" : undefined}
          rel={m[2].startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-[#2383e2] hover:underline underline-offset-2
                     inline-flex items-center gap-0.5 group/link"
        >
          {m[1]}
          {m[2].startsWith("http") && (
            <ExternalLink
              size={11}
              className="opacity-0 group-hover/link:opacity-60 transition-opacity"
            />
          )}
        </a>
      ),
    ],
    // Reference-style link placeholder [text][ref] - rendered as plain text
    [
      /\[([^\]]+)\]\[([^\]]*)\]/,
      (m) => (
        <span
          key={key++}
          className="text-[#2383e2] hover:underline cursor-pointer"
        >
          {m[1]}
        </span>
      ),
    ],
    // Footnote reference [^1]
    [
      /\[\^(\w+)\]/,
      (m) => (
        <sup key={key++}>
          <a
            href={`#fn-${m[1]}`}
            className="text-[#2383e2] hover:underline text-xs"
          >
            [{m[1]}]
          </a>
        </sup>
      ),
    ],
    // Auto-link URL
    [
      /(?<!\[)(https?:\/\/[^\s<>"]+)/,
      (m) => (
        <a
          key={key++}
          href={m[1]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2383e2] hover:underline underline-offset-2
                     inline-flex items-center gap-0.5"
        >
          {m[1]}
          <ExternalLink size={11} className="opacity-60" />
        </a>
      ),
    ],
    // HTML entities
    [
      /&(amp|lt|gt|quot|copy|reg|trade|mdash|ndash|hellip|nbsp);/,
      (m) => {
        const entities: Record<string, string> = {
          amp: "&",
          lt: "<",
          gt: ">",
          quot: '"',
          copy: "©",
          reg: "®",
          trade: "™",
          mdash: "—",
          ndash: "–",
          hellip: "…",
          nbsp: "\u00A0",
        };
        return <span key={key++}>{entities[m[1]] || m[0]}</span>;
      },
    ],
  ];

  while (remaining.length > 0) {
    let earliest: {
      index: number;
      match: RegExpMatchArray;
      node: React.ReactNode;
    } | null = null;

    for (const [pattern, render] of patterns) {
      const match = remaining.match(pattern);
      if (match && match.index !== undefined) {
        if (!earliest || match.index < earliest.index) {
          earliest = { index: match.index, match, node: render(match) };
        }
      }
    }

    if (!earliest) {
      result.push(remaining);
      break;
    }

    if (earliest.index > 0) {
      result.push(remaining.slice(0, earliest.index));
    }
    result.push(earliest.node);
    remaining = remaining.slice(earliest.index + earliest.match[0].length);
  }

  return result;
}

// ─── Block Parser ─────────────────────────────────────────────────────────────

function parseMarkdown(markdown: string): React.ReactNode[] {
  const lines = markdown.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let nodeKey = 0;
  const nk = () => nodeKey++;

  // Collect footnotes
  const footnotes: Record<string, string> = {};
  const referenceLinks: Record<string, { href: string; title?: string }> = {};

  for (const line of lines) {
    const fn = line.match(/^\[\^(\w+)\]:\s*(.+)/);
    if (fn) footnotes[fn[1]] = fn[2];
    const rl = line.match(/^\[(\w+)\]:\s*(\S+)(?:\s+"([^"]*)")?/);
    if (rl) referenceLinks[rl[1]] = { href: rl[2], title: rl[3] };
  }

  while (i < lines.length) {
    const line = lines[i];

    // Skip footnote/reference definitions
    if (/^\[\^[\w]+\]:/.test(line) || /^\[[\w]+\]:/.test(line)) {
      i++;
      continue;
    }

    // Skip abbreviation definitions
    if (/^\*\[.+\]:/.test(line)) {
      i++;
      continue;
    }

    // HTML details/summary
    if (line.trim().startsWith("<details>")) {
      const contentLines: string[] = [];
      let summaryText = "";
      i++;
      if (lines[i]?.trim().startsWith("<summary>")) {
        summaryText = lines[i].replace(/<\/?summary>/g, "").trim();
        i++;
      }
      while (i < lines.length && !lines[i].trim().startsWith("</details>")) {
        contentLines.push(lines[i]);
        i++;
      }
      i++; // skip </details>

      nodes.push(
        <DetailsBlock
          key={nk()}
          summary={summaryText}
          content={contentLines.join("\n")}
        />,
      );
      continue;
    }

    // Fenced code block
    const fenceMatch = line.match(/^(`{3,}|~{3,})([\w-]*)/);
    if (fenceMatch) {
      const fence = fenceMatch[1];
      const lang = fenceMatch[2] || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(fence)) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      nodes.push(
        <CodeBlock key={nk()} code={codeLines.join("\n")} language={lang} />,
      );
      continue;
    }

    // Horizontal rule
    if (/^(\s*[-*_]){3,}\s*$/.test(line)) {
      nodes.push(
        <hr key={nk()} className="my-6 border-none h-px bg-[#e3e2e0]" />,
      );
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = slugify(text.replace(/[*_`]/g, ""));
      nodes.push(<HeadingBlock key={nk()} level={level} text={text} id={id} />);
      i++;
      continue;
    }

    // Setext headings (===== or -----)
    if (i + 1 < lines.length) {
      if (/^={3,}\s*$/.test(lines[i + 1]) && line.trim()) {
        const id = slugify(line.replace(/[*_`]/g, ""));
        nodes.push(<HeadingBlock key={nk()} level={1} text={line} id={id} />);
        i += 2;
        continue;
      }
      if (
        /^-{3,}\s*$/.test(lines[i + 1]) &&
        line.trim() &&
        !/^\s*[-*+]/.test(line)
      ) {
        const id = slugify(line.replace(/[*_`]/g, ""));
        nodes.push(<HeadingBlock key={nk()} level={2} text={line} id={id} />);
        i += 2;
        continue;
      }
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith(">") || lines[i].trim() === "")
      ) {
        if (lines[i].startsWith(">")) quoteLines.push(lines[i]);
        else if (quoteLines.length > 0) quoteLines.push("");
        i++;
      }
      const content = quoteLines.map((l) => l.replace(/^>\s?/, "")).join("\n");
      nodes.push(<BlockquoteBlock key={nk()} content={content} />);
      continue;
    }

    // Table
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      /^\|?[\s:|-]+\|/.test(lines[i + 1])
    ) {
      const tableLines: string[] = [line];
      i++;
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      nodes.push(<TableBlock key={nk()} lines={tableLines} />);
      continue;
    }

    // Unordered list
    if (/^(\s*)[-*+]\s/.test(line)) {
      const listLines: string[] = [];
      while (
        i < lines.length &&
        (/^(\s*)[-*+]\s/.test(lines[i]) ||
          /^\s{2,}/.test(lines[i]) ||
          lines[i].trim() === "")
      ) {
        if (lines[i].trim() !== "" || listLines.length > 0) {
          listLines.push(lines[i]);
        }
        i++;
      }
      nodes.push(<ListBlock key={nk()} lines={listLines} ordered={false} />);
      continue;
    }

    // Ordered list
    if (/^(\s*)\d+\.\s/.test(line)) {
      const listLines: string[] = [];
      while (
        i < lines.length &&
        (/^\s*\d+\.\s/.test(lines[i]) ||
          /^\s{3,}/.test(lines[i]) ||
          lines[i].trim() === "")
      ) {
        if (lines[i].trim() !== "" || listLines.length > 0) {
          listLines.push(lines[i]);
        }
        i++;
      }
      nodes.push(<ListBlock key={nk()} lines={listLines} ordered={true} />);
      continue;
    }

    // Definition list
    if (i + 1 < lines.length && lines[i + 1].match(/^:\s+/)) {
      const term = line.trim();
      const defs: string[] = [];
      i++;
      while (i < lines.length && lines[i].match(/^:\s+/)) {
        defs.push(lines[i].replace(/^:\s+/, ""));
        i++;
      }
      nodes.push(
        <dl key={nk()} className="my-3">
          <dt className="font-semibold text-[#37352f]">{renderInline(term)}</dt>
          {defs.map((d, di) => (
            <dd key={di} className="ml-4 text-[#5f5e5b] before:content-['↳_']">
              {renderInline(d)}
            </dd>
          ))}
        </dl>,
      );
      continue;
    }

    // Empty line → paragraph break
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect until empty line or block element
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^#{1,6}\s/) &&
      !lines[i].match(/^(`{3,}|~{3,})/) &&
      !lines[i].startsWith(">") &&
      !/^(\s*[-*+]|\d+\.)\s/.test(lines[i]) &&
      !/^(\s*[-*_]){3,}\s*$/.test(lines[i]) &&
      !lines[i].includes("|") &&
      !lines[i].trim().startsWith("<details>") &&
      !lines[i].match(/^\[\^[\w]+\]:/) &&
      !lines[i].match(/^\[[\w]+\]:/) &&
      !lines[i].match(/^\*\[/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      const paraText = paraLines.join("\n").replace(/  \n/g, "\n");
      const segments = paraText.split(/\n/);
      nodes.push(
        <p key={nk()} className="my-2 leading-7 text-[#37352f]">
          {segments.map((seg, si) => (
            <React.Fragment key={si}>
              {renderInline(seg)}
              {si < segments.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>,
      );
    }
  }

  // Render footnotes section
  if (Object.keys(footnotes).length > 0) {
    nodes.push(
      <div key={nk()} className="mt-8 pt-4 border-t border-[#e3e2e0]">
        <p className="text-xs font-medium text-[#9b9a97] mb-2 uppercase tracking-wider">
          Footnotes
        </p>
        <ol className="text-sm text-[#5f5e5b] space-y-1 list-decimal list-inside">
          {Object.entries(footnotes).map(([ref, text]) => (
            <li key={ref} id={`fn-${ref}`} className="leading-6">
              {renderInline(text)}
            </li>
          ))}
        </ol>
      </div>,
    );
  }

  return nodes;
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

function HeadingBlock({
  level,
  text,
  id,
}: {
  level: number;
  text: string;
  id: string;
}) {
  const [hovered, setHovered] = useState(false);

  const sizeMap: Record<number, string> = {
    1: "text-3xl font-bold mt-8 mb-1 tracking-tight",
    2: "text-2xl font-semibold mt-6 mb-1 tracking-tight",
    3: "text-xl font-semibold mt-5 mb-1",
    4: "text-lg font-semibold mt-4 mb-1",
    5: "text-base font-semibold mt-3 mb-1",
    6: "text-sm font-semibold mt-3 mb-1 text-[#9b9a97]",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      id={id}
      className={`group relative flex items-center gap-2 text-[#37352f] ${sizeMap[level]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={`#${id}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -left-6 text-[#9b9a97] hover:text-[#37352f] transition-colors"
          >
            <Hash size={14} />
          </motion.a>
        )}
      </AnimatePresence>
      {renderInline(text)}
    </Tag>
  );
}

function BlockquoteBlock({ content }: { content: string }) {
  // Detect callout types by emoji prefix
  const firstLine = content.split("\n")[0];
  const calloutTypes: Record<
    string,
    { bg: string; border: string; icon?: string }
  > = {
    "💡": { bg: "bg-[#fef9c3]", border: "border-[#fde68a]" },
    "⚠️": { bg: "bg-[#fff7ed]", border: "border-[#fed7aa]" },
    "❌": { bg: "bg-[#fef2f2]", border: "border-[#fecaca]" },
    "✅": { bg: "bg-[#f0fdf4]", border: "border-[#bbf7d0]" },
    "📌": { bg: "bg-[#eff6ff]", border: "border-[#bfdbfe]" },
    "🔥": { bg: "bg-[#fff7ed]", border: "border-[#fdba74]" },
    ℹ️: { bg: "bg-[#eff6ff]", border: "border-[#bfdbfe]" },
  };

  let callout: { bg: string; border: string } | null = null;
  for (const [emoji, styles] of Object.entries(calloutTypes)) {
    if (firstLine.includes(emoji)) {
      callout = styles;
      break;
    }
  }

  if (callout) {
    return (
      <div
        className={`my-3 px-4 py-3 rounded-lg border ${callout.bg} ${callout.border} text-[#37352f]`}
      >
        {parseMarkdown(content)}
      </div>
    );
  }

  return (
    <blockquote className="my-3 pl-4 border-l-[3px] border-[#d0cec8] text-[#5f5e5b]">
      {parseMarkdown(content)}
    </blockquote>
  );
}

function TableBlock({ lines }: { lines: string[] }) {
  const parseRow = (line: string): string[] => {
    return line
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());
  };

  const parseAlignments = (
    line: string,
  ): ("left" | "center" | "right" | "none")[] => {
    return parseRow(line).map((cell) => {
      if (/^:-+:$/.test(cell)) return "center";
      if (/^-+:$/.test(cell)) return "right";
      if (/^:-+$/.test(cell)) return "left";
      return "none";
    });
  };

  if (lines.length < 2) return null;

  const headers = parseRow(lines[0]);
  const alignments = parseAlignments(lines[1]);
  const rows = lines.slice(2).map(parseRow);

  const alignClass = (a: string) => {
    if (a === "center") return "text-center";
    if (a === "right") return "text-right";
    return "text-left";
  };

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-[#e3e2e0]">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#f7f6f3]">
            {headers.map((h, hi) => (
              <th
                key={hi}
                className={`px-4 py-2.5 font-semibold text-[#37352f] border-b border-[#e3e2e0] ${alignClass(alignments[hi])}`}
              >
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-[#f1f0ef] ${ri % 2 === 0 ? "bg-white" : "bg-[#fafaf9]"} hover:bg-[#f7f6f3] transition-colors`}
            >
              {headers.map((_, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-2.5 text-[#5f5e5b] ${alignClass(alignments[ci])}`}
                >
                  {renderInline(row[ci] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListBlock({ lines, ordered }: { lines: string[]; ordered: boolean }) {
  interface ListItem {
    depth: number;
    text: string;
    checked: boolean | null;
    children: ListItem[];
  }

  const parseItems = (ls: string[]): ListItem[] => {
    const items: ListItem[] = [];
    const stack: ListItem[] = [];

    for (const line of ls) {
      if (line.trim() === "") continue;

      const unorderedMatch = line.match(/^(\s*)[-*+]\s+(\[[ xX]\]\s+)?(.*)$/);
      const orderedMatch = line.match(/^(\s*)\d+\.\s+(\[[ xX]\]\s+)?(.*)$/);
      const match = unorderedMatch || orderedMatch;

      if (!match) {
        // Continuation line
        if (stack.length > 0) {
          stack[stack.length - 1].text += " " + line.trim();
        }
        continue;
      }

      const depth = match[1].length;
      const checkStr = match[2];
      const text = match[3];
      const checked =
        checkStr != null
          ? checkStr.trim().toLowerCase() === "[x]" ||
            checkStr.trim().toLowerCase() === "[x] "
            ? true
            : false
          : null;

      const item: ListItem = { depth, text, checked, children: [] };

      while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
        stack.pop();
      }

      if (stack.length === 0) {
        items.push(item);
      } else {
        stack[stack.length - 1].children.push(item);
      }

      stack.push(item);
    }

    return items;
  };

  const renderItems = (
    items: ListItem[],
    ord: boolean,
    depth = 0,
  ): React.ReactNode => {
    const Tag = ord ? "ol" : "ul";
    return (
      <Tag
        className={`my-1 space-y-0.5 ${
          depth === 0 ? "my-3" : "mt-1 ml-5"
        } ${ord ? "list-decimal list-inside" : ""}`}
      >
        {items.map((item, idx) => {
          const isTask = item.checked !== null;
          return (
            <li
              key={idx}
              className={`flex items-start gap-2 leading-7 text-[#37352f] ${
                !ord && !isTask
                  ? "before:content-['•'] before:text-[#9b9a97] before:mt-0.5 before:shrink-0"
                  : ""
              }`}
            >
              {isTask && (
                <div
                  className={`mt-1.5 w-4 h-4 rounded shrink-0 flex items-center justify-center border-2 transition-colors ${
                    item.checked
                      ? "bg-[#2383e2] border-[#2383e2]"
                      : "border-[#c7c6c4] bg-white"
                  }`}
                >
                  {item.checked && (
                    <Check size={10} className="text-white" strokeWidth={3} />
                  )}
                </div>
              )}
              <div
                className={`flex-1 ${item.checked ? "line-through text-[#9b9a97]" : ""}`}
              >
                <span>{renderInline(item.text)}</span>
                {item.children.length > 0 &&
                  renderItems(item.children, ord, depth + 1)}
              </div>
            </li>
          );
        })}
      </Tag>
    );
  };

  const items = parseItems(lines);
  return <div>{renderItems(items, ordered)}</div>;
}

function DetailsBlock({
  summary,
  content,
}: {
  summary: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-3 border border-[#e3e2e0] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left
                   bg-[#f7f6f3] hover:bg-[#f1f0ef] transition-colors"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronRight size={14} className="text-[#9b9a97]" />
        </motion.span>
        <span className="text-sm font-medium text-[#37352f]">
          {renderInline(summary)}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 text-sm text-[#37352f]">
              {parseMarkdown(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Table of Contents ────────────────────────────────────────────────────────

function TableOfContents({ content }: { content: string }) {
  interface TocItem {
    level: number;
    text: string;
    id: string;
  }

  const items: TocItem[] = useMemo(() => {
    return content
      .split("\n")
      .filter((l) => /^#{1,6}\s/.test(l))
      .map((l) => {
        const m = l.match(/^(#{1,6})\s+(.+)/);
        if (!m) return null;
        const level = m[1].length;
        const text = m[2].replace(/[*_`]/g, "");
        const id = slugify(text);
        return { level, text, id };
      })
      .filter(Boolean) as TocItem[];
  }, [content]);

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-24 w-56 max-h-[70vh] overflow-y-auto">
      <p className="text-xs font-semibold text-[#9b9a97] uppercase tracking-widest mb-3 mt-6">
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-xs leading-5 transition-colors truncate
                ${item.level === 1 ? "" : item.level === 2 ? "pl-3" : item.level === 3 ? "pl-6" : "pl-9"}
                ${
                  activeId === item.id
                    ? "text-[#37352f] font-medium"
                    : "text-[#9b9a97] hover:text-[#5f5e5b]"
                }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Main Renderer ────────────────────────────────────────────────────────────

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const nodes = useMemo(() => parseMarkdown(content), [content]);

  return (
    <>
      <TableOfContents content={content} />
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`notion-md max-w-7xl mx-auto px-6 py-10 font-notion text-[#37352f] ${className}`}
        style={{
          fontFamily:
            '"Söhne", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        {nodes}
      </motion.article>
    </>
  );
}
