import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';

const PageLoader = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading ? (
    <motion.div
      className="fixed h-screen w-screen bg-white flex justify-center items-center bg-opacity-10 filter backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="spinner-border animate-spin inline-block w-32 h-32 border-8 border-blue-600 border-r-transparent rounded-full"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </motion.div>
  ) : null;
};

export default PageLoader;
