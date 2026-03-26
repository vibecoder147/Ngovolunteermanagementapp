import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  Heart, Moon, Sun, Bell, LogOut, Menu, X, ChevronRight,
  LayoutDashboard, Users, UserCheck, DollarSign, FileText,
  Mail, ClipboardList, CheckSquare, Calendar, Hospital,
  Award, CreditCard, FileSignature, LucideIcon
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface LayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications?: number;
}

const roleConfig = {
  superadmin: { label: 'Super Admin', color: 'from-violet-600 to-purple-600', badge: 'SA' },
  admin: { label: 'Admin', color: 'from-blue-600 to-cyan-500', badge: 'AD' },
  member: { label: 'Member', color: 'from-emerald-500 to-teal-500', badge: 'MB' },
  volunteer: { label: 'Volunteer', color: 'from-orange-500 to-rose-500', badge: 'VL' },
};

export function Layout({ children, navItems, activeTab, onTabChange, notifications = 0 }: LayoutProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme, currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const role = currentUser?.role || 'volunteer';
  const config = roleConfig[role];

  const handleLogout = () => {
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">HopeConnect</div>
            <div className="text-xs text-slate-400">NGO Management</div>
          </div>
        </div>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-3">
        <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r ${config.color} bg-opacity-20`}>
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-xs font-bold`}>
            {config.badge}
          </div>
          <div>
            <div className="text-white text-xs font-medium">{config.label}</div>
            <div className="text-slate-300 text-xs truncate max-w-[120px]">{currentUser?.name}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <div className="text-xs text-slate-500 uppercase tracking-wider px-3 py-2">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onTabChange(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full min-w-[18px] h-4.5 px-1 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom User */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-sm font-bold`}>
            {currentUser?.avatar || currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{currentUser?.name}</div>
            <div className="text-xs text-slate-400 truncate">{currentUser?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:bg-slate-700/60 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-slate-900 dark:bg-slate-950 flex-col border-r border-slate-700/50">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-60 bg-slate-900 flex flex-col h-full shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 lg:px-6 py-3.5 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="flex-1">
            <h1 className="text-slate-900 dark:text-white capitalize">
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors relative"
              >
                <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                {notifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-10 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800 dark:text-white">Notifications</span>
                    <button onClick={() => setShowNotif(false)}><X className="w-4 h-4 text-slate-400" /></button>
                  </div>
                  <div className="p-3 space-y-2">
                    {notifications > 0 ? (
                      <>
                        <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                          <p className="text-xs font-medium text-blue-800 dark:text-blue-300">New member joining request</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">Neha Joshi applied for membership</p>
                          <p className="text-xs text-blue-400 mt-1">2 hours ago</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                          <p className="text-xs font-medium text-amber-800 dark:text-amber-300">Task submitted for review</p>
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Rahul Sharma submitted Food Drive task</p>
                          <p className="text-xs text-amber-400 mt-1">4 hours ago</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-slate-500 text-center py-4">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-yellow-400" />
                : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User Avatar */}
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-xs font-bold`}>
              {currentUser?.avatar || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Export nav item sets
export const adminNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'volunteers', label: 'Volunteers', icon: UserCheck },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'donations', label: 'Donations', icon: DollarSign },
  { id: 'documentation', label: 'Documentation', icon: FileText },
  { id: 'joining-letters', label: 'Joining Letters', icon: FileSignature, badge: 2 },
  { id: 'requests', label: 'Requests', icon: ClipboardList, badge: 3 },
];

export const memberNavItems: NavItem[] = [
  { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
  { id: 'meetings', label: 'Minutes of Meeting', icon: Calendar },
  { id: 'hospital-mou', label: 'Hospital MOU', icon: Hospital },
  { id: 'certificate', label: 'Certificate', icon: Award },
  { id: 'payments', label: 'Payments', icon: CreditCard },
];

export const volunteerNavItems: NavItem[] = [
  { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
  { id: 'meetings', label: 'Minutes of Meeting', icon: Calendar },
  { id: 'certificate', label: 'Certificate', icon: Award },
  { id: 'joining-letter', label: 'Joining Letter', icon: Mail },
];
