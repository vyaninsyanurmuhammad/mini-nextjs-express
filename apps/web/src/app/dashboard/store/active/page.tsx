import { useRouter } from "next/navigation";
import React from 'react';

const ProductActiveStore = () => {
  const router = useRouter();

  return router.push('/dashboard/store');
};

export default ProductActiveStore;
