"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import {
  CreditCard,
  Database,
  Key,
  LayoutDashboard,
  Loader2,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { APP_URL } from "@/lib/config";

export function AppSidebar() {
  const [isLoadingPortal, setLoadingPortal] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`/${path}`);
  };

  const handlePortal = async () => {
    setLoadingPortal(true);
    const res = await fetch(`${APP_URL}/auth/subscriptions/portal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      setLoadingPortal(false);
      toast.error("Something went wrong, try again");
      return;
    }

    const data = await res.json();

    redirect(data.session_url);
  };

  return (
    <Sidebar variant="sidebar" className="border-r border-gray-800">
      <SidebarHeader className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <div>
              <span className="sr-only">Pragma</span>
              <Image
                height={40}
                width={150}
                className="h-6 w-auto sm:h-8 md:h-6 lg:h-8"
                src="/pragma-logo.png"
                alt="Logo"
              />
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/feeds")}>
              <Link href="/dashboard/feeds">
                <Database className="h-4 w-4" />
                <span>Feeds</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/dashboard/api-keys")}
            >
              <Link href="/dashboard/api-keys">
                <Key className="h-4 w-4" />
                <span>API Keys</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              disabled={isLoadingPortal}
              onClick={handlePortal}
            >
              {isLoadingPortal ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
              <span>Billing</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-800 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarTrigger className="absolute -right-8 top-4 z-20 text-white" />
    </Sidebar>
  );
}
