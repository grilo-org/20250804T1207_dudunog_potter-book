'use client'

import { PotionsList } from '@/app/potions/components/potions-list'

export default function Potions() {
	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Poções</h2>

				<PotionsList />
			</div>
		</div>
	)
}
