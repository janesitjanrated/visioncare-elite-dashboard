import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LineWebhookSetup = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [channelToken, setChannelToken] = useState('');
  const [channelSecret, setChannelSecret] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Generate webhook URL
  const generateWebhookUrl = () => {
    const baseUrl = window.location.origin;
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const generatedUrl = `${baseUrl}/api/webhooks/line/${timestamp}-${randomId}`;
    setWebhookUrl(generatedUrl);
  };

  const handleConnect = async () => {
    if (!channelToken || !channelSecret) {
      alert('Please enter both Channel Access Token and Channel Secret');
      return;
    }

    setConnectionStatus('connecting');
    
    try {
      // Simulate API call to connect Line bot
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      setConnectionStatus('connected');
      
      // Store connection details in localStorage for demo
      localStorage.setItem('lineBot', JSON.stringify({
        webhookUrl,
        channelToken,
        channelSecret,
        connectedAt: new Date().toISOString()
      }));
      
    } catch (error) {
      setConnectionStatus('error');
      console.error('Connection failed:', error);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectionStatus('disconnected');
    localStorage.removeItem('lineBot');
  };

  const testWebhook = async () => {
    if (!webhookUrl) {
      alert('Please generate a webhook URL first');
      return;
    }

    try {
      const testData = {
        destination: 'test',
        events: [{
          type: 'message',
          message: {
            type: 'text',
            text: 'Test message from EyeCare Pro'
          },
          source: {
            type: 'user',
            userId: 'test-user'
          },
          timestamp: Date.now()
        }]
      };

      console.log('Testing webhook with data:', testData);
      alert('Webhook test initiated. Check console for details.');
    } catch (error) {
      console.error('Webhook test failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Connection Status</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isConnected 
              ? 'bg-success/10 text-success' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-success' : 'bg-muted-foreground'
            }`} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
        
        {isConnected && (
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success">
                Line bot is successfully connected and ready to receive messages
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Webhook URL Generation */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Webhook URL</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Generated Webhook URL
            </label>
            <div className="flex space-x-2">
              <Input
                value={webhookUrl}
                placeholder="Click 'Generate URL' to create webhook endpoint"
                readOnly
                className="flex-1"
              />
              <Button onClick={generateWebhookUrl} variant="outline">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Generate URL
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This URL will be used as your Line bot webhook endpoint
            </p>
          </div>

          {webhookUrl && (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Webhook Ready</p>
                  <p className="text-xs text-muted-foreground">
                    Copy this URL to your Line Developer Console
                  </p>
                </div>
                <Button onClick={testWebhook} variant="outline" size="sm">
                  Test Webhook
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Line Bot Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Line Bot Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Channel Access Token
            </label>
            <Input
              type="password"
              value={channelToken}
              onChange={(e) => setChannelToken(e.target.value)}
              placeholder="Enter your Line Channel Access Token"
              disabled={isConnected}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Channel Secret
            </label>
            <Input
              type="password"
              value={channelSecret}
              onChange={(e) => setChannelSecret(e.target.value)}
              placeholder="Enter your Line Channel Secret"
              disabled={isConnected}
            />
          </div>

          <div className="flex space-x-3">
            {!isConnected ? (
              <Button 
                onClick={handleConnect}
                disabled={connectionStatus === 'connecting' || !webhookUrl}
                className="flex items-center space-x-2"
              >
                {connectionStatus === 'connecting' ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Link" size={16} />
                    <span>Connect Line Bot</span>
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleDisconnect}
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <Icon name="Unlink" size={16} />
                <span>Disconnect</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Setup Instructions</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium text-foreground">Create Line Developer Account</p>
              <p>Visit Line Developers Console and create a new messaging API channel</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium text-foreground">Generate Webhook URL</p>
              <p>Click "Generate URL" above and copy the webhook URL</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium text-foreground">Configure Line Channel</p>
              <p>Add the webhook URL to your Line channel settings and get tokens</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium mt-0.5">
              4
            </div>
            <div>
              <p className="font-medium text-foreground">Connect & Test</p>
              <p>Enter your tokens above and test the connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineWebhookSetup;