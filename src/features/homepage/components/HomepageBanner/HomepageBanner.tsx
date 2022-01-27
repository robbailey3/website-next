import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import mePng from '../../../../../public/me.png';

const HomepageBanner = () => {
  const sentenceAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.25,
        staggerChildren: 0.25,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const phrase = 'Hello!'.split('');

  return (
    <section>
      <div className="flex items-center h-screen">
        <div className="md:basis-3/5 bg-gray-200 p-8 text-left">
          <motion.h1
            variants={sentenceAnimation}
            className="text-8xl font-extrabold"
            initial="hidden"
            animate="visible"
          >
            {phrase.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                className={clsx({
                  'text-blue-500': index === phrase.length - 1,
                })}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <p>My name is Rob and I&apos;m a Software Engineer</p>
        </div>
        <div className="md:basis-2/5 -left-16 relative bg-blue-500 text-white p-16 pb-0">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            atque nostrum perferendis earum corrupti distinctio sequi. Minima
            vero nisi, quia inventore, unde adipisci, esse temporibus excepturi
            perspiciatis architecto harum ipsa!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomepageBanner;
