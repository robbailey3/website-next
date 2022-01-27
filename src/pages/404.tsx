import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <>
      <h1 className="text-2xl">
        Oops!
        <span role="img" aria-label="Monkey covering eyes">
          🙈
        </span>
      </h1>
      <p>Looks like you&apos;re lost</p>
      <Link href={'/'}>
        <a className="my-4 text-tertiary underline block">
          Click here to go home
        </a>
      </Link>
    </>
  );
};

export default NotFoundPage;
