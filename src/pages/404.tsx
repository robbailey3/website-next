import Card from '@/components/common/layout/card/card';
import Container from '@/components/common/layout/container/container';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <Container className="inline-block w-full">
      <div className="flex w-full justify-center items-center my-16">
        <Card className="p-4 text-center">
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
        </Card>
      </div>
    </Container>
  );
};

export default NotFoundPage;
