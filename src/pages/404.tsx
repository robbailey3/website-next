import Container from '@/components/common/Container/Container';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <>
      <Container>
        <div className="my-8 mx-auto p-4 rounded shadow text-center">
          <h1 className="text-4xl">
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
        </div>
      </Container>
    </>
  );
};

export default NotFoundPage;
