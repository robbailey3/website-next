import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

type TextInputProps = {
  label: string;
  value: string;
  id: string;
  name: string;
  onChange?: ($event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: ($event: FocusEvent<HTMLInputElement>) => void;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
};

const TextInput = (props: TextInputProps) => {
  const { label, value, onChange, onBlur, type, id, name } = props;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className="px-1 py-2 bg-background-600 border border-light-900 rounded-sm block w-full"
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextInput;
