import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import authService from '../../../utils/authService';

const LineWebhookSetup = ({ userProfile }) => {
  const [webhookConfig, setWebhookConfig] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    channel_access_token: '',
    channel_secret: '',
    webhook_url: ''
  });

  // Load existing webhook configuration
  useEffect(() => {
    const loadWebhookConfig = async () => {
      if (!userProfile?.clinic_id) return;

      setIsLoadingConfig(true);
      try {
        const result = await authService.getLineWebhookConfig(userProfile.clinic_id);
        
        if (result?.success) {
          setWebhookConfig(result.data);
          setFormData({
            channel_access_token: result.data.channel_access_token || '',
            channel_secret: result.data.channel_secret || '',
            webhook_url: result.data.webhook_url || ''
          });
        }
      } catch (error) {
        console.log('Error loading webhook config:', error);
      } finally {
        setIsLoadingConfig(false);
      }
    };

    loadWebhookConfig();
  }, [userProfile?.clinic_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.channel_access_token || !formData.channel_secret || !formData.webhook_url) {
      setError('All fields are required');
      return;
    }

    if (!formData.webhook_url.startsWith('https://')) {
      setError('Webhook URL must be HTTPS');
      return;
    }

    setIsLoading(true);

    try {
      const webhookData = {
        ...formData,
        clinic_id: userProfile.clinic_id,
        owner_id: userProfile.id
      };

      let result;
      if (webhookConfig) {
        // Update existing configuration
        result = await authService.updateLineWebhook(webhookConfig.id, formData);
      } else {
        // Create new configuration
        result = await authService.setupLineWebhook(webhookData);
      }
      
      if (result?.success) {
        setWebhookConfig(result.data);
        setSuccessMessage('Line webhook configuration saved successfully!');
        setIsEditing(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result?.error || 'Failed to save webhook configuration');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.log('Webhook setup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (webhookConfig) {
      setFormData({
        channel_access_token: webhookConfig.channel_access_token || '',
        channel_secret: webhookConfig.channel_secret || '',
        webhook_url: webhookConfig.webhook_url || ''
      });
    } else {
      setFormData({
        channel_access_token: '',
        channel_secret: '',
        webhook_url: ''
      });
    }
    setIsEditing(false);
    setError('');
    setSuccessMessage('');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'text-success bg-success/10', icon: 'CheckCircle', label: 'Active' },
      inactive: { color: 'text-warning bg-warning/10', icon: 'Clock', label: 'Inactive' },
      error: { color: 'text-destructive bg-destructive/10', icon: 'AlertCircle', label: 'Error' }
    };

    const config = statusConfig[status] || statusConfig.inactive;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  if (isLoadingConfig) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Line Bot Configuration</h3>
          <p className="text-sm text-muted-foreground">Configure Line webhook for bot integration</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName={webhookConfig ? "Edit" : "Plus"}
            iconPosition="left"
          >
            {webhookConfig ? 'Edit' : 'Setup'}
          </Button>
        )}
      </div>

      {/* Current Status */}
      {webhookConfig && !isEditing && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Status</span>
            {getStatusBadge(webhookConfig.status)}
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Webhook URL: {webhookConfig.webhook_url}</p>
            {webhookConfig.last_verified_at && (
              <p>Last verified: {new Date(webhookConfig.last_verified_at).toLocaleString()}</p>
            )}
            {webhookConfig.error_message && (
              <p className="text-destructive mt-1">Error: {webhookConfig.error_message}</p>
            )}
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-success/10 border border-success/20 rounded-md p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <p className="text-sm text-success">{successMessage}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      )}

      {/* Configuration Form */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel Access Token */}
          <div>
            <label htmlFor="channel_access_token" className="block text-sm font-medium text-foreground mb-2">
              Channel Access Token *
            </label>
            <Input
              id="channel_access_token"
              name="channel_access_token"
              type="password"
              value={formData.channel_access_token}
              onChange={handleChange}
              placeholder="Enter Line channel access token"
              disabled={isLoading}
              required
            />
          </div>

          {/* Channel Secret */}
          <div>
            <label htmlFor="channel_secret" className="block text-sm font-medium text-foreground mb-2">
              Channel Secret *
            </label>
            <Input
              id="channel_secret"
              name="channel_secret"
              type="password"
              value={formData.channel_secret}
              onChange={handleChange}
              placeholder="Enter Line channel secret"
              disabled={isLoading}
              required
            />
          </div>

          {/* Webhook URL */}
          <div>
            <label htmlFor="webhook_url" className="block text-sm font-medium text-foreground mb-2">
              Webhook URL *
            </label>
            <Input
              id="webhook_url"
              name="webhook_url"
              type="url"
              value={formData.webhook_url}
              onChange={handleChange}
              placeholder="https://your-domain.com/api/line/webhook"
              disabled={isLoading}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Must be a valid HTTPS URL for Line webhook
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              Save Configuration
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
        </form>
      ) : !webhookConfig ? (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">
            No Line bot configuration found. Set up your Line webhook to enable bot integration.
          </p>
          <Button
            onClick={() => setIsEditing(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Setup Line Bot
          </Button>
        </div>
      ) : null}

      {/* Help Text */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-primary font-medium mb-1">Line Bot Setup Guide:</p>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside text-xs">
              <li>Create a Line Messaging API channel in Line Developers console</li>
              <li>Copy the Channel Access Token and Channel Secret</li>
              <li>Set up your webhook URL to receive Line messages</li>
              <li>Only clinic owners can configure Line bot integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineWebhookSetup;