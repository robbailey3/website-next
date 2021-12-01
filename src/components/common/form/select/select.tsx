import clsx from 'clsx';

type SelectProps = {
  name: string;
  label: string;
  id: string;
  options: Array<{ value: string; label: string }>;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLSelectElement>) => void;
  value: string;
  className?: string;
};

const Select = (props: SelectProps) => {
  const { name, label, id, options, onChange, value, className } = props;
  return (
    <div className={clsx('block', className)}>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onChange}
        className="px-1 py-2 bg-background-600 border border-light-900 rounded-sm block w-full"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
