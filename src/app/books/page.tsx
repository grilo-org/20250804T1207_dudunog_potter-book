'use client'

import { Book } from '@/entities/Book'
import { useGetBooks } from '@/shared/hooks/use-get-books'
import { BooksList } from '@/app/books/components/books-list'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'

const BooksListSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<Card key={index} className="w-[20rem] bg-secondary border-green">
			<CardHeader>
				<Skeleton className="h-[2rem] w-full" />
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-6">
					<Skeleton className="h-[18rem] w-[12.5rem]" />
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
				<div className="mt-3 flex items-center gap-2">
					<Skeleton className="h-[1.2rem] w-[1.2rem]" />
					<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
				</div>
			</CardFooter>
		</Card>
	))
}

export default function Books() {
	const { books, isLoading, isFetching } = useGetBooks({})

	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Livros</h2>

				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
					{isLoading || isFetching ? (
						<BooksListSkeleton length={6} />
					) : (
						<BooksList books={books as Book[]} />
					)}
				</div>

				{books?.length === 0 && !isLoading && !isFetching && (
					<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
						<p className="text-minimal text-lg">
							Não há livros para serem listados
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
