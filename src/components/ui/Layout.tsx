import { Suspense } from "react";
import { SidebarProvider, SidebarTrigger } from "./Sidebar";
import { AppSidebar } from "./Sidebar/AppSidebar";
import { Outlet } from "react-router";
import { ThemeToggler } from "./ThemeToggler";

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 space-y-2 p-2">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <ThemeToggler />
        </div>
        <Suspense fallback={<div className="flex items-center justify-center min-h-96">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </SidebarProvider>
  </div>
);

export default Layout;
