import { useUser } from '@auth0/nextjs-auth0';
import clsx from 'clsx';
import React from 'react';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
  throttleTime,
} from 'rxjs';
import NavigationLink from './NavigationLink/NavigationLink';

const Navigation = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(true);

  const { user } = useUser();

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const isLoggedIn = (): boolean => {
    return !!user;
  };

  const handleNavLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsOpen(false);
      }
    }
    let $resizeSubscription: Subscription;
    if (typeof window != undefined) {
      $resizeSubscription = fromEvent(window, 'resize')
        .pipe(
          map(() => window.innerWidth),
          throttleTime(250),
          distinctUntilChanged()
        )
        .subscribe({
          next: (width) => {
            setIsMobile(width < 768);
            if (width > 768) {
              setIsOpen(true);
            }
          },
        });
    }

    return () => {
      if ($resizeSubscription) {
        $resizeSubscription.unsubscribe();
      }
    };
  }, []);

  return (
    <section>
      {typeof window !== undefined && isMobile && (
        <button
          onClick={toggleNavigation}
          className="w-10 h-10 p-2 hover:bg-gray-100 rounded-full"
        >
          <span className="sr-only">Toggle Navigation</span>
          <span
            className={clsx(
              'w-full h-0.5 block bg-black relative duration-200',
              {
                'transform -rotate-45': isOpen,
              }
            )}
          ></span>
          <span
            className={clsx('w-full h-0.5 block bg-black mt-2 relative', {
              hidden: isOpen,
            })}
          ></span>
          <span
            className={clsx(
              'w-full h-0.5 block bg-black mt-2 relative duration-200',
              {
                'transform rotate-45 mt-0 -top-0.5': isOpen,
              }
            )}
          ></span>
        </button>
      )}
      <nav
        className={clsx({
          'absolute w-full top-full left-0 shadow rounded-lg bg-white':
            isMobile,
        })}
      >
        <ul
          className={clsx('md:space-x-4', {
            'flex-col space-y-2 mt-8 p-4': isOpen && isMobile,
            flex: isOpen && !isMobile,
            hidden: !isOpen && isMobile,
          })}
        >
          {isLoggedIn() ? (
            <>
              <NavigationLink
                text="Admin Home"
                href="/admin"
                onClick={handleNavLinkClick}
              />
              <NavigationLink
                text="Photos"
                href="/admin/photos"
                onClick={handleNavLinkClick}
              />
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/api/auth/logout"
                onClick={handleNavLinkClick}
                className={clsx(
                  'px-4 py-2 rounded-full block duration-200 hover:bg-gray-100'
                )}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <NavigationLink
                text="Home"
                href="/"
                onClick={handleNavLinkClick}
              />
              <NavigationLink
                text="GitHub"
                href="/github/robbailey3"
                onClick={handleNavLinkClick}
              />
              <NavigationLink
                text="Photos"
                href="/photos"
                onClick={handleNavLinkClick}
              />
              <NavigationLink
                text="Projects"
                href="/projects"
                onClick={handleNavLinkClick}
              />
              <NavigationLink
                text="CV"
                href="/cv"
                onClick={handleNavLinkClick}
              />
            </>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default Navigation;
