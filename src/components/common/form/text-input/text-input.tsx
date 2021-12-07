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
