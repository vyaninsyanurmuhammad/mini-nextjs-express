import { useRouter } from "next/navigation";
import React from 'react';

const page = () => {
  const router = useRouter();

  return router.push('/dashboard/tickets');
};

export default page;
