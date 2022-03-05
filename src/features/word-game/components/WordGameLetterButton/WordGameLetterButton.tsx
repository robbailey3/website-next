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
      className={clsx('p-2 border-none bg-gray-200 shadow mr-2', {
        'bg-gray-50 text-gray-200': disabled,
      })}
      disabled={disabled}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default WordGameLetterButton;
