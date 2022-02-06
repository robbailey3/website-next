import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';

const PageLoader = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setLoading(false);
    });
    router.events.on('routeChangeError', () => {
      setLoading(false);
    });
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
