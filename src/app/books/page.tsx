'use client'

import { harryPotterFont } from '@/app/fonts'
import { Book } from '@/app/entities/Book'
import { useGetBooks } from '@/app/hooks/use-get-books'
import { BooksList } from '@/app/books/components/books-list'
import { Skeleton } from '@/app/components/ui/skeleton'
import { cn } from '@/lib/utils'

const BooksListSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<div key={index} className="flex items-center gap-2">
			<Skeleton className="h-[30rem] w-[20rem]" />
		</div>
	))
}

export default function Books() {
	const { books, isLoading } = useGetBooks({})

	return (
		<div className="mt-4 max-w-7xl w-full flex flex-col items-center">
			<h1 className={cn(harryPotterFont.className, 'text-[5rem] text-minimal')}>
				Harry Potter World
			</h1>

			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{isLoading ? (
					<BooksListSkeleton length={6} />
				) : (
					<BooksList books={books as Book[]} />
				)}
			</div>

			{books?.length === 0 && !isLoading && (
				<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
					<p className="text-minimal text-lg">
						Não há livros para serem listados
					</p>
				</div>
			)}
		</div>
	)
}
