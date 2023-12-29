import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const harryPotterFont = localFont({
	src: './fonts/harry.ttf',
	variable: '--font-harry-potter',
})
