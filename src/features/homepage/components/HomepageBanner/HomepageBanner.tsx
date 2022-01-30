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
        <div className="basis-full lg:basis-3/5 bg-gray-200 p-16 text-left rounded-lg">
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
          className="basis-full lg:basis-2/5 lg:-left-16 relative bg-blue-500 text-white p-16 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p>
            I&apos;m a self-taught developer with a passion for learning new
            technologies and solving problems.
          </p>
          <p>
            I&apos;m a big fan of the environment, beer and making cool things
            with code.
          </p>
          <div className="my-2">
            <p>
              <span role="img" aria-label="Briefcase" className="text-xl mr-2">
                💼
              </span>
              <span className="font-bold">Currently working at: </span>
              <a
                target="_blank"
                href="https://www.netcall.com/"
                rel="noopener noreferrer"
              >
                Netcall
              </a>
            </p>
            <p>
              <span role="img" aria-label="Learning" className="text-xl mr-2">
                🎓
              </span>
              <span className="font-bold">Currently learning: </span>
              <span className="font-bold">Go</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageBanner;
