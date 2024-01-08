import type { Metadata } from 'next'
import Link from 'next/link'
import { inter } from '@/fonts'
import Providers from '@/app/Providers'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
	title: 'Harry Potter World',
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
				<Providers>
					<div className="mt-8 max-w-7xl px-4 w-full flex flex-col items-center">
						<Link href="/">
							<h1
								className={cn(
									// harryPotterFont.className,
									'text-[5rem] text-minimal text-center leading-none',
								)}
							>
								Harry Potter World
							</h1>
						</Link>

						{children}
					</div>
				</Providers>
			</body>
		</html>
	)
}
