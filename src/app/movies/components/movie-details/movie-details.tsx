import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Movie } from '@/entities/Movie'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { MovieTabsList } from '@/app/movies/components/movie-tabs-list'
import { FaArrowRightLong } from 'react-icons/fa6'

type MovieDetailsProps = {
	movie: Movie
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
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

					{movie?.rating && <Badge className="bg-green">{movie?.rating}</Badge>}

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
								<p className="text-sm text-muted-foreground">{movie?.budget}</p>
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
				<MovieTabsList movieId={movie.id} />
			</CardFooter>
		</Card>
	)
}

export { MovieDetails }
