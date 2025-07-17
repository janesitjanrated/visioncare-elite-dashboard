import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../utils/authService';
import { apiClient } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState(null);
  const [branch, setBranch] = useState(null);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Check for existing session
      const sessionResult = await authService.getSession();
      
      if (sessionResult.success && sessionResult.data?.session?.user) {
        const currentUser = sessionResult.data.session.user;
        setUser(currentUser);
        
        // Load organization and branch data
        await loadUserContext(currentUser);
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserContext = async (user) => {
    try {
      // Load user's organization and branch from API
      if (user.org_id) {
        const orgResponse = await apiClient.getOrganization(user.org_id);
        setOrganization(orgResponse.data || orgResponse);
      }
      
      if (user.branch_id) {
        const branchResponse = await apiClient.getBranch(user.branch_id);
        setBranch(branchResponse.data || branchResponse);
      }
    } catch (error) {
      console.error('Failed to load user context:', error);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const result = await authService.signIn(email, password);
      
      if (result.success) {
        const loggedInUser = result.data.user;
        setUser(loggedInUser);
        
        // Load organization and branch context
        await loadUserContext(loggedInUser);
        
        return { success: true, user: loggedInUser };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true);
      const result = await authService.signUp(email, password, userData);
      
      if (result.success) {
        // Auto-login after successful registration
        const loginResult = await signIn(email, password);
        return loginResult;
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      setUser(null);
      setOrganization(null);
      setBranch(null);
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false, error: 'Logout failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      // Try backend API first
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await apiClient.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(updates)
          });
          
          // Update local storage
          const userStr = localStorage.getItem('authUser');
          if (userStr) {
            const user = JSON.parse(userStr);
            const updatedUser = { ...user, ...updates };
            localStorage.setItem('authUser', JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
          
          return { success: true, data: response };
        } catch (error) {
          console.log('Backend profile update failed:', error.message);
        }
      }
      
      // Fallback to authService
      const result = await authService.updateUserProfile(user?.id, updates);
      
      if (result.success) {
        setUser(prev => ({ ...prev, ...updates }));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: 'Profile update failed. Please try again.' };
    }
  };

  const switchBranch = async (branchId) => {
    try {
      const branchResponse = await apiClient.getBranch(branchId);
      const newBranch = branchResponse.data || branchResponse;
      
      setBranch(newBranch);
      
      // Update user's current branch context
      setUser(prev => ({ ...prev, current_branch_id: branchId }));
      
      return { success: true, branch: newBranch };
    } catch (error) {
      console.error('Branch switch failed:', error);
      return { success: false, error: 'Failed to switch branch.' };
    }
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    
    const userRole = user.role?.toLowerCase();
    const required = requiredRole.toLowerCase();
    
    // Role hierarchy: owner > manager > staff
    const roleHierarchy = {
      'owner': 3,
      'manager': 2,
      'staff': 1
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[required];
  };

  // Check if user can access specific feature
  const canAccess = (feature) => {
    if (!user) return false;
    
    const permissions = {
      'patient-management': ['owner', 'manager', 'staff'],
      'financial-reporting': ['owner', 'manager'],
      'staff-management': ['owner', 'manager'],
      'branch-management': ['owner'],
      'inventory-management': ['owner', 'manager', 'staff'],
      'community-feed': ['owner', 'manager', 'staff'],
      'loans-management': ['owner', 'manager']
    };
    
    const allowedRoles = permissions[feature] || [];
    return allowedRoles.includes(user.role?.toLowerCase());
  };

  const value = {
    user,
    organization,
    branch,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    switchBranch,
    hasRole,
    canAccess,
    isAuthenticated: !!user,
    isOwner: hasRole('owner'),
    isManager: hasRole('manager'),
    isStaff: hasRole('staff')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;