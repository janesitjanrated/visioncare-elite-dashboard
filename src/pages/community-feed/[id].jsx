import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import FeedCard from './components/FeedCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CommunityFeedFullPage = ({ posts = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get posts from location state first, then from props
  const availablePosts = location.state?.posts || posts;
  const post = availablePosts.find((p) => String(p.id) === String(id));

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold mb-4">Post not found</div>
        <Button onClick={() => navigate('/community-feed')} iconName="ArrowLeft">
          Back to Feed
        </Button>
      </div>
    );
  }

  // Always show full content without truncation
  const fullContent = post.content;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-2xl mt-10">
        <Button variant="ghost" onClick={() => navigate('/community-feed')} className="mb-4">
          <Icon name="ArrowLeft" size={18} className="mr-2" /> กลับไปหน้าฟีด
        </Button>
        <FeedCard post={{ ...post, content: fullContent }} isFullPage={true} />
      </div>
    </div>
  );
};

export default CommunityFeedFullPage; 