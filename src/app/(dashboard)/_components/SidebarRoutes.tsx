'use client';
import React from 'react';
import { BarChart, Compass, Layout, List } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';

const guestRoutes = [
  {
    icon: Layout,
    href: '/',
    label: 'Dashboard',
  },
  {
    icon: Compass,
    href: '/search',
    label: 'Browse',
  }
]

const teacherRoutes = [
  {
    icon: List,
    href: '/teacher/courses',
    label: 'Courses',
  },
  {
    icon: BarChart,
    href: '/teacher/analytics',
    label: 'Analytics',
  }
]

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher');
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className='flex flex-col w-full'>
      {
        routes.map(route =>
        (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            href={route.href}
            label={route.label}
          />
        )
        )
      }
    </div>
  );
}

export default SidebarRoutes;
