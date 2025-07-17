import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const FeedCard = ({ post, allPosts = [], isFullPage = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFull, setShowFull] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Text truncation logic
  const { content } = post;
  const isLong = content.length > 141;
  const isVeryLong = content.length > 545;
  let displayText = content;
  let showReadMore = false;
  let showReadFull = false;

  // If it's full page, always show full content without buttons
  if (isFullPage) {
    displayText = content;
  } else {
    if (isVeryLong) {
      if (!showFull) {
        displayText = content.slice(0, 141) + '...';
        showReadMore = true; // Show "อ่านเพิ่มเติม..." first
      } else {
        displayText = content.slice(0, 545) + (content.length > 545 ? '...' : '');
        showReadFull = true; // Show "อ่านฉบับเต็ม" after expanding
      }
    } else if (isLong) {
      if (!showFull) {
        displayText = content.slice(0, 141) + '...';
        showReadMore = true;
      }
    }
  }

  const handleReadFull = () => {
    // Get posts from location state or use allPosts prop
    const posts = location.state?.posts || allPosts;
    navigate(`/community-feed/${post.id}`, { 
      state: { posts } 
    });
  };

  // Card style
  const cardClass =
    'bg-white border border-border rounded-2xl shadow-sm px-6 py-5 my-6 mx-auto max-w-2xl w-full flex flex-col gap-4';

  // Tag style
  const tagClass =
    'px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mb-2 inline-block';

  // Comment bubble style
  const commentBubbleClass =
    'flex items-start gap-3 mb-3';
  const replyBubbleClass =
    'flex items-start gap-3 ml-10 mb-2 bg-blue-50 rounded-lg p-3';

  // Action bar
  const ActionBar = () => (
    <div className="flex items-center gap-6 text-muted-foreground text-sm mt-2">
      <button className="flex items-center gap-1 hover:text-primary">
        <Icon name="Heart" size={18} /> {post.likes}
      </button>
      <button className="flex items-center gap-1 hover:text-primary" onClick={() => setShowComments((v) => !v)}>
        <Icon name="MessageCircle" size={18} /> {post.comments.length}
      </button>
      <button className="flex items-center gap-1 hover:text-primary">
        <Icon name="Bookmark" size={18} />
      </button>
      <button className="flex items-center gap-1 hover:text-primary">
        <Icon name="Share2" size={18} />
      </button>
    </div>
  );

  // Comment section
  const CommentSection = () => (
    <div className="mt-3 bg-muted/30 rounded-xl px-4 py-3">
      {post.comments.length === 0 && (
        <div className="text-sm text-muted-foreground">ยังไม่มีความคิดเห็น</div>
      )}
      {post.comments.map((c, i) => (
        <div key={i} className={commentBubbleClass}>
          <img src={c.avatar} alt={c.author} className="w-8 h-8 rounded-full object-cover border" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground text-sm">{c.author}</span>
              <span className="text-xs text-muted-foreground">{c.time}</span>
            </div>
            <div className="text-sm text-foreground mt-1">{c.text}</div>
            {c.replies && c.replies.length > 0 && (
              <div className="mt-2">
                {c.replies.map((r, j) => (
                  <div key={j} className={replyBubbleClass}>
                    <img src={r.avatar} alt={r.author} className="w-7 h-7 rounded-full object-cover border" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-xs">{r.author}</span>
                        <span className="text-xs text-muted-foreground">{r.time}</span>
                      </div>
                      <div className="text-xs text-foreground mt-0.5">{r.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {/* Add comment box */}
      <div className="flex items-center gap-3 mt-4">
        <img src={post.currentUserAvatar} alt="me" className="w-8 h-8 rounded-full object-cover border" />
        <input
          className="flex-1 rounded-full border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="เขียนความคิดเห็น..."
        />
        <Button size="icon" variant="ghost">
          <Icon name="Send" size={18} />
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cardClass} style={{ boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground text-base">{post.author}</span>
            {post.verified && <Icon name="Star" size={16} className="text-success" />}
            <span className="text-xs text-muted-foreground">{post.role}</span>
          </div>
          <span className="text-xs text-muted-foreground">{post.time}</span>
        </div>
      </div>
      {/* Content */}
      <div>
        <div className="font-semibold text-lg text-foreground mb-1">{post.title}</div>
        <div className="text-sm text-foreground whitespace-pre-line">
          {displayText}
          {showReadMore && (
            <button className="ml-2 text-primary underline" onClick={() => setShowFull(true)}>อ่านเพิ่มเติม...</button>
          )}
          {showReadFull && (
            <button className="ml-2 text-primary underline" onClick={handleReadFull}>อ่านฉบับเต็ม</button>
          )}
        </div>
        {post.image && (
          <img src={post.image} alt="post" className="rounded-xl mt-3 w-full max-h-64 object-cover border" />
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <span key={i} className={tagClass}>{tag}</span>
          ))}
        </div>
      </div>
      {/* Action Bar */}
      <ActionBar />
      {/* Comments */}
      {showComments && <CommentSection />}
    </div>
  );
};

export default FeedCard; 