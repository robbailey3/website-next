import { CSSProperties } from 'react';

type FlexContainerOptions = {
	direction: CSSProperties['flexDirection'];
	wrap: CSSProperties['flexWrap'];
	justify: CSSProperties['justifyContent'];
	align: CSSProperties['alignItems'];
};

type FlexContainerProps = {
	options?: Partial<FlexContainerOptions>;
	children: JSX.Element | JSX.Element[];
	className?: string;
};

const FlexContainer = (props: FlexContainerProps) => {
	const defaultOptions: FlexContainerOptions = {
		direction: 'row',
		wrap: 'nowrap',
		justify: 'flex-start',
		align: 'stretch'
	};
	const { options, children, className } = props;

	const flexOptions: FlexContainerOptions = { ...defaultOptions, ...options };

	return (
		<>
			<style jsx>{`
				div {
					display: flex;
					flex-direction: ${flexOptions.direction};
					flex-wrap: ${flexOptions.wrap};
					justify-content: ${flexOptions.justify};
					align-items: ${flexOptions.align};
				}
			`}</style>
			<div className={className}>{children}</div>
		</>
	);
};

export default FlexContainer;
