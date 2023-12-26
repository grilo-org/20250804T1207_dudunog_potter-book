import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/app/entities/Book'
import { Badge } from '@/app/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { IoCalendarNumberOutline } from 'react-icons/io5'

type BooksListProps = {
	books: Book[]
}

const BooksList = ({ books }: BooksListProps) => {
	return books.map(book => (
		<Card key={book.id} className="w-[20rem] bg-secondary border-green">
			<CardHeader>
				<Link href={`books/${book.id}`}>
					<CardTitle className="text-green font-bold">{book.title}</CardTitle>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center w-full">
					<Link href={`books/${book.id}`}>
						<Image
							src={book.cover}
							alt="Book image"
							className="transition-all hover:scale-105"
							width={200}
							height={200}
						/>
					</Link>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				<Badge>{book.pages} páginas</Badge>
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
	))
}

export { BooksList }
