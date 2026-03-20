"use client";

import React from "react";
import {
  Menu,
  Copy,
  FileText,
  Download,
  PanelRight,
  Edit,
  Settings,
  MoreHorizontal,
  Sun,
  EyeOff,
} from "lucide-react";
import ActionMenu from "@/app/components/ui/Action.ui";
import { FaThemeco } from "react-icons/fa";
import { BiColor } from "react-icons/bi";

const Toolbar: React.FC = () => {
  return (
    <>
      {/* Main Toolbar Bar */}
      <div
        className={`
          w-full h-12 flex items-center
          bg-white
          border-b border-gray-200
          px-2 sm:px-4
          shrink-0
        `}
      >
        {/* Left side - menu button */}
        <div className="flex items-center w-8 shrink-0 sm:w-24">
          <button
            aria-label="Toggle sidebar"
            className="p-1.5 rounded text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-150"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center - tabs (static look) */}
        <div className="flex flex-1 items-center justify-center gap-0.5 sm:gap-1">
          {["Preview", "Code", "Blame"].map((label) => (
            <button
              key={label}
              className={`
                relative px-2 sm:px-4 py-2.5 text-xs sm:text-sm font-medium
                transition-colors duration-150 rounded-sm whitespace-nowrap
                ${
                  label === "Preview"
                    ? "text-black font-medium"
                    : "text-gray-600 hover:text-black"
                }
              `}
            >
              {label}
              {label === "Preview" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right side - action icons */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Desktop visible actions */}
          <div className="hidden md:flex items-center gap-0.5">
            {[
              { icon: Copy, label: "Copy" },
              { icon: FileText, label: "Raw" },
              { icon: Download, label: "Download" },
              { icon: PanelRight, label: "Panel" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="p-2 transition-colors duration-150 rounded text-gray-600 hover:text-black hover:bg-gray-100"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

           <ActionMenu>
            <ActionMenu.Anchor>
              <button
                aria-label="Settings"
                className="p-2 transition-colors duration-150 rounded text-gray-600 hover:text-black hover:bg-gray-100"
              >
                <Download className="w-4 h-4" />
              </button>
            </ActionMenu.Anchor>
            <ActionMenu.Overlay>
              <ActionMenu.List>
                <ActionMenu.Item leadingIcon={<FileText className="h-4 w-4" />}>
                  <span>Download as .PDF</span>
                </ActionMenu.Item>
                <ActionMenu.Item leadingIcon={<FileText className="h-4 w-4" />}>
                  <span>Download as .MD</span>
                </ActionMenu.Item>
                <ActionMenu.Item leadingIcon={<FileText className="h-4 w-4" />}>
                  <span>Download as .DOC</span>
                </ActionMenu.Item>
              </ActionMenu.List>
            </ActionMenu.Overlay>
          </ActionMenu>

          {/* Edit on GitHub */}
          <button
            aria-label="Edit On Github"
            className="p-2 transition-colors duration-150 rounded text-gray-600 hover:text-black hover:bg-gray-100"
          >
            <Edit className="w-4 h-4" />
          </button>

          {/* Theme toggle (just icon) */}
          <ActionMenu>
            <ActionMenu.Anchor>
              <button
                aria-label="Settings"
                className="p-2 transition-colors duration-150 rounded text-gray-600 hover:text-black hover:bg-gray-100"
              >
                <BiColor className="w-4 h-4" />
              </button>
            </ActionMenu.Anchor>
            <ActionMenu.Overlay>
              <ActionMenu.List>
                <ActionMenu.Item>
                  <span>Dark Theme</span>
                </ActionMenu.Item>
                <ActionMenu.Item>
                  <span>Light Theme</span>
                </ActionMenu.Item>
                <ActionMenu.Item>
                  <span>System Theme</span>
                </ActionMenu.Item>
              </ActionMenu.List>
            </ActionMenu.Overlay>
          </ActionMenu>

          {/* Settings */}
          <ActionMenu>
            <ActionMenu.Anchor>
              <button
                aria-label="Settings"
                className="p-2 transition-colors duration-150 rounded text-gray-600 hover:text-black hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
              </button>
            </ActionMenu.Anchor>
            <ActionMenu.Overlay>
              <ActionMenu.List>
                <ActionMenu.Item leadingIcon={<EyeOff className="h-4 w-4" />}>
                  <span>Hide Navbar</span>
                </ActionMenu.Item>
                <ActionMenu.Item leadingIcon={<EyeOff className="h-4 w-4" />}>
                  <span>Hide Toolbar</span>
                </ActionMenu.Item>
                <ActionMenu.Item leadingIcon={<EyeOff className="h-4 w-4" />}>
                  <span>Hide Header</span>
                </ActionMenu.Item>
                <ActionMenu.Item leadingIcon={<EyeOff className="h-4 w-4" />}>
                  <span>Hide Sidebar</span>
                </ActionMenu.Item>
              </ActionMenu.List>
            </ActionMenu.Overlay>
          </ActionMenu>
        </div>
      </div>

      {/* Fake selected tab underline indicator remains for Preview */}
      {/* (but no real tab content switching / panels below) */}
    </>
  );
};

export default Toolbar;
