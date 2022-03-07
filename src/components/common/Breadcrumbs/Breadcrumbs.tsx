import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Breadcrumbs = () => {
  const router = useRouter();

  const [segments, setSegments] = React.useState<string[]>([]);

  const getPathSegments = React.useCallback(() => {
    const path = router.asPath;
    const segments = path.split('/');
    return segments.filter((segment) => segment !== '');
  }, [router]);

  React.useEffect(() => {
    setSegments([...getPathSegments()]);
  }, [getPathSegments, router.pathname]);

  return (
    <div className="my-4">
      {segments.map((segment, i) => {
        return (
          <span key={`segment_${segment}_${i}`}>
            <Link href={`/${segments.slice(0, i + 1).join('/')}`}>
              <a
                href={`/${segments.slice(0, i + 1).join('/')}`}
                className="text-gray-400 italic"
              >
                {segment}
              </a>
            </Link>
            {i < segments.length - 1 && (
              <span className="text-blue-500 mx-2">/</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
