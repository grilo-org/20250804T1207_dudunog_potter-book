import { Fragment } from 'react'
import { useGetMovies } from '@/shared/hooks/use-get-movies'
import { Error } from '@/shared/components/error'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { MovieItem } from '@/app/movies/components/movie-item'

const MoviesListSkeleton = ({ length }: { length: number }) => {
	return Array.from({ length }, (_, index) => (
		<Card
			data-testid="movie-skeleton-item"
			key={index}
			className="w-[20rem] bg-secondary border-green"
		>
			<CardHeader>
				<Skeleton className="h-[2rem] w-full" />
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-6">
					<Skeleton className="h-[18rem] w-[12.5rem]" />
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				<Skeleton className="h-[1.3rem] w-[4rem] rounded-full" />
				<div className="mt-3 flex items-center gap-2">
					<Skeleton className="h-[1.2rem] w-[1.2rem]" />
					<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
				</div>
				<div className="mt-3 flex items-center gap-2">
					<Skeleton className="h-[1.2rem] w-[1.2rem]" />
					<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
				</div>
			</CardFooter>
		</Card>
	))
}

const MoviesList = () => {
	const { movies, isLoading, isFetching, isError } = useGetMovies({})

	return (
		<Fragment>
			{isError ? (
				<Error
					title="Erro ao buscar dados"
					error="Ocorreu algum erro ao buscar os livros. Tente novamente recarregando
				a página!"
				/>
			) : (
				<Fragment>
					<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{isLoading || isFetching ? (
							<MoviesListSkeleton length={6} />
						) : (
							movies?.map(movie => <MovieItem key={movie.id} movie={movie} />)
						)}
					</div>

					{movies?.length === 0 && !isLoading && !isFetching && (
						<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
							<p className="text-minimal text-lg">
								Não há filmes para serem listados
							</p>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}

export { MoviesList }
