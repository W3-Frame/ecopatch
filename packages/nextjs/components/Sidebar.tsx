"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartBarIcon, DocumentChartBarIcon, FolderIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import { useUserRole } from "~~/hooks/useUserRole";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// User navigation links
const userNavigation: SidebarLink[] = [
  { name: "Dashboard", href: "/dashboard", icon: <ChartBarIcon className="h-5 w-5" /> },
  { name: "My Portfolio", href: "/portfolio", icon: <FolderIcon className="h-5 w-5" /> },
  { name: "My Profile", href: "/profile", icon: <UserIcon className="h-5 w-5" /> },
];

// Admin navigation links
const adminNavigation: SidebarLink[] = [
  { name: "Dashboard", href: "/dashboard", icon: <ChartBarIcon className="h-5 w-5" /> },
  { name: "All Patches", href: "/portfolio", icon: <FolderIcon className="h-5 w-5" /> },
  { name: "My Profile", href: "/profile", icon: <UserIcon className="h-5 w-5" /> },
];

// User actions
const userActions: SidebarLink[] = [{ name: "New Project", href: "/admin", icon: <PlusIcon className="h-5 w-5" /> }];

// Admin actions
const adminActions: SidebarLink[] = [
  { name: "New Project", href: "/admin", icon: <PlusIcon className="h-5 w-5" /> },
  { name: "Publish Report", href: "/reports", icon: <DocumentChartBarIcon className="h-5 w-5" /> },
  { name: "Distribute Profit", href: "/distribute", icon: <GlobeEuropeAfricaIcon className="h-5 w-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isAdmin } = useUserRole();

  // Choose navigation and actions based on user role
  const navigation = isAdmin ? adminNavigation : userNavigation;
  const actions = isAdmin ? adminActions : userActions;

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 relative">
            <Image src="/Logo_2.png" alt="EcoPatch Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-gray-900">ECOPATCH</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-4 py-6">
        <div className="space-y-1">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h3>
          {navigation.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <span className={`mr-3 ${isActive ? "text-emerald-600" : "text-gray-400"}`}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Actions section - only show if there are actions */}
        {actions.length > 0 && (
          <div className="mt-8 space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {isAdmin ? "Actions" : "Action"}
            </h3>
            {actions.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span className={`mr-3 ${isActive ? "text-emerald-600" : "text-gray-400"}`}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </div>
  );
}
