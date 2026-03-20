import reactjsSidebarItems from "./sidebarItems/react.sidebar.item";
import type { SidebarSection, SidebarChild } from "./sidebarItems/react.sidebar.item";
import seleniumSidebarItems from "./sidebarItems/selenium.sidebar.item";
import gitSidebarItems from "./sidebarItems/git.sidebar.item";

export type {
  SidebarSection,
  SidebarChild,
} from "./sidebarItems/react.sidebar.item";


const sidebarItems: Record<string, SidebarSection[]> = {
  reactjs: reactjsSidebarItems,
  selenium: seleniumSidebarItems,
  git: gitSidebarItems,
};

export default sidebarItems;
