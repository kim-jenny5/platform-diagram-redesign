import type { Metadata } from 'next';
import { inter, degular, basier } from './fonts';
import './globals.css';

export const metadata: Metadata = {
	title: 'PlatformDiagram component redesign',
	description:
		'A redesign exploration of Rho’s PlatformDiagram component, reimagining how the interface communicates that the platform supports companies at every stage of growth. The goal is to make that progression clearer so users immediately understand how Rho scales with them over time.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${degular.variable} ${basier.variable} ${inter.variable}`}
		>
			<body>{children}</body>
		</html>
	);
}
