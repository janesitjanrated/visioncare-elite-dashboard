import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import FeedCard from './components/FeedCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const mockPosts = [
  {
    id: 123456789012345678901234567890,
    author: 'Dr. Sarah Mitchell',
    verified: true,
    role: 'Ophthalmologist',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '2 hours ago',
    title: 'Complex Retinal Detachment Case',
    content:
      '45-year-old patient presenting with sudden vision loss in left eye. Fundoscopy reveals extensive retinal detachment with multiple tears. Seeking peer consultation on surgical approach.',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    tags: ['Retinal Surgery', 'Emergency', 'Consultation'],
    likes: 24,
    comments: [
      {
        author: 'Dr. Lisa Kim',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        time: '2 ชม.ที่แล้ว',
        text: 'ขอบคุณที่แชร์เคสนี้ค่ะ! น่าสนใจมาก',
        replies: [
          {
            author: 'Dr. Sarah Mitchell',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            time: '1 ชม.ที่แล้ว',
            text: 'ยินดีค่ะ! ถ้ามีข้อเสนอแนะเพิ่มเติมบอกได้เลยนะคะ',
          },
        ],
      },
      {
        author: 'Dr. John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        time: '2 ชม.ที่แล้ว',
        text: 'เคสนี้คล้ายกับที่ผมเคยเจอเลยครับ',
        replies: [],
      },
    ],
    currentUserAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 987654321098765432109876543210,
    author: 'Dr. Michael Chen',
    verified: true,
    role: 'Optometrist',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    time: '4 hours ago',
    title: 'Unusual Corneal Dystrophy Pattern',
    content:
      '28-year-old patient with bilateral corneal opacity showing unique pattern. Family history negative. Looking for similar cases and treatment recommendations. This is a very detailed case study that requires extensive analysis and peer review. The patient has been experiencing symptoms for over 6 months with no clear diagnosis from previous consultations. Our team has conducted multiple tests including corneal topography, pachymetry, and genetic screening. The results show a unique pattern that we have not encountered before in our practice. We are seeking input from specialists who may have experience with similar cases. The patient is currently 28 years old with no family history of corneal diseases, which makes this case particularly interesting from a genetic perspective. We have also consulted with geneticists who are equally puzzled by the pattern. The patient is very cooperative and willing to participate in further studies if needed. We believe this case could contribute significantly to the medical literature and help other practitioners who might encounter similar patterns in the future.',
    image: 'https://images.pexels.com/photos/8460155/pexels-photo-8460155.jpeg',
    tags: ['Corneal Disease', 'Rare Case', 'Genetics'],
    likes: 18,
    comments: [
      {
        author: 'Dr. Emily Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
        time: '3 ชม.ที่แล้ว',
        text: 'เคสนี้น่าสนใจมากค่ะ ขอรอติดตามผลการรักษา',
        replies: [],
      },
    ],
    currentUserAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 555666777888999000111222333444,
    author: 'Dr. Emily Rodriguez',
    verified: true,
    role: 'Pediatric Ophthalmologist',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    time: '6 hours ago',
    title: 'Pediatric Amblyopia Treatment Progress',
    content:
      '7-year-old patient showing excellent response to patching therapy. Visual acuity improved from 20/80 to 20/40 in 3 months. Sharing successful treatment approach and follow-up plan for discussion.',
    image: '',
    tags: ['Pediatric', 'Amblyopia', 'Treatment'],
    likes: 12,
    comments: [],
    currentUserAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
];

const mockAINews = [
  {
    id: 111222333444555666777888999000,
    author: 'AI News Assistant',
    verified: true,
    role: 'AI News Curator',
    avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop',
    time: 'This morning',
    title: 'Breakthrough in Gene Therapy for Retinal Diseases',
    content:
      'Researchers at Johns Hopkins University have announced a significant breakthrough in gene therapy for inherited retinal diseases. The new treatment targets specific genetic mutations that cause conditions like retinitis pigmentosa and Leber congenital amaurosis. Clinical trials involving 45 patients showed promising results, with 60% of participants experiencing improved visual function. The therapy uses a novel viral vector delivery system that more effectively targets retinal cells. Dr. Sarah Johnson, lead researcher, stated that this could potentially restore vision in patients who were previously considered untreatable. The FDA has granted fast-track designation for this therapy, and phase 3 trials are expected to begin next year. This development represents a major step forward in treating previously incurable genetic eye conditions.',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    tags: ['Gene Therapy', 'Research', 'Breakthrough'],
    likes: 156,
    comments: [
      {
        author: 'Dr. Lisa Kim',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        time: '1 ชม.ที่แล้ว',
        text: 'นี่เป็นข่าวที่น่าตื่นเต้นมาก! ขอรอติดตามผลการทดลองระยะที่ 3',
        replies: [],
      },
    ],
    currentUserAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 222333444555666777888999000111,
    author: 'AI News Assistant',
    verified: true,
    role: 'AI News Curator',
    avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop',
    time: 'Yesterday',
    title: 'New AI-Powered Diagnostic Tool for Glaucoma Detection',
    content:
      'A team of researchers from Stanford University has developed an AI-powered diagnostic tool that can detect early signs of glaucoma with 94% accuracy. The system uses deep learning algorithms to analyze retinal images and identify subtle changes that may indicate the onset of glaucoma. The tool was trained on over 100,000 retinal images from diverse patient populations. Early detection is crucial for glaucoma treatment, as the disease often progresses silently until significant vision loss occurs. The new AI system can detect changes up to 2 years before traditional diagnostic methods. Dr. Michael Chen, ophthalmologist at Stanford, explains that this tool could revolutionize glaucoma screening programs, especially in areas with limited access to specialist care. The technology is currently being evaluated for FDA approval and could be available for clinical use within the next 18 months.',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    tags: ['AI', 'Glaucoma', 'Diagnostic'],
    likes: 89,
    comments: [],
    currentUserAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 333444555666777888999000111222,
    author: 'AI News Assistant',
    verified: true,
    role: 'AI News Curator',
    avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop',
    time: '2 days ago',
    title: 'Global Study Reveals Increasing Myopia Rates in Children',
    content:
      'A comprehensive global study involving over 2.5 million children across 45 countries has revealed alarming trends in myopia rates. The research, published in the Journal of Ophthalmology, shows that myopia rates have increased by 23% over the past decade, with the most significant increases in East Asian countries. The study attributes this rise to increased screen time, reduced outdoor activities, and changing educational demands. Dr. Emily Rodriguez, pediatric ophthalmologist and study co-author, emphasizes the importance of early intervention. "We need to implement comprehensive strategies that include increased outdoor time, proper lighting, and regular eye exams," she says. The study also found that children who spend at least 2 hours outdoors daily have a 30% lower risk of developing myopia. These findings have prompted several countries to revise their public health guidelines for children\'s eye health.',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    tags: ['Myopia', 'Children', 'Global Study'],
    likes: 234,
    comments: [
      {
        author: 'Dr. John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        time: '1 วันที่แล้ว',
        text: 'ผลการศึกษานี้สอดคล้องกับสิ่งที่เราเห็นในคลินิกจริงๆ',
        replies: [],
      },
    ],
    currentUserAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
];

const CommunityFeedPage = () => {
  const { user: authUser, userProfile } = useAuth();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [activeTab, setActiveTab] = useState('community'); // 'community' or 'ai-news'

  // Use authenticated user data
  const user = authUser ? {
    id: authUser.id,
    name: authUser.name || userProfile?.name || "User",
    email: authUser.email,
    role: authUser.role || "staff",
    avatar: userProfile?.avatar || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face"
  } : {
    id: 1,
    name: "Demo User",
    email: "demo@clinicvision.com",
    role: "staff",
    avatar: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face"
  };

  // Mock branches data
  const branches = [
    {
      id: 1,
      name: "EyeCare Pro - Main Clinic",
      address: "123 Vision Street, Medical District",
      status: "active"
    }
  ];

  useEffect(() => {
    if (branches.length > 0 && !selectedBranch) {
      setSelectedBranch(branches[0]);
    }
  }, [branches, selectedBranch]);

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const currentPosts = activeTab === 'community' ? mockPosts : mockAINews;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader
        user={user}
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        onToggleSidebar={handleToggleSidebar}
        sidebarExpanded={sidebarExpanded}
      />

      {/* Sidebar */}
      <RoleBasedSidebar
        user={user}
        isExpanded={sidebarExpanded}
        onToggle={handleToggleSidebar}
      />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarExpanded ? 'lg:ml-60' : 'lg:ml-16'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
                  Community Feed
            </h1>
            <p className="text-muted-foreground">
                  Stay connected with your community through news, updates, and announcements.
            </p>
          </div>

              <div className="flex items-center space-x-3">
                {activeTab === 'community' && (
                  <Button variant="outline" iconName="Plus" iconPosition="left">
                    Create Post
                  </Button>
                )}
                <Button variant="default" iconName="RefreshCw" iconPosition="left">
                  Refresh Feed
                </Button>
              </div>
            </div>

            {/* Branch Info */}
            {selectedBranch && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Building2" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Viewing: {selectedBranch.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    • {selectedBranch.address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Tab Menu */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => handleTabChange('community')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'community'
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>Community Posts</span>
                </div>
              </button>
                  <button
                onClick={() => handleTabChange('ai-news')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'ai-news'
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Zap" size={16} />
                  <span>AI News Feed</span>
                </div>
                  </button>
            </div>
          </div>

          {/* Feed Content */}
          <div className="bg-card border border-border rounded-lg p-6">
            {activeTab === 'ai-news' && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">AI News Assistant</span>
              </div>
                <p className="text-sm text-blue-700">
                  ข่าวสารทางการแพทย์ที่ AI คัดสรรมาให้คุณทุกเช้า อัพเดทล่าสุดเมื่อ {new Date().toLocaleDateString('th-TH')}
                </p>
              </div>
            )}

            {currentPosts.map((post) => (
              <FeedCard key={post.id} post={post} allPosts={currentPosts} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityFeedPage;