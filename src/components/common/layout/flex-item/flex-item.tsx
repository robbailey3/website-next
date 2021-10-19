import { CSSProperties } from 'react';

type FlexItemOptions = {
	grow?: number;
	shrink?: number;
	basis?: CSSProperties['flexBasis'];
};

type FlexItemProps = {
	options?: Partial<FlexItemOptions>;
	className?: string;
	children: JSX.Element | JSX.Element[];
};

const FlexItem = (props: FlexItemProps) => {
	const defaultOptions: FlexItemOptions = {
		grow: 0,
		shrink: 0,
		basis: 'auto',
	};
	const { options, children, className } = props;

	const flexOptions: FlexItemOptions = { ...defaultOptions, ...options };

	return (
		<>
			<style jsx>{`
				div {
					flex-grow: ${flexOptions.grow};
					flex-shrink: ${flexOptions.shrink};
					flex-basis: ${flexOptions.basis};
				}
			`}</style>
			<div className={className}>{children}</div>
		</>
	);
};

export default FlexItem;
