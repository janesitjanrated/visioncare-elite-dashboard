import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import BranchSelector from './BranchSelector';

const NavigationHeader = ({ user, branches, selectedBranch, onBranchChange, onToggleSidebar, sidebarExpanded }) => {
  const navigate = useNavigate();
  const { user: authUser, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New appointment scheduled', time: '5 min ago', type: 'info' },
    { id: 2, title: 'Low inventory alert: Contact lenses', time: '15 min ago', type: 'warning' },
    { id: 3, title: 'Payment received from John Doe', time: '1 hour ago', type: 'success' },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  // Use authenticated user if available, fallback to mock user
  const displayUser = authUser ? {
    id: authUser.id,
    name: user?.name || authUser.email?.split('@')[0] || 'User',
    email: authUser.email,
    role: user?.role || 'staff'
  } : user;

  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-card border-b border-border z-header">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-muted transition-hover lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} />
          </button>
          
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">ClinicVision Pro</h1>
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Auth Status Indicator */}
          {!authUser && (
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <span className="text-warning">Preview Mode</span>
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-medium"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Branch Selector - Only for owners with multiple branches */}
          {displayUser?.role === 'owner' && branches?.length > 1 && (
            <BranchSelector
              branches={branches}
              selectedBranch={selectedBranch}
              onBranchChange={onBranchChange}
            />
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-muted transition-hover relative"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-dropdown">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-hover">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-success' :
                          notification.type === 'warning'? 'bg-warning' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-popover-foreground">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="text-sm text-primary hover:text-primary/80 transition-hover">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-hover"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {displayUser?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{displayUser?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground capitalize">{displayUser?.role || 'Staff'}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden md:block" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-dropdown">
                <div className="p-2">
                  {authUser ? (
                    <>
                      <Link 
                        to="/profile"
                        className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-hover text-left"
                      >
                        <Icon name="User" size={16} />
                        <span className="text-sm text-popover-foreground">Profile</span>
                      </Link>
                      <button className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-hover text-left">
                        <Icon name="Settings" size={16} />
                        <span className="text-sm text-popover-foreground">Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-hover text-left">
                        <Icon name="HelpCircle" size={16} />
                        <span className="text-sm text-popover-foreground">Help</span>
                      </button>
                      <hr className="my-2 border-border" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-destructive/10 text-destructive transition-hover text-left"
                      >
                        <Icon name="LogOut" size={16} />
                        <span className="text-sm">Sign out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-hover text-left"
                      >
                        <Icon name="LogIn" size={16} />
                        <span className="text-sm text-popover-foreground">Sign In</span>
                      </Link>
                      <Link 
                        to="/signup"
                        className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-hover text-left"
                      >
                        <Icon name="UserPlus" size={16} />
                        <span className="text-sm text-popover-foreground">Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-[999]" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default NavigationHeader;