'use client'

import { Movie } from '@/app/entities/Movie'
import { useGetMovies } from '@/app/hooks/use-get-movies'
import { MoviesList } from '@/app/movies/components/movies-list'
import { Skeleton } from '@/app/components/ui/skeleton'

const MoviesListSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<div key={index} className="flex items-center gap-2">
			<Skeleton className="h-[30rem] w-[20rem]" />
		</div>
	))
}

export default function Movies() {
	const { movies, isLoading } = useGetMovies({})

	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Filmes</h2>

				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
					{isLoading ? (
						<MoviesListSkeleton length={6} />
					) : (
						<MoviesList movies={movies as Movie[]} />
					)}
				</div>

				{movies?.length === 0 && !isLoading && (
					<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
						<p className="text-minimal text-lg">
							Não há filmes para serem listados
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
