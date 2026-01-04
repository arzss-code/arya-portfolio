import {
  Home,
  User,
  Award,
  FolderKanban,
  LayoutDashboard,

  Mail,
  Bot,
} from "lucide-react";

import { MenuItemProps } from "../types/menu";

const iconSize = 20;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home size={iconSize} strokeWidth={2} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Home",
  },
  {
    title: "About",
    href: "/about",
    icon: <User size={iconSize} strokeWidth={2} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: About",
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: <Award size={iconSize} strokeWidth={2} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Achievements",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <FolderKanban size={iconSize} strokeWidth={2} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Projects",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={iconSize} strokeWidth={2} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Dashboard",
  },

  {
    title: "Contact",
    href: "/contact",
    icon: <Mail size={iconSize} strokeWidth={2} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Contact",
  },
  {
    title: "Smart Talk",
    href: "/smart-talk",
    icon: <Bot size={iconSize} strokeWidth={2} />,
    isShow: false,
    isExternal: false,
    eventName: "Pages: Dashboard",
    isExclusive: true,
  },
];

