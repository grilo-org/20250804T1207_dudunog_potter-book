'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { BookDetails } from '@/app/books/components/book-details'
import { useGetBook } from '@/app/books/hooks/use-get-book'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoBookOutline } from 'react-icons/io5'

const BookSkeleton = () => (
	<Fragment>
		<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
			<Skeleton className="h-[1.5rem] w-full max-w-[25rem]" />
			<Skeleton className="h-[2.5rem] w-[5rem]" />
		</CardHeader>
		<CardContent className="flex flex-col md:flex-row gap-8">
			<div className="flex flex-col items-center gap-6">
				<Skeleton className="h-[18rem] w-[12.5rem]" />
				<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
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
			<div className="mt-6 w-full flex flex-col gap-4">
				{Array.from({ length: 10 }, (_, index) => (
					<div key={index} className="space-y-1 w-full flex flex-col gap-4">
						<div className="flex flex-row items-center gap-2 justify-between">
							<Skeleton className="h-[1rem] w-full max-w-[12rem]" />
							<Skeleton className="h-[0.8rem] w-[0.8rem]" />
						</div>
						<Skeleton className="h-[0.1rem] w-full" />
					</div>
				))}
			</div>
		</CardFooter>
	</Fragment>
)

export default function Book() {
	const { id: bookId } = useParams()

	const { book, isLoading } = useGetBook({
		id: String(bookId),
	})

	return (
		<Fragment>
			{isLoading && (
				<Card
					key={book?.id}
					className="my-6 bg-secondary border-green max-w-[52rem] w-full"
				>
					<BookSkeleton />
				</Card>
			)}

			{book ? (
				<BookDetails book={book} />
			) : (
				<Card className="my-6 bg-secondary border-green max-w-[52rem] w-full">
					<div className="my-8 flex flex-col items-center text-center text-green font-bold">
						<IoBookOutline size={150} />
						<p>Nenhum livro encontrado</p>

						<Link href="/books" className="mt-10 flex items-center gap-3">
							<Button
								variant="default"
								className="mt-0 flex items-center gap-3 bg-green"
							>
								Ir para a página de livros
								<FaArrowRightLong />
							</Button>
						</Link>
					</div>
				</Card>
			)}
		</Fragment>
	)
}
