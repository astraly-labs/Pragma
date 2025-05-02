import { AppSidebar } from "./_components//app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="min-w-full">
          <div className="p-14">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
