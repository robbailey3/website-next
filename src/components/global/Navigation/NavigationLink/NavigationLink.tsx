import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface NavigationLinkProps {
  text: string;
  href: string;
}

const NavigationLink = (props: NavigationLinkProps) => {
  const { text, href } = props;
  const router = useRouter();

  return (
    <li>
      <Link href={href}>
        <a
          href={href}
          className={clsx(
            'px-4 py-2 rounded-full block duration-200 hover:bg-gray-100',
            {
              'bg-blue-600 text-white hover:bg-blue-800':
                router.pathname === href,
            }
          )}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};

export default NavigationLink;
