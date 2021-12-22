import Link from 'next/link';
import React from 'react';

type NavigationLinkProps = {
  href: string;
  children: JSX.Element | JSX.Element[] | string;
};

const NavigationLink = (props: NavigationLinkProps) => {
  const { href, children } = props;

  const isApiRoute = () => href.startsWith('/api');

  return (
    <li className="block">
      {isApiRoute() ? (
        <a
          href={href}
          className="block p-4 no-underline duration-200 hover:bg-background-300 hover:bg-opacity-75"
        >
          {children}
        </a>
      ) : (
        <Link href={href}>
          <a className="block p-4 no-underline duration-200 hover:bg-background-300 hover:bg-opacity-75">
            {children}
          </a>
        </Link>
      )}
    </li>
  );
};

export default NavigationLink;
