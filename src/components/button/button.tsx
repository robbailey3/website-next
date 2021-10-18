import { MouseEventHandler } from 'react';

type ButtonProps = {
	variant?: 'primary' | 'secondary' | 'tertiary';
	children: JSX.Element | string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: ButtonProps) => {
	const { variant = 'primary', onClick, children } = props;
	return <button onClick={onClick}></button>;
};

export default Button;
