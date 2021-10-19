type ContainerProps = {
	children: React.ReactNode;
	className?: string;
}

const Container = (props: ContainerProps) => {
	const { children, className } = props;
	return (
		<div className={['container', className].join(' ')}>
			{children}
		</div>
	)
};


export default Container;