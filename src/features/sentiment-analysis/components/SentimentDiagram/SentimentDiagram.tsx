import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface SentimentDiagramProps {
  score: number;
  size: 'sm' | 'lg';
}

const SentimentDiagram = (props: SentimentDiagramProps) => {
  const { score, size } = props;

  return (
    <section
      className={clsx('flex items-center mt-8', { 'mt-8': size === 'lg' })}
    >
      <div className="flex flex-col justify-center items-center">
        <span
          role="img"
          aria-label="Sad"
          className={clsx({
            'text-2xl lg:text-6xl': size === 'lg',
            'text-base': size === 'sm',
          })}
        >
          😢
        </span>
        {size === 'lg' && <span>Negative</span>}
      </div>
      <div
        className={clsx(
          'grow rounded bg-gradient-to-r from-red-500 to-green-500 relative shadow-lg',
          {
            'h-4': size === 'lg',
            'h-2': size === 'sm',
          }
        )}
      >
        <motion.div
          initial={{ left: '50%' }}
          animate={{
            left: `${(score + 1) * 50}%`,
          }}
          transition={{ duration: 0.5, bounce: 0.8 }}
          className={clsx(
            'rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black shadow-inner absolute',
            {
              'h-8 w-8': size === 'lg',
              'h-3 w-3': size === 'sm',
            }
          )}
        ></motion.div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span
          role="img"
          aria-label="Happy"
          className={clsx({
            'text-2xl lg:text-6xl': size === 'lg',
            'text-base': size === 'sm',
          })}
        >
          😁
        </span>
        {size === 'lg' && <span>Positive</span>}
      </div>
    </section>
  );
};

export default SentimentDiagram;
