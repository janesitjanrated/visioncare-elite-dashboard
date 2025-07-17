import { supabase } from './supabase';
import { apiClient } from './api';

const authService = {
  // Sign in with email and password
  async signIn(email, password) {
    // Try backend API first
    try {
      const response = await apiClient.login({ email, password });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authUser', JSON.stringify(response.user));
        
        return {
          success: true,
          data: {
            user: response.user,
            session: { access_token: response.token }
          }
        };
      }
    } catch (backendError) {
      console.log('Backend login failed, trying Supabase:', backendError.message);
      
      // Fallback to Supabase
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true, data };
      } catch (supabaseError) {
        return { 
          success: false, 
          error: 'Authentication failed. Please check your credentials.' 
        };
      }
    }
  },

  // Sign up with email, password and user data
  async signUp(email, password, userData = {}) {
    try {
      // Try backend API first
      try {
        const response = await apiClient.register({
          email,
          password,
          ...userData
        });
        
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('authUser', JSON.stringify(response.user));
        }
        
        return { success: true, data: response };
      } catch (backendError) {
        console.log('Backend signup failed, trying Supabase:', backendError.message);
        
        // Fallback to Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: userData?.fullName || '',
              role: userData?.role || 'staff',
              phone: userData?.phone || ''
            }
          }
        });

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true, data };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  },

  // Sign out
  async signOut() {
    try {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      
      // Try backend logout
      try {
        await apiClient.logout();
      } catch (error) {
        console.log('Backend logout failed:', error.message);
      }
      
      // Also try Supabase logout
      try {
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Supabase logout failed:', error.message);
      } catch (error) {
        console.log('Supabase logout error:', error.message);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed. Please try again.' };
    }
  },

  // Get current session
  async getSession() {
    try {
      // Check localStorage for backend auth
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('authUser');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          // Verify token is still valid with backend
          const profile = await apiClient.getProfile();
          return { 
            success: true, 
            data: { 
              session: { 
                access_token: token, 
                user: profile.user || user 
              } 
            } 
          };
        } catch (error) {
          console.log('Token validation failed:', error.message);
          // Clear invalid token
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
        }
      }
      
      // Fallback to Supabase
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to get session' };
    }
  },

  // Get user profile
  async getUserProfile(userId) {
    try {
      // Try backend API first
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const profile = await apiClient.getProfile();
          return {
            success: true,
            data: profile.user
          };
        } catch (error) {
          console.log('Backend profile fetch failed:', error.message);
        }
      }
      
      // Fallback to Supabase
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          clinic:clinics(*)
        `)
        .eq('id', userId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to load user profile' };
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to update profile' };
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to send password reset email' };
    }
  },

  // Line webhook management (Owner only)
  async setupLineWebhook(webhookData) {
    try {
      const { data, error } = await supabase
        .from('line_webhook_configs')
        .insert(webhookData)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to setup Line webhook' };
    }
  },

  async getLineWebhookConfig(clinicId) {
    try {
      const { data, error } = await supabase
        .from('line_webhook_configs')
        .select('*')
        .eq('clinic_id', clinicId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to get Line webhook config' };
    }
  },

  async updateLineWebhook(webhookId, updates) {
    try {
      const { data, error } = await supabase
        .from('line_webhook_configs')
        .update(updates)
        .eq('id', webhookId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update Line webhook' };
    }
  },

  // Auth state change listener
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

export default authService;