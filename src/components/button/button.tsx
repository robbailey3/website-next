import { MouseEventHandler } from 'react';

type ButtonProps = {
	variant?: 'primary' | 'secondary' | 'tertiary';
	children: JSX.Element | string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: ButtonProps) => {
	const { variant = 'primary', onClick, children } = props;

	const getButtonClass = (): string => {
		switch (variant) {
			case 'primary':
				return 'button--primary';
			case 'secondary':
				return 'button--secondary';
			case 'tertiary':
				return 'button--tertiary';
			default:
				return 'button--primary';
		}
	};

	return (
		<button onClick={onClick} className={getButtonClass()}>
			{children}
		</button>
	);
};

export default Button;
