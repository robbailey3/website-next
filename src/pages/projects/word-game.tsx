import Container from '@/components/common/Container/Container';
import WordGame from '@/features/word-game/components/WordGame/WordGame';
import Head from 'next/head';

const WordGamePage = () => {
  return (
    <>
      <Head>
        <title>Word Game / Projects / Rob Bailey</title>
        <meta
          name="description"
          content="A clone of a particular word game which is very popular at the moment"
        />
      </Head>
      <Container>
        <WordGame />
      </Container>
    </>
  );
};

export default WordGamePage;
