import styles from './container.module.scss';

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
}

const Container = (props: ContainerProps) => {
	const { children, className } = props;
	return (
		<div className={[styles.container, className].join(' ')}>
			{children}
		</div>
	)
};


export default Container;