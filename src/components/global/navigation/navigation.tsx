import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import clsx from 'clsx';
import { useRouter } from 'next/router';

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
          className={styles.button}
          data-cy="navigationToggle"
        >
          <p className="sr-only">Toggle Navigation</p>
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/github">
            <a>GitHub</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/">
            <a>Projects</a>
          </Link>
        </li> */}
        <li>
          <Link href="/cv">
            <a>CV</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
