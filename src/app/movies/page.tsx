'use client'

import { MoviesList } from '@/app/movies/components/movies-list'

export default function Movies() {
	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Filmes</h2>

				<MoviesList />
			</div>
		</div>
	)
}
