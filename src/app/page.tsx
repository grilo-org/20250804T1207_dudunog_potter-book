'use client'

import { SearchSection } from '@/app/components/search-section'
import { ActionsList } from '@/app/components/actions-list'

export default function Home() {
	return (
		<>
			<q className="mt-2 text-md text-minimal">
				Palavras na minha não tão humilde opinião são nossa inesgotável fonte de
				magia.
			</q>

			<SearchSection />

			<ActionsList />
		</>
	)
}
