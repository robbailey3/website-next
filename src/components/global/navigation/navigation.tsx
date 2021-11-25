import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { useRouter } from 'next/router';
import clsx from 'clsx';

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
        <button
          onClick={toggleNavigation}
          className="relative py-4 px-2"
          data-cy="navigationToggle"
        >
          <p className="sr-only">Toggle Navigation</p>
          <span className="h-0.5 w-8 bg-accent-50 relative block mt-0.5"></span>
          <span className="h-0.5 w-8 bg-accent-50 relative block mt-2"></span>
          <span className="h-0.5 w-8 bg-accent-50 relative block mt-2"></span>
        </button>
      )}
      <ul
        className={clsx('md:flex list-none', {
          'block absolute right-0 top-full w-full text-center shadow-lg rounded backdrop-filter backdrop-blur bg-background-300 bg-opacity-95':
            isOpen,
          hidden: !isOpen,
        })}
      >
        <li className="block">
          <Link href="/">
            <a className="block p-4 no-underline duration-200 hover:bg-background-300 hover:bg-opacity-75">
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="block p-4 no-underline duration-200 hover:bg-background-300 hover:bg-opacity-75">
              About
            </a>
          </Link>
        </li>
        <li>
          <Link href="/github">
            <a className="block p-4 no-underline duration-200 hover:bg-background-300 hover:bg-opacity-75">
              GitHub
            </a>
          </Link>
        </li>
        {/* <li>
          <Link href="/">
            <a className="block p-4 no-underline duration-200 hover:bg-background-300 hover:bg-opacity-75">Projects</a>
          </Link>
        </li> */}
        <li>
          <Link href="/cv">
            <a className="block p-4 no-underline duration-200 hover:bg-background-300 hover:bg-opacity-75">
              CV
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
