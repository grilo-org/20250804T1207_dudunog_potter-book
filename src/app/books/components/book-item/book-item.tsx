import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/entities/Book'
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

type BookItemProps = {
	book: Book
}

const BookItem = ({ book }: BookItemProps) => {
	return (
		<Card
			data-testid="book-item"
			key={book.id}
			className="w-[20rem] bg-secondary border-green"
		>
			<CardHeader>
				<Link href={`books/${book.id}`}>
					<CardTitle className="text-green font-bold">{book.title}</CardTitle>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center w-full">
					<Link href={`books/${book.id}`}>
						<Image
							width={200}
							height={200}
							src={book.cover}
							className="transition-all hover:scale-105"
							alt="Book image"
						/>
					</Link>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				<Badge className="bg-green">{book.pages} páginas</Badge>
				<TooltipProvider>
					<Tooltip delayDuration={200}>
						<TooltipTrigger>
							<div className="mt-3 flex items-center gap-2">
								<IoCalendarNumberOutline
									size={20}
									className="text-green hover:cursor-default"
								/>
								<label className="text-green text-md hover:cursor-text">
									{book.releaseDate}
								</label>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Data de lançamento</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardFooter>
		</Card>
	)
}

export { BookItem }
