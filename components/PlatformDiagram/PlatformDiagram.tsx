'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import styles from './PlatformDiagram.module.scss';

interface UseCase {
	id: string;
	label: string;
	desc: string;
	chips: string[];
	dot: { x: number; y: number };
}

const USE_CASES: UseCase[] = [
	{
		id: 'runway',
		label: 'Extend your runway',
		desc: 'Earn yield on idle cash and keep more of your funding working between raises.',
		chips: ['Checking Accounts', 'Savings Accounts', 'Treasury Accounts'],
		dot: { x: 23, y: 80 }
	},
	{
		id: 'spend',
		label: 'Control spend early',
		desc: 'Set limits and approval workflows before expenses scale with your growing team.',
		chips: ['Rho Cards', 'Expense Management', 'Bill Pay'],
		dot: { x: 38, y: 62 }
	},
	{
		id: 'scale',
		label: 'Scale finance operations',
		desc: 'Automate reconciliation and transaction syncing so finance keeps pace with company growth.',
		chips: ['Accounting Integrations', 'Bill Pay', 'Expense Management'],
		dot: { x: 52, y: 28 }
	},
	{
		id: 'standardize',
		label: 'Standardize company spend',
		desc: 'Create consistent workflows across teams while maintaining centralized oversight.',
		chips: ['Rho Cards', 'Expense Management', 'Approval Workflows'],
		dot: { x: 65, y: 57 }
	},
	{
		id: 'consolidate',
		label: 'Consolidate your finance stack',
		desc: 'Bring banking, cards, bill pay, and accounting workflows together in one platform.',
		chips: [
			'Checking Accounts',
			'Rho Cards',
			'Bill Pay',
			'Accounting Integrations'
		],
		dot: { x: 77, y: 76 }
	}
];

const HEADING_BLOCK = [
	{
		_type: 'block',
		_key: 'heading',
		style: 'normal',
		children: [
			{ _type: 'span', _key: 'a', text: 'A ', marks: ['muted'] },
			{ _type: 'span', _key: 'b', text: 'single platform ', marks: [] },
			{ _type: 'span', _key: 'c', text: 'for', marks: ['muted'] },
			{ _type: 'span', _key: 'br', text: '\n', marks: [] },
			{
				_type: 'span',
				_key: 'd',
				text: 'all your banking needs.',
				marks: ['muted']
			}
		],
		markDefs: []
	}
];

const headingComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => <h2 className={styles.heading}>{children}</h2>
	},
	marks: {
		muted: ({ children }) => (
			<span className={styles.headingMuted}>{children}</span>
		)
	}
};

const SCALE = 1.18;

export default function PlatformDiagram() {
	const [active, setActive] = useState(0);
	const [fading, setFading] = useState(false);

	const wrapRef = useRef<HTMLDivElement>(null);
	const areaRef = useRef<HTMLDivElement>(null);

	const buildTransform = useCallback(
		(pctX: number, pctY: number, s: number): string => {
			if (!areaRef.current) return `translate(0px, 0px) scale(${s})`;
			const W = areaRef.current.offsetWidth;
			const H = areaRef.current.offsetHeight;
			const dx = ((pctX / 100) * W * (1 - s)) / s;
			const dy = ((pctY / 100) * H * (1 - s)) / s;
			return `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${s})`;
		},
		[]
	);

	const switchTo = useCallback(
		(index: number, instant = false) => {
			const next =
				((index % USE_CASES.length) + USE_CASES.length) % USE_CASES.length;
			const uc = USE_CASES[next];

			if (wrapRef.current) {
				wrapRef.current.style.transform = buildTransform(
					uc.dot.x,
					uc.dot.y,
					SCALE
				);
			}

			if (instant) {
				setActive(next);
				return;
			}

			setFading(true);
			setTimeout(() => {
				setActive(next);
				setFading(false);
			}, 180);
		},
		[buildTransform]
	);

	useEffect(() => {
		switchTo(0, true);
	}, [switchTo]);

	const current = USE_CASES[active];

	return (
		<section className={styles.root}>
			<header className={styles.TextHeader}>
				<div className={styles.TextHeaderWrapper}>
					<PortableText value={HEADING_BLOCK} components={headingComponents} />
					<div className={styles.ActionWrapper}>
						<p className={styles.content}>
							Once you've opened your business banking accounts, get set up with
							the rest of the essentials.
						</p>
						<Link href='/request-a-demo' className={styles.cta}>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<div className={styles.mountainArea} ref={areaRef}>
				<div className={styles.wrap} ref={wrapRef}>
					<Image
						src='/images/mountain.png'
						alt='Mountain'
						fill
						className={styles.mountainImg}
						priority
					/>
					{USE_CASES.map((uc, i) => (
						<button
							key={uc.id}
							className={[
								styles.pulsePoint,
								i === active
									? styles.pulsePointActive
									: styles.pulsePointInactive
							].join(' ')}
							style={{ left: `${uc.dot.x}%`, top: `${uc.dot.y}%` }}
							onClick={() => switchTo(i)}
							aria-label={`View ${uc.label}`}
						>
							<span className={styles.ring} />
							<span className={`${styles.ring} ${styles.ring2}`} />
							<span className={styles.dot} />
						</button>
					))}
				</div>
				<div className={styles.fadeBottom} aria-hidden='true' />
			</div>
			<div className={styles.contentArea}>
				<div className={styles.navRow}>
					<button
						className={styles.arrowBtn}
						onClick={() => switchTo(active - 1)}
						aria-label='Previous use case'
					>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							strokeWidth='1.8'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<polyline points='15 18 9 12 15 6' />
						</svg>
					</button>
					<div
						className={[styles.contentInner, fading ? styles.fading : ''].join(
							' '
						)}
					>
						<h3 className={styles.useCaseLabel}>{current.label}</h3>
					</div>
					<button
						className={styles.arrowBtn}
						onClick={() => switchTo(active + 1)}
						aria-label='Next use case'
					>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							strokeWidth='1.8'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<polyline points='9 18 15 12 9 6' />
						</svg>
					</button>
				</div>
				<div
					className={[styles.contentInner, fading ? styles.fading : ''].join(
						' '
					)}
				>
					<p className={styles.useCaseDesc}>{current.desc}</p>
					<div className={styles.chipsRow}>
						{current.chips.map((chip) => (
							<span key={chip} className={styles.chip}>
								<span className={styles.chipDot} />
								{chip}
							</span>
						))}
					</div>
				</div>
				<div className={styles.pagination} role='tablist'>
					{USE_CASES.map((uc, i) => (
						<button
							key={uc.id}
							role='tab'
							aria-selected={i === active}
							aria-label={uc.label}
							className={[
								styles.pagDot,
								i === active ? styles.pagDotActive : ''
							].join(' ')}
							onClick={() => switchTo(i)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
