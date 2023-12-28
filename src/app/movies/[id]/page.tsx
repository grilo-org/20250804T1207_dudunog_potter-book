'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetMovie } from '@/app/movies/hooks/use-get-movie'
import { MovieTabsList } from '@/app/movies/components/movie-tabs-list'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'

const MovieSkeleton = () => (
	<>
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
	</>
)

export default function Movie() {
	const { id: movieId } = useParams()

	const { movie, isLoading } = useGetMovie({
		id: String(movieId),
	})

	const hasData = useMemo(
		() =>
			movie &&
			(movie.releaseDate ||
				movie?.boxOffice ||
				movie?.budget ||
				movie?.summary),
		[movie],
	)

	return (
		<Card
			key={movie?.id}
			className="my-4 bg-secondary border-green max-w-[52rem] w-full"
		>
			{true ? (
				<MovieSkeleton />
			) : (
				<>
					<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
						<CardTitle className="mt-2 text-green font-bold w-full">
							{movie?.title}
						</CardTitle>
						<Link
							href={String(movie?.wiki)}
							target="_blank"
							className="flex items-center gap-3"
						>
							<Button
								variant="default"
								className="mt-0 flex items-center gap-3 bg-green"
							>
								Wiki
								<FaArrowRightLong />
							</Button>
						</Link>
					</CardHeader>
					<CardContent className="flex flex-col md:flex-row gap-8">
						<div className="flex flex-col items-center">
							<Image
								width={200}
								height={200}
								src={String(movie?.poster)}
								className="transition-all hover:scale-105"
								alt="Movie image"
							/>

							{movie?.rating && (
								<Badge className="bg-green">{movie?.rating}</Badge>
							)}

							{movie?.trailer && (
								<div className="mt-6 w-72 h-40">
									<iframe
										src={movie?.trailer.split('watch?v=').join('embed/')}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										title="Embedded youtube"
									/>
								</div>
							)}
						</div>

						{hasData && (
							<div className="flex flex-col gap-4">
								{movie?.releaseDate && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Data de lançamento
										</p>
										<p className="text-sm text-muted-foreground">
											{movie?.releaseDate}
										</p>
									</div>
								)}
								{movie?.boxOffice && (
									<div className="space-y-1">
										<p className="text-sm text-green font-bold leading-none">
											Bilheteria
										</p>
										<p className="text-sm text-muted-foreground">
											{movie?.boxOffice}
										</p>
									</div>
								)}
								{movie?.budget && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Orçamento
										</p>
										<p className="text-sm text-muted-foreground">
											{movie?.budget}
										</p>
									</div>
								)}
								{movie?.summary && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Resumo
										</p>
										<p className="text-sm text-muted-foreground">
											{movie?.summary}
										</p>
									</div>
								)}
							</div>
						)}

						{!hasData && (
							<div className="mt-6">
								<p className="text-base text-green leading-none">
									Não há dados para este filme
								</p>
							</div>
						)}
					</CardContent>

					<CardFooter>
						<MovieTabsList movieId={String(movieId)} />
					</CardFooter>
				</>
			)}
		</Card>
	)
}
