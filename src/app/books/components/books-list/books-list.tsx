import { Fragment } from 'react'
import { useGetBooks } from '@/shared/hooks/use-get-books'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Error } from '@/shared/components/error'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { BookItem } from '@/app/books/components/book-item'

const BooksListSkeleton = ({ length }: { length: number }) => {
	return Array.from({ length }, (_, index) => (
		<Card
			data-testid="book-skeleton-item"
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
				<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
				<div className="mt-3 flex items-center gap-2">
					<Skeleton className="h-[1.2rem] w-[1.2rem]" />
					<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
				</div>
			</CardFooter>
		</Card>
	))
}

const BooksList = () => {
	const { books, isLoading, isFetching, isError } = useGetBooks({})

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
							<BooksListSkeleton length={6} />
						) : (
							books?.map(book => <BookItem key={book.id} book={book} />)
						)}
					</div>

					{books?.length === 0 && !isLoading && !isFetching && (
						<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
							<p className="text-minimal text-lg">
								Não há livros para serem listados
							</p>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}

export { BooksList }
