import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  ShieldCheck, 
  Settings, 
  FileBarChart, 
  User,
  Menu,
  X,
  Calendar,
  Lightbulb,
  Clock,
  FileText,
  Baby,
  Home,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, isActive, isCollapsed }: SidebarLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon size={20} className={cn("flex-shrink-0", isCollapsed ? "mx-auto" : "")} />
      {!isCollapsed && <span className="font-medium animate-slide-in">{label}</span>}
      {isCollapsed && (
        <div className="absolute left-16 rounded-md px-2 py-1 ml-6 bg-primary text-primary-foreground text-sm invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isSupervisor = location.pathname.includes('/supervisor');
  const isParent = location.pathname.includes('/parent');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const adminLinks = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/therapists", icon: Users, label: "Therapists" },
    { to: "/supervisors", icon: ShieldCheck, label: "Supervisors" },
    { to: "/user-management", icon: UserCog, label: "User Management" },
    { to: "/role-management", icon: ShieldCheck, label: "Role Management" },
    { to: "/system-settings", icon: Settings, label: "System Settings" },
    { to: "/reports", icon: FileBarChart, label: "Reports" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const supervisorLinks = [
    { to: "/supervisor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/supervisor/therapists", icon: Users, label: "Therapists" },
    { to: "/supervisor/children", icon: Baby, label: "Children" },
    { to: "/supervisor/child-progress", icon: FileBarChart, label: "Child Progress" },
    { to: "/supervisor/recommendations", icon: Lightbulb, label: "Recommendations" },
    { to: "/supervisor/sessions", icon: Calendar, label: "Sessions" },
    { to: "/supervisor/reports", icon: FileText, label: "Reports" },
    { to: "/supervisor/parent-messages", icon: MessageSquare, label: "Parent Messages" },
    { to: "/supervisor/profile", icon: User, label: "Profile" },
  ];
  
  const parentLinks = [
    { to: "/parent/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/parent/home-activities", icon: BookOpen, label: "Home Activities" },
    { to: "/parent/messages", icon: MessageSquare, label: "Messages" },
    { to: "/parent/profile", icon: User, label: "Profile" },
  ];

  let links = adminLinks;
  let userType = "Admin";
  
  if (isSupervisor) {
    links = supervisorLinks;
    userType = "Supervisor";
  } else if (isParent) {
    links = parentLinks;
    userType = "Parent";
  }

  return (
    <>
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        className={cn(
          "bg-sidebar flex flex-col h-screen border-r border-sidebar-border transition-all duration-300 ease-in-out z-50",
          isCollapsed && !isMobile ? "w-16" : "w-64",
          isMobile ? "fixed" : "sticky top-0",
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn("flex items-center gap-2", isCollapsed && !isMobile ? "hidden" : "")}>
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-semibold">TM</span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-lg animate-slide-in">Therapy Management</span>
            )}
          </div>
          {!isMobile && (
            <button 
              className="p-1 rounded-md hover:bg-sidebar-accent"
              onClick={toggleSidebar}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={location.pathname === link.to}
              isCollapsed={isCollapsed && !isMobile}
            />
          ))}
        </nav>

        <div className={cn("p-4 border-t border-sidebar-border", isCollapsed && !isMobile ? "hidden" : "")}>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <span className="text-sm font-medium">{userType.charAt(0)}</span>
            </div>
            {!isCollapsed && (
              <div className="animate-slide-in">
                <p className="text-sm font-medium">{userType}</p>
                <p className="text-xs text-sidebar-foreground">example@example.com</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-sidebar-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">Need assistance?</p>
            <p className="text-xs text-muted-foreground">Get help with therapy management and reports.</p>
            <Link 
              to={isParent ? "/parent/dashboard" : (isSupervisor ? "/supervisor/dashboard" : "/")} 
              className="text-xs text-primary flex items-center mt-2"
            >
              View Dashboard
              <svg width="16" height="16" viewBox="0 0 16 16" className="ml-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
