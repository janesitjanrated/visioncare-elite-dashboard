import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import LineWebhookSetup from './components/LineWebhookSetup';

const Profile = () => {
  const { user, userProfile, updateProfile, authError, clearError } = useAuth();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    phone: userProfile?.phone || '',
    role: userProfile?.role || 'staff'
  });

  const roleOptions = [
    { value: 'owner', label: 'Clinic Owner' },
    { value: 'manager', label: 'Manager' },
    { value: 'staff', label: 'Staff Member' }
  ];

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (authError) clearError();
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfile(formData);
      
      if (result?.success) {
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.log('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: userProfile?.full_name || '',
      phone: userProfile?.phone || '',
      role: userProfile?.role || 'staff'
    });
    setIsEditing(false);
    if (authError) clearError();
    if (successMessage) setSuccessMessage('');
  };

  // Mock user data for header (replace with actual user data)
  const headerUser = {
    id: user?.id,
    name: userProfile?.full_name || user?.email?.split('@')[0],
    email: user?.email,
    role: userProfile?.role || 'staff',
    avatar: userProfile?.avatar_url
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader
        user={headerUser}
        branches={[]}
        selectedBranch={null}
        onBranchChange={() => {}}
        onToggleSidebar={handleToggleSidebar}
        sidebarExpanded={sidebarExpanded}
      />

      {/* Sidebar */}
      <RoleBasedSidebar
        user={headerUser}
        isExpanded={sidebarExpanded}
        onToggle={handleToggleSidebar}
      />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarExpanded ? 'lg:pl-60' : 'lg:pl-16'
      }`}>
        <div className="p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      iconName="Edit"
                      iconPosition="left"
                    >
                      Edit
                    </Button>
                  )}
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                  <div className="bg-success/10 border border-success/20 rounded-md p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <p className="text-sm text-success">{successMessage}</p>
                    </div>
                  </div>
                )}

                {authError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-destructive" />
                      <p className="text-sm text-destructive">{authError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing || isLoading}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                      Role
                    </label>
                    <Select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      options={roleOptions}
                      disabled={!isEditing || isLoading}
                    />
                  </div>

                  {/* Form Actions */}
                  {isEditing && (
                    <div className="flex space-x-3 pt-4">
                      <Button
                        type="submit"
                        loading={isLoading}
                        iconName="Save"
                        iconPosition="left"
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Profile Summary & Additional Settings */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Profile Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary-foreground">
                        {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {userProfile?.full_name || 'No name set'}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {userProfile?.role || 'staff'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-medium text-success">Active</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Joined</p>
                        <p className="font-medium">
                          {userProfile?.created_at ? 
                            new Date(userProfile.created_at).toLocaleDateString() : 
                            'N/A'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Webhook Setup - Only for Owners */}
              {userProfile?.role === 'owner' && (
                <LineWebhookSetup userProfile={userProfile} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;