import type { Metadata } from 'next'
import { inter } from './fonts'
import { cn } from '@/lib/utils'
import './globals.css'
import Providers from './Providers'

export const metadata: Metadata = {
	title: 'Potter World',
	description: '',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'w-full flex justify-center')}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
