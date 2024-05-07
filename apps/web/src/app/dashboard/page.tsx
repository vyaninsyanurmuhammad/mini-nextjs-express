'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const DashboardPage = () => {
  const router = useRouter();

  return router.push('/dashboard/profile');
};

export default DashboardPage;
