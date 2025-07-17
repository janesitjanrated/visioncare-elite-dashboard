import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunityFeed = () => {
  const feedItems = [
    {
      id: 1,
      type: 'news',
      title: 'New FDA Regulations for Contact Lens Fitting',
      excerpt: 'Updated guidelines for contact lens prescriptions and patient safety protocols effective January 2025.',
      author: 'ClinicVision Pro Team',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
      category: 'Regulatory'
    },
    {
      id: 2,
      type: 'update',
      title: 'Feature Update: Enhanced Inventory Management',
      excerpt: 'New automated reorder system and supplier integration now available in your dashboard.',
      author: 'Product Team',
      time: '1 day ago',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=400&h=200&fit=crop',
      category: 'Product Update'
    },
    {
      id: 3,
      type: 'industry',
      title: 'Optical Industry Trends: Digital Eye Strain Solutions',
      excerpt: 'Growing demand for blue light filtering lenses and computer vision syndrome treatments.',
      author: 'Industry Insights',
      time: '3 days ago',
      image: 'https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg?w=400&h=200&fit=crop',
      category: 'Industry News'
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Regulatory': 'bg-error/10 text-error',
      'Product Update': 'bg-primary/10 text-primary',
      'Industry News': 'bg-accent/10 text-accent'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Community Feed</h3>
          <p className="text-sm text-muted-foreground">Industry news and updates</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-hover">
          View all posts
        </button>
      </div>
      <div className="space-y-6">
        {feedItems.map((item) => (
          <article key={item.id} className="group cursor-pointer">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover group-hover:opacity-80 transition-opacity"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">By {item.author}</span>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Icon name="Heart" size={14} />
                      <span className="text-xs">12</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Icon name="MessageCircle" size={14} />
                      <span className="text-xs">5</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Icon name="Share2" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;