import { supabase } from './supabase';
import { apiClient } from './api';

const DEMO_USERS = [
  {
    email: 'owner@clinicvision.com',
    password: '123',
    role: 'owner',
    id: 'demo-owner-1',
    name: 'Demo Owner'
  },
  {
    email: 'manager@clinicvision.com',
    password: '123',
    role: 'manager',
    id: 'demo-manager-1',
    name: 'Demo Manager'
  },
  {
    email: 'staff@clinicvision.com',
    password: '123',
    role: 'staff',
    id: 'demo-staff-1',
    name: 'Demo Staff'
  },
  {
    email: 'admin@clinic.com',
    password: 'admin123',
    role: 'owner',
    id: 'backend-admin-1',
    name: 'Dr. Admin'
  }
];

// Demo session storage key
const DEMO_SESSION_KEY = 'demo_user_session';

const authService = {
  // Sign in with email and password
  async signIn(email, password) {
    // Check for demo credentials first
    const demoUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (demoUser) {
      // Store demo session in localStorage
      const demoSession = {
        user: {
          id: demoUser.id,
          email: demoUser.email,
          role: demoUser.role,
          name: demoUser.name,
          demo: true
        },
        access_token: 'demo-token-' + Date.now(),
        refresh_token: 'demo-refresh-' + Date.now(),
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoSession));
      
      return {
        success: true,
        data: {
          user: demoSession.user
        }
      };
    }

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
    }

    // Fallback to Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Update last login
      if (data?.user?.id) {
        await supabase
          .from('user_profiles')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', data.user.id);
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { 
          success: false, 
          error: 'Cannot connect to authentication service. Backend and Supabase are both unavailable.' 
        };
      }
      return { success: false, error: 'Something went wrong during login. Please try again.' };
    }
  },

  // Sign up with email, password and user data
  async signUp(email, password, userData = {}) {
    try {
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
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { 
          success: false, 
          error: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.' 
        };
      }
      return { success: false, error: 'Something went wrong during signup. Please try again.' };
    }
  },

  // Sign out
  async signOut() {
    try {
      // Clear demo session if exists
      localStorage.removeItem(DEMO_SESSION_KEY);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Something went wrong during logout. Please try again.' };
    }
  },

  // Get current session
  async getSession() {
    try {
      // Check for demo session first
      const demoSessionStr = localStorage.getItem(DEMO_SESSION_KEY);
      if (demoSessionStr) {
        const demoSession = JSON.parse(demoSessionStr);
        // Check if session is expired
        if (demoSession.expires_at > Date.now()) {
          return { 
            success: true, 
            data: { 
              session: demoSession 
            } 
          };
        } else {
          // Session expired, remove it
          localStorage.removeItem(DEMO_SESSION_KEY);
        }
      }
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to authentication service. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to get session' };
    }
  },

  // Get user profile
  async getUserProfile(userId) {
    try {
      // Check if it's a demo user
      const demoSessionStr = localStorage.getItem(DEMO_SESSION_KEY);
      if (demoSessionStr) {
        const demoSession = JSON.parse(demoSessionStr);
        if (demoSession.user.id === userId) {
          // Return mock profile for demo user
          return {
            success: true,
            data: {
              id: demoSession.user.id,
              email: demoSession.user.email,
              role: demoSession.user.role,
              name: demoSession.user.name,
              demo: true,
              clinic: {
                id: 'demo-clinic-1',
                name: 'Demo Eye Clinic',
                address: '123 Demo Street, Demo City'
              }
            }
          };
        }
      }
      
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
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
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