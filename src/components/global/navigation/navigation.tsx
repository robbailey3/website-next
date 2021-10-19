import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';
import { fromEvent, map, Subscription, throttleTime } from 'rxjs';
import clsx from 'clsx';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		let windowResizeSubscription: Subscription;
		if (typeof window !== 'undefined') {
			windowResizeSubscription = fromEvent(window, 'resize')
				.pipe(
					throttleTime(500),
					map(($event: Event) => ($event.target as Window).innerWidth || 0)
				)
				.subscribe({
					next: $event => {
						if ($event < 768) {
							setIsOpen(false);
						} else {
							setIsOpen(true);
						}
					}
				});
		}
		return () => {
			if (windowResizeSubscription) {
				windowResizeSubscription.unsubscribe();
			}
		};
	});

	return (
		<nav className={clsx(styles.navigation, { [styles.navigation__open]: isOpen })}>
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
