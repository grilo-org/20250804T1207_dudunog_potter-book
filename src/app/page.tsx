'use client'

import { Fragment } from 'react'
import { SearchSection } from '@/shared/components/search-section'
import { ActionsList } from '@/shared/components/actions-list'

export default function Home() {
	return (
		<Fragment>
			<q className="mt-2 text-md text-minimal">
				Palavras na minha não tão humilde opinião são nossa inesgotável fonte de
				magia.
			</q>

			<SearchSection />

			<ActionsList />
		</Fragment>
	)
}
