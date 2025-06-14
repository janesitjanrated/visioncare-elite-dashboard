
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
  Shield,
  CalendarCheck,
  UserPlus,
  Clock,
  Building,
  UserCheck,
  FileText,
  TrendingUp,
  MessageSquare,
  Star,
  MessageCircle,
  Settings,
  Plus,
  Search,
  Archive,
  CreditCard,
  Receipt,
  Calculator
} from 'lucide-react';

// Define menu items for each system
const systemMenus = {
  appointment: [
    { icon: CalendarCheck, label: 'รายการนัดหมาย', path: '/appointments/list' },
    { icon: Plus, label: 'สร้างนัดหมาย', path: '/appointments/create' },
    { icon: Calendar, label: 'ปฏิทินแพทย์', path: '/appointments/calendar' },
    { icon: Clock, label: 'รายการรอ', path: '/appointments/waiting' },
    { icon: UserCheck, label: 'เช็คอิน', path: '/appointments/checkin' },
    { icon: BarChart3, label: 'รายงาน', path: '/appointments/reports' }
  ],
  hr: [
    { icon: Users, label: 'รายชื่อพนักงาน', path: '/hr-dashboard/employees' },
    { icon: UserPlus, label: 'เพิ่มพนักงาน', path: '/hr-dashboard/add-employee' },
    { icon: Calendar, label: 'ตารางเวร', path: '/hr-dashboard/schedule' },
    { icon: FileText, label: 'ใบลา', path: '/hr-dashboard/leave' },
    { icon: TrendingUp, label: 'ประเมินผล', path: '/hr-dashboard/performance' },
    { icon: DollarSign, label: 'เงินเดือน', path: '/hr-dashboard/payroll' }
  ],
  branch: [
    { icon: Building, label: 'ข้อมูลสาขา', path: '/branch/info' },
    { icon: BarChart3, label: 'ผลงานสาขา', path: '/branch/performance' },
    { icon: Users, label: 'พนักงานสาขา', path: '/branch/staff' },
    { icon: DollarSign, label: 'รายได้สาขา', path: '/branch/revenue' },
    { icon: Target, label: 'เป้าหมาย', path: '/branch/targets' },
    { icon: Settings, label: 'ตั้งค่าสาขา', path: '/branch/settings' }
  ],
  feedback: [
    { icon: MessageSquare, label: 'ความคิดเห็นทั้งหมด', path: '/feedback/all' },
    { icon: Star, label: 'คะแนนรีวิว', path: '/feedback/ratings' },
    { icon: MessageCircle, label: 'ข้อเสนอแนะ', path: '/feedback/suggestions' },
    { icon: BarChart3, label: 'สถิติความพึงพอใจ', path: '/feedback/analytics' },
    { icon: TrendingUp, label: 'รายงานคุณภาพ', path: '/feedback/quality' },
    { icon: Archive, label: 'ประวัติการตอบกลับ', path: '/feedback/history' }
  ],
  finance: [
    { icon: BarChart3, label: 'ภาพรวม', path: '/finance' },
    { icon: DollarSign, label: 'ยอดขาย', path: '/finance/sales' },
    { icon: Package, label: 'สต็อก', path: '/finance/inventory' },
    { icon: Users, label: 'ลูกค้า', path: '/finance/customers' },
    { icon: Receipt, label: 'ค่าใช้จ่าย', path: '/finance/expenses' },
    { icon: Calculator, label: 'ภาษี', path: '/finance/tax' },
    { icon: AlertTriangle, label: 'แจ้งเตือน', path: '/finance/alerts' }
  ],
  chat: [
    { icon: MessageSquare, label: 'แชททั้งหมด', path: '/alerts/all' },
    { icon: Users, label: 'กลุ่มแชท', path: '/alerts/groups' },
    { icon: Search, label: 'ค้นหาข้อความ', path: '/alerts/search' },
    { icon: Archive, label: 'ข้อความที่เก็บ', path: '/alerts/archived' },
    { icon: Settings, label: 'ตั้งค่าแชท', path: '/alerts/settings' },
    { icon: Bell, label: 'การแจ้งเตือน', path: '/alerts/notifications' }
  ],
  dashboard: [
    { icon: BarChart3, label: 'Analytics Dashboard', path: '/' },
    { icon: Users, label: 'Patient Intelligence', path: '/patients' },
    { icon: Calendar, label: 'Smart Scheduling', path: '/scheduling' },
    { icon: Stethoscope, label: 'Doctor Performance', path: '/doctors' },
    { icon: Brain, label: 'Treatment Outcomes', path: '/treatments' },
    { icon: DollarSign, label: 'Revenue Analytics', path: '/revenue' },
    { icon: Target, label: 'Quality Metrics', path: '/quality' },
    { icon: PieChart, label: 'Business Reports', path: '/reports' }
  ]
};

const systemTitles = {
  appointment: 'ระบบนัดหมาย',
  hr: 'ระบบ HR/OD',
  branch: 'ระบบสาขา',
  feedback: 'ระบบ Feedback',
  finance: 'ระบบการเงิน',
  chat: 'ระบบ Chat',
  dashboard: 'Dashboard ผู้บริหาร'
};

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  // Determine current system based on route
  const getCurrentSystem = () => {
    if (location.pathname.startsWith('/appointments')) return 'appointment';
    if (location.pathname.startsWith('/hr-dashboard')) return 'hr';
    if (location.pathname.startsWith('/branch')) return 'branch';
    if (location.pathname.startsWith('/feedback')) return 'feedback';
    if (location.pathname.startsWith('/finance')) return 'finance';
    if (location.pathname.startsWith('/alerts')) return 'chat';
    return 'dashboard';
  };

  const currentSystem = getCurrentSystem();
  const currentMenuItems = systemMenus[currentSystem];
  const systemTitle = systemTitles[currentSystem];

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
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                VisionCare Elite
              </h1>
              <p className="text-sm text-emerald-600 font-medium">{systemTitle}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-semibold text-xs uppercase tracking-wide mb-4">
            {!isCollapsed ? 'เมนูหลัก' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {currentMenuItems.map((item) => {
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
