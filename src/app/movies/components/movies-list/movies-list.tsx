import Link from 'next/link'
import Image from 'next/image'
import { Movie } from '@/entities/Movie'
import { Badge } from '@/shared/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { IoTimeOutline } from 'react-icons/io5'

type MoviesListProps = {
	movies: Movie[]
}

const MoviesList = ({ movies }: MoviesListProps) => {
	return movies.map(movie => (
		<Card key={movie.id} className="w-[20rem] bg-secondary border-green">
			<CardHeader>
				<Link href={`movies/${movie.id}`}>
					<CardTitle className="text-green font-bold">{movie.title}</CardTitle>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center w-full">
					<Link href={`movies/${movie.id}`}>
						<Image
							width={200}
							height={200}
							src={movie.poster}
							className="transition-all hover:scale-105"
							alt="Movie image"
						/>
					</Link>
				</div>
			</CardContent>

			<CardFooter className="mt-[-1.5rem] flex flex-col">
				<TooltipProvider>
					<Tooltip delayDuration={200}>
						<TooltipTrigger>
							<Badge className="bg-green">{movie.rating}</Badge>
						</TooltipTrigger>
						<TooltipContent>
							<p>Avaliação</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip delayDuration={200}>
						<TooltipTrigger>
							<div className="mt-3 flex items-center gap-2">
								<IoCalendarNumberOutline
									size={20}
									className="text-green hover:cursor-default"
								/>
								<label className="text-green text-md hover:cursor-text">
									{movie.releaseDate}
								</label>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Data de lançamento</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip delayDuration={200}>
						<TooltipTrigger>
							<div className="mt-3 flex items-center gap-2">
								<IoTimeOutline
									size={20}
									className="text-green hover:cursor-default"
								/>
								<label className="text-green text-md hover:cursor-text">
									{movie.runningTime}
								</label>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Duração</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardFooter>
		</Card>
	))
}

export { MoviesList }
