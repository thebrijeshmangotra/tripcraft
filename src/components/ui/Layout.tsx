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
        {/*<NavigationMenu className="container mx-auto w-auto flex justify-between gap-2 h-fit">
          <NavigationMenuList>
          </NavigationMenuList>
          <NavigationMenuList>
          </NavigationMenuList>
        </NavigationMenu>*/}
        <Outlet />
      </main>
    </SidebarProvider>
  </div>
);

export default Layout;
