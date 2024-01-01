'use client'

import { CharactersList } from '@/app/characters/components/characters-list'

export default function Characters() {
	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Personagens</h2>

				<CharactersList />
			</div>
		</div>
	)
}
