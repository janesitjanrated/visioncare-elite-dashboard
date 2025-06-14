
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FeedbackAll from '@/components/feedback/FeedbackAll';
import FeedbackRatings from '@/components/feedback/FeedbackRatings';
import FeedbackSuggestions from '@/components/feedback/FeedbackSuggestions';
import FeedbackAnalytics from '@/components/feedback/FeedbackAnalytics';
import FeedbackQuality from '@/components/feedback/FeedbackQuality';
import FeedbackHistory from '@/components/feedback/FeedbackHistory';

const Feedback = () => {
  return (
    <div>
      <Routes>
        <Route index element={<FeedbackAll />} />
        <Route path="all" element={<FeedbackAll />} />
        <Route path="ratings" element={<FeedbackRatings />} />
        <Route path="suggestions" element={<FeedbackSuggestions />} />
        <Route path="analytics" element={<FeedbackAnalytics />} />
        <Route path="quality" element={<FeedbackQuality />} />
        <Route path="history" element={<FeedbackHistory />} />
      </Routes>
    </div>
  );
};

export default Feedback;
