import { useRouter } from "next/navigation";
import React from 'react';

const ActiveTicket = () => {
  const router = useRouter();

  return router.push('/dashboard/tickets');
};

export default ActiveTicket;
