
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Cpu, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/devices", label: "Devices", icon: Cpu },
    { path: "/technicians", label: "Technicians", icon: Users },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-sidebar h-screen flex-col fixed left-0 top-0 z-40 flex border-r border-sidebar-border transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border bg-sidebar-accent">
          <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-bold text-xl">
              N
            </div>
            {!collapsed && (
              <span className="ml-2 text-xl font-semibold">Nexus IoT</span>
            )}
          </div>
        </div>

        <div className="flex-1 py-6 px-4 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-md transition-colors",
                  collapsed ? "justify-center" : "justify-start",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="self-end text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "flex items-center text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              collapsed ? "justify-center p-3" : "justify-start"
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center px-6 justify-between">
          <h1 className="text-xl font-semibold">
            {navItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                A
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 page-transition">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
