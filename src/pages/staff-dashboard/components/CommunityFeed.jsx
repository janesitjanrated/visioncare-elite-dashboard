import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Dr. Sarah Mitchell",
      role: "Optometrist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      content: `Exciting news! We've just received the latest progressive lens technology that reduces adaptation time by 40%. This will significantly improve patient satisfaction for first-time progressive lens users.`,
      timestamp: "2025-01-12T10:30:00Z",
      likes: 12,
      comments: 3,
      type: "announcement",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      author: "ClinicVision Pro Team",
      role: "System Admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `System maintenance scheduled for tonight (11 PM - 2 AM). All patient data will be backed up automatically. Please complete any pending transactions before 10:45 PM.`,
      timestamp: "2025-01-12T09:15:00Z",
      likes: 8,
      comments: 1,
      type: "system-update"
    },
    {
      id: 3,
      author: "Lisa Anderson",
      role: "Senior Optician",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Great teamwork today! We successfully handled 45 patients with zero wait time complaints. Special thanks to the front desk team for excellent scheduling coordination.`,
      timestamp: "2025-01-12T08:45:00Z",
      likes: 15,
      comments: 5,
      type: "team-update"
    },
    {
      id: 4,
      author: "Michael Chen",
      role: "Branch Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `Monthly training session on new contact lens fitting techniques scheduled for next Friday at 2 PM. Attendance is mandatory for all optometry staff. Lunch will be provided.`,
      timestamp: "2025-01-11T16:20:00Z",
      likes: 6,
      comments: 2,
      type: "training"
    }
  ]);

  const [showComments, setShowComments] = useState({});

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-100 text-blue-800';
      case 'system-update':
        return 'bg-red-100 text-red-800';
      case 'team-update':
        return 'bg-green-100 text-green-800';
      case 'training':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return 'Megaphone';
      case 'system-update':
        return 'Settings';
      case 'team-update':
        return 'Users';
      case 'training':
        return 'GraduationCap';
      default:
        return 'Info';
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Community Feed</h3>
            <p className="text-sm text-muted-foreground">Latest clinic updates and announcements</p>
          </div>
        </div>
        <Button variant="outline" iconName="RefreshCw" iconPosition="left">
          Refresh
        </Button>
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="border border-border rounded-lg p-4">
            {/* Post Header */}
            <div className="flex items-start space-x-3 mb-3">
              <Image
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground">{post.author}</h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                    <Icon name={getPostTypeIcon(post.type)} size={10} className="mr-1" />
                    {post.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{post.role} • {formatTimeAgo(post.timestamp)}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
              {post.image && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt="Post image"
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Heart" size={16} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Share" size={16} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Bookmark" size={16} />
              </button>
            </div>

            {/* Comments Section */}
            {showComments[post.id] && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-primary-foreground">JD</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">John Doe:</span> Great update! Looking forward to trying the new technology.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">5 min ago</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button variant="outline" size="sm" iconName="Send" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No updates available</p>
          <p className="text-sm text-muted-foreground mt-1">Check back later for clinic announcements</p>
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;