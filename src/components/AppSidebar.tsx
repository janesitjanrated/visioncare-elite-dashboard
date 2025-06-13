
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Eye,
  Sparkles,
  BarChart3,
  Users,
  Calendar,
  Stethoscope,
  Brain,
  DollarSign,
  Target,
  PieChart,
  Shield
} from 'lucide-react';

const navigationItems = [
  { 
    icon: BarChart3, 
    label: 'Analytics Dashboard', 
    path: '/',
    badge: null 
  },
  { 
    icon: Users, 
    label: 'Patient Intelligence', 
    path: '/patients',
    badge: '2,847' 
  },
  { 
    icon: Calendar, 
    label: 'Smart Scheduling', 
    path: '/scheduling',
    badge: 'Live' 
  },
  { 
    icon: Stethoscope, 
    label: 'Doctor Performance', 
    path: '/doctors',
    badge: null 
  },
  { 
    icon: Brain, 
    label: 'Treatment Outcomes', 
    path: '/treatments',
    badge: null 
  },
  { 
    icon: DollarSign, 
    label: 'Revenue Analytics', 
    path: '/revenue',
    badge: null 
  },
  { 
    icon: Target, 
    label: 'Quality Metrics', 
    path: '/quality',
    badge: null 
  },
  { 
    icon: PieChart, 
    label: 'Business Reports', 
    path: '/reports',
    badge: null 
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const getNavClassName = (path: string) => {
    const isActive = location.pathname === path;
    return `w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group ${
      isActive 
        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl' 
        : 'text-gray-700 hover:bg-gray-50 hover:shadow-md'
    }`;
  };

  return (
    <Sidebar className="bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-100">
      {/* Brand Header */}
      <SidebarHeader className="p-8 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Eye className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-2 w-2 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                VisionCare Elite
              </h1>
              <p className="text-sm text-gray-600 font-medium">Advanced Eye Care Center</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-semibold text-xs uppercase tracking-wide mb-4">
            {!isCollapsed ? 'Main Navigation' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.path} className={getNavClassName(item.path)}>
                        <div className="flex items-center space-x-3">
                          <item.icon className={`h-5 w-5 ${
                            isActive ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'
                          }`} />
                          {!isCollapsed && (
                            <span className="font-semibold text-sm">{item.label}</span>
                          )}
                        </div>
                        {!isCollapsed && item.badge && (
                          <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Premium Footer */}
      {!isCollapsed && (
        <SidebarFooter className="p-6">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
            <div className="relative z-10">
              <Shield className="h-8 w-8 mb-3 text-emerald-100" />
              <h3 className="font-bold text-lg mb-1">ISO 27001 Certified</h3>
              <p className="text-emerald-100 text-sm">ความปลอดภัยระดับโลก</p>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
