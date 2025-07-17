import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedSidebar = ({ user, isExpanded, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = (userRole) => {
    const baseItems = [
      {
        label: 'Dashboard',
        path: userRole === 'owner' ? '/owner-dashboard' : '/staff-dashboard',
        icon: 'LayoutDashboard',
        roles: ['owner', 'staff'],
        tooltip: 'Main dashboard overview'
      },
      {
        label: 'Patients',
        path: '/patient-management',
        icon: 'Users',
        roles: ['owner', 'staff'],
        tooltip: 'Manage patient records and appointments'
      },
      {
        label: 'Inventory',
        path: '/inventory-stock-management',
        icon: 'Package',
        roles: ['owner', 'staff'],
        tooltip: 'Stock management and product control'
      },
      {
        label: 'Community Feed',
        path: '/community-feed',
        icon: 'MessageSquare',
        roles: ['owner', 'staff'],
        tooltip: 'Community news and updates management'
      }
    ];

    const ownerOnlyItems = [
      {
        label: 'Financial Reports',
        path: '/financial-reporting-accounting',
        icon: 'TrendingUp',
        roles: ['owner'],
        tooltip: 'Business intelligence and accounting'
      },
      {
        label: 'Loans Management',
        path: '/loans-management',
        icon: 'FileText',
        roles: ['owner'],
        tooltip: 'Manage business loans and payments'
      },
      {
        label: 'Branch Management',
        path: '/branch-tenant-management',
        icon: 'Building2',
        roles: ['owner'],
        tooltip: 'Multi-location oversight and control'
      },
      {
        label: 'Configuration',
        path: '/config',
        icon: 'Settings',
        roles: ['owner'],
        tooltip: 'System configuration and integrations'
      }
    ];

    // Filter items based on user role
    const allItems = [...baseItems, ...ownerOnlyItems];
    const filteredItems = allItems.filter(item => 
      item.roles.includes(userRole)
    );
    
    return filteredItems;
  };

  const userRole = user?.role || 'staff';
  const navigationItems = getNavigationItems(userRole);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-24 h-[calc(100vh-4rem)] bg-card border-r border-border z-sidebar transition-all duration-300 ${
        isExpanded ? 'w-60' : 'w-19'
      }`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="p-4 border-b border-border">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-hover"
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <Icon name={isExpanded ? 'ChevronLeft' : 'ChevronRight'} size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-hover group relative ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                title={!isExpanded ? item.tooltip : ''}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={isActiveRoute(item.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                />
                {isExpanded && (
                  <span className="font-medium">{item.label}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-modal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-dropdown">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* User Role Indicator */}
          {isExpanded && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  user?.role === 'owner' ? 'bg-primary' : 'bg-accent'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {user?.role || 'Staff'} Access
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {navigationItems.length} menu items
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-black/50 z-mobile-overlay transition-opacity ${
        isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={onToggle}>
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-card border-r border-border transform transition-transform ${
          isExpanded ? 'translate-x-0' : '-translate-x-full'
        }`} onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Navigation</h2>
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-muted transition-hover"
                aria-label="Close sidebar"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    handleNavigation(item.path);
                    onToggle(); // Close mobile sidebar after navigation
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-hover ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActiveRoute(item.path) ? 'text-primary-foreground' : 'text-muted-foreground'}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Role Indicator */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  user?.role === 'owner' ? 'bg-primary' : 'bg-accent'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {user?.role || 'Staff'} Access
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {navigationItems.length} menu items
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default RoleBasedSidebar;