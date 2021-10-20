import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';
import { fromEvent, map, Subscription, throttleTime } from 'rxjs';
import clsx from 'clsx';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [currentWindowSize, setCurrentWindowSize] = useState(0);

	useEffect(() => {
		let windowResizeSubscription: Subscription;
		if (typeof window !== 'undefined') {
			setCurrentWindowSize(window.innerWidth);
			windowResizeSubscription = fromEvent(window, 'resize')
				.pipe(
					throttleTime(500),
					map(
						($event: Event) =>
							($event.target as Window).innerWidth || 0
					)
				)
				.subscribe({
					next: (windowSize) => {
						setCurrentWindowSize(windowSize);
					},
				});
		}
		return () => {
			if (windowResizeSubscription) {
				windowResizeSubscription.unsubscribe();
			}
		};
	});

	const toggleNavigation = () => {
		setIsOpen(!isOpen);
	};

	const isMobileDevice = () => currentWindowSize < 768;

	return (
		<nav
			className={clsx(styles.navigation, {
				[styles.navigation__open]: isOpen || !isMobileDevice(),
			})}
		>
			{isMobileDevice() && (
				<button onClick={toggleNavigation}>Toggle Navigation</button>
			)}
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a>About</a>
					</Link>
				</li>
				<li>
					<Link href="/github">
						<a>GitHub</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a>Projects</a>
					</Link>
				</li>
				<li>
					<Link href="/">
						<a>CV</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
