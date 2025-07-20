import { Users, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn("fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-slate-200", className)}>
      <div className="flex h-16 items-center px-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800">ClientDB</h1>
        </div>
      </div>
      
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          <li>
            <a href="#" className="bg-primary/10 text-primary group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <Users className="text-primary mr-3 h-4 w-4" />
              Clients
            </a>
          </li>
          <li>
            <a href="#" className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <BarChart3 className="text-slate-400 mr-3 h-4 w-4" />
              Analytics
            </a>
          </li>
          <li>
            <a href="#" className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <Settings className="text-slate-400 mr-3 h-4 w-4" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
