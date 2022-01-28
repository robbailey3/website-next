import clsx from 'clsx';
import { motion } from 'framer-motion';

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
      <div className="flex items-center flex-wrap md:h-screen">
        <div className="basis-full md:basis-3/5 bg-gray-200 p-16 text-left rounded-lg">
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
          <motion.p
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            My name is Rob and I&apos;m a Software Engineer
          </motion.p>
        </div>
        <motion.div
          className="basis-full md:basis-2/5 md:-left-16 relative bg-blue-500 text-white p-16 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p>
            Full-Stack developer working mainly with TypeScript, React, Vue and
            C#.
          </p>
          <p>
            I&apos;m a self-taught developer with a passion for learning new
            technologies and solving problems.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            accusamus! Nobis incidunt modi ea dicta fuga eaque molestiae odio,
            commodi necessitatibus placeat sequi recusandae corporis repudiandae
            enim sed maxime ducimus!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageBanner;
