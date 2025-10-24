import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/Sidebar";
import { Button } from "../Button";
import { HistoryIcon, LogOutIcon } from "@/components/IconComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Map, MessageCircle, UserIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { SidebarItem } from "@/types";
import { sideBarConstants } from "@/lib/constant";

export function AppSidebar() {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  console.log("path", path);
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2 border-b border-border">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                <Map />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Good Trip</h1>
                <p className="text-xs text-muted-foreground">
                  AI Travel Planner
                </p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-1">
          {sideBarConstants.map((item: SidebarItem) => (
            <SidebarMenuItem key={item.id}>
              <Button
                onClick={() => navigate(item.path)}
                variant={path === item.path ? "default" : "ghost"}
                className="w-full flex justify-start items-center gap-2"
              >
                {item.icon}
                <span>{item.title}</span>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-0">
        {/* User Section */}
        <div className="flex flex-col border-t border-border gap-2 itmes-center p-2">
          <div className="flex-1 w-full flex flex-col gap-2">
            <div className="flex items-center space-x-3 p-3 justify-start">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Brijesh</p>
                <p className="text-xs text-muted-foreground">Demo account</p>
              </div>
              <Button
                variant="outline"
                className="px-3 border border-red-700 bg-red-100 dark:bg-red-600/20 hover:bg-red-500 text-red-700 hover:text-white"
              >
                <LogOutIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button className="flex-1">
            <UserIcon className="w-4 h-4" />
            <span>Sign In</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
