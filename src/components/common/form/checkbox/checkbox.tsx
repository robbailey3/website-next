type CheckboxProps = {
  id: string;
  name?: string;
  checked: boolean;
  onChange: () => void;
  label: string;
};

const Checkbox = (props: CheckboxProps) => {
  const { id, name, checked, onChange, label } = props;

  return (
    <div className="block">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
