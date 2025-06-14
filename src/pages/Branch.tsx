
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BranchInfo from '@/components/branch/BranchInfo';
import BranchPerformance from '@/components/branch/BranchPerformance';
import BranchStaff from '@/components/branch/BranchStaff';
import BranchRevenue from '@/components/branch/BranchRevenue';
import BranchTargets from '@/components/branch/BranchTargets';
import BranchSettings from '@/components/branch/BranchSettings';

const Branch = () => {
  return (
    <div>
      <Routes>
        <Route index element={<BranchInfo />} />
        <Route path="info" element={<BranchInfo />} />
        <Route path="performance" element={<BranchPerformance />} />
        <Route path="staff" element={<BranchStaff />} />
        <Route path="revenue" element={<BranchRevenue />} />
        <Route path="targets" element={<BranchTargets />} />
        <Route path="settings" element={<BranchSettings />} />
      </Routes>
    </div>
  );
};

export default Branch;
