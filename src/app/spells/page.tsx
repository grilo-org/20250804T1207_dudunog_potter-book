'use client'

import { SpellsList } from '@/app/spells/components/spells-list'

export default function Spells() {
	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Feitiços</h2>

				<SpellsList />
			</div>
		</div>
	)
}
