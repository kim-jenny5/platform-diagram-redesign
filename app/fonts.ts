import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
});

export const degular = localFont({
	src: [
		{
			path: './fonts/degular-demo.woff2',
			weight: '400',
			style: 'normal'
		}
	],
	variable: '--font-degular',
	display: 'swap'
});

export const basier = localFont({
	src: [
		{
			path: './fonts/basier-demo.woff2',
			weight: '400',
			style: 'normal'
		}
	],
	variable: '--font-basier',
	display: 'swap'
});
