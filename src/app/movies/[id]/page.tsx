'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetMovie } from '@/app/movies/hooks/use-get-movie'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { MovieDetails } from '@/app/movies/components/movie-details'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { MdOutlineMovie } from 'react-icons/md'

const MovieSkeleton = () => (
	<Fragment>
		<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
			<div className="mt-2 w-full flex flex-col gap-1">
				<Skeleton className="h-[1.5rem] w-full max-w-[25rem]" />
			</div>
			<Skeleton className="h-[2.5rem] w-[5rem]" />
		</CardHeader>
		<CardContent className="flex flex-col md:flex-row gap-8">
			<div className="flex flex-col items-center gap-6">
				<Skeleton className="h-[18rem] w-[12.5rem]" />
				<Skeleton className="h-[1.8rem] w-[5.5rem] rounded-full" />
				<Skeleton className="h-[10rem] w-full max-w-[18rem] sm:max-w-none sm:w-[18rem]" />
			</div>
			<div className="w-full flex flex-col gap-4">
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
			</div>
		</CardContent>
		<CardFooter className="mt-2 flex flex-col">
			<Skeleton className="h-[2.5rem] w-full" />
			<div className="mt-2 w-full flex flex-col gap-2">
				{Array.from({ length: 6 }, (_, index) => (
					<Skeleton key={index} className="h-[1rem] w-full max-w-[12rem]" />
				))}
			</div>
		</CardFooter>
	</Fragment>
)

export default function Movie() {
	const { id: movieId } = useParams()

	const { movie, isLoading } = useGetMovie({
		id: String(movieId),
	})

	return (
		<Fragment>
			<div className="mt-6 max-w-[52rem] w-full">
				<Link href="/movies" className="mt-6 flex items-center gap-3">
					<Button variant="link" className="gap-3 text-minimal">
						<FaArrowLeftLong />
						Voltar para filmes
					</Button>
				</Link>
			</div>

			{isLoading && (
				<Card className="mb-6 bg-secondary border-green max-w-[52rem] w-full">
					<MovieSkeleton />
				</Card>
			)}

			{movie && <MovieDetails movie={movie} />}

			{!movie && !isLoading && (
				<Card className="my-6 bg-secondary border-green max-w-[52rem] w-full">
					<div className="my-8 flex flex-col items-center text-center text-green font-bold">
						<MdOutlineMovie size={150} />
						<p>Nenhum filme encontrado</p>

						<Link href="/movies" className="mt-10 flex items-center gap-3">
							<Button
								variant="default"
								className="mt-0 flex items-center gap-3 bg-green"
							>
								Ir para a página de filmes
								<FaArrowRightLong />
							</Button>
						</Link>
					</div>
				</Card>
			)}
		</Fragment>
	)
}
