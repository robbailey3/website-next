import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import NavigationButton from './navigation-button/navigation-button';
import NavigationLink from './navigation-link/navigation-link';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const [currentWindowSize, setCurrentWindowSize] = useState(0);

  const handleRouteChangeComplete = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    let windowResizeSubscription: Subscription;
    if (typeof window !== 'undefined') {
      setCurrentWindowSize(window.innerWidth);
      windowResizeSubscription = fromEvent(window, 'resize')
        .pipe(
          debounceTime(500),
          map(($event: Event) => ($event.target as Window).innerWidth || 0)
        )
        .subscribe({
          next: (windowSize) => {
            setCurrentWindowSize(windowSize);
          },
        });
    }
    return () => {
      if (windowResizeSubscription) {
        windowResizeSubscription.unsubscribe();
      }
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const isMobileDevice = () => currentWindowSize < 768;

  return (
    <nav data-cy="navigation" className="ml-auto">
      {isMobileDevice() && (
        <NavigationButton onClick={toggleNavigation} isOpen={isOpen} />
      )}
      <ul
        className={clsx('md:flex list-none', {
          'block absolute right-0 top-full w-full text-center shadow-lg rounded backdrop-filter backdrop-blur bg-background-300 bg-opacity-95':
            isOpen,
          hidden: !isOpen,
        })}
      >
        <NavigationLink href="/">Home</NavigationLink>
        <NavigationLink href="/about">About</NavigationLink>
        <NavigationLink href="/github">GitHub</NavigationLink>
        <NavigationLink href="/cv">CV</NavigationLink>
      </ul>
    </nav>
  );
};

export default Navigation;
