import clsx from 'clsx';

export interface WordGameLetterButton {
  letter: string;
  disabled: boolean;
  onClick: () => void;
}

const WordGameLetterButton = (props: WordGameLetterButton) => {
  const { letter, onClick, disabled } = props;

  return (
    <button
      onClick={onClick}
      className={clsx(
        'p-1 md:p-2 border-none bg-gray-100 shadow mr-2 hover:bg-gray-200 duration-200',
        {
          'bg-gray-300 text-gray-400': disabled,
        }
      )}
      disabled={disabled}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default WordGameLetterButton;
