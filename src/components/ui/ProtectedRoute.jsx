import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';

const ProtectedRoute = ({ children, requiredRole = null, fallback = null }) => {
  const { user, userProfile, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Eye" size={32} color="white" />
          </div>
          <div className="animate-pulse">
            <div className="h-2 bg-muted rounded w-32 mx-auto mb-2"></div>
            <div className="h-2 bg-muted rounded w-24 mx-auto"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Show fallback or preview mode for unauthenticated users (Rocket platform development mode)
  if (!user) {
    if (fallback) {
      return fallback;
    }

    // Development preview mode - show content with preview banner
    return (
      <div className="min-h-screen bg-background">
        {/* Preview Mode Banner */}
        <div className="bg-warning text-warning-foreground px-4 py-2 text-center text-sm font-medium">
          <Icon name="Eye" size={16} className="inline mr-2" />
          Preview Mode - Please sign in for full access
        </div>
        
        {/* Mock preview state */}
        <div className="p-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Icon name="Lock" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to access this feature
            </p>
            <div className="space-x-3">
              <a 
                href="/login"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Sign In
              </a>
              <a 
                href="/signup"
                className="inline-flex items-center px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check role-based access if required
  if (requiredRole && userProfile?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg p-6 text-center max-w-md">
          <Icon name="Shield" size={48} className="mx-auto text-destructive mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">
            You do not have permission to access this page. Required role: {requiredRole}
          </p>
          <p className="text-sm text-muted-foreground">
            Your current role: {userProfile?.role || 'Unknown'}
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated and has required permissions
  return children;
};

export default ProtectedRoute;