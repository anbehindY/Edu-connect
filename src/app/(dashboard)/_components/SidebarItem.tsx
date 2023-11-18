'use client';

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

const SidebarItem = (
  {
    icon: Icon,
    href,
    label,
  }: SidebarItemProps
) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        `flex items-center gap-x-2 text-slate-500 
      text-sm font-[500] pl-4 transition-all hover:text-slate-600 hover:bg-slate-300/20`
        , isActive && 'text-sky-700 bg-sky-200/20 hover:text-sky-700 hover:bg-sky-200/20')}
    >
      <div className="flex gap-x-2 py-4 items-center">
        <Icon
          size={22}
          className={cn
            (`text-slate-500`, isActive && 'text-sky-700')}
        />
        {label}
      </div>
      <div className={cn(
        `border-2 border-sky-700 opacity-0 ml-auto h-full transition-all`
        ,isActive && 'opacity-100'
      )}/>
    </button>
  );
}

export default SidebarItem;
