import { Fragment } from 'react'
import { Error } from '@/shared/components/error'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/components/ui/accordion'
import { useGetBookChapters } from '@/app/books/hooks/use-get-book-chapters'

const ChaptersListSkeleton = ({ length }: { length: number }) => (
	<Fragment>
		<Skeleton className="h-[2.5rem] w-full" />
		<div className="mt-6 w-full flex flex-col gap-4">
			{Array.from({ length }, (_, index) => (
				<div
					data-testid="book-chapter-skeleton-item"
					key={index}
					className="space-y-1 w-full flex flex-col gap-4"
				>
					<div className="flex flex-row items-center gap-2 justify-between">
						<Skeleton className="h-[1rem] w-full max-w-[12rem]" />
						<Skeleton className="h-[0.8rem] w-[0.8rem]" />
					</div>
					<Skeleton className="h-[0.1rem] w-full" />
				</div>
			))}
		</div>
	</Fragment>
)

type ChaptersListProps = {
	bookId: string
}

const ChaptersList = ({ bookId }: ChaptersListProps) => {
	const { bookChapters, isLoading, isFetching, isError } = useGetBookChapters({
		id: String(bookId),
	})

	return (
		<Fragment>
			{isError ? (
				<Error
					title="Erro ao buscar dados"
					error="Ocorreu algum erro ao buscar os capítulos deste livro. Tente novamente recarregando
				a página!"
				/>
			) : (
				<Fragment>
					{isLoading || isFetching ? (
						<ChaptersListSkeleton length={10} />
					) : (
						<Tabs defaultValue="chapters" className="w-full max-w-[49rem]">
							<TabsList className="grid w-full grid-cols-2 bg-green">
								<TabsTrigger value="chapters">Capítulos</TabsTrigger>
							</TabsList>
							<TabsContent value="chapters">
								<Accordion
									data-testid="chapters-list"
									type="single"
									collapsible
									className="w-full"
								>
									{bookChapters?.map(chapter => (
										<AccordionItem
											key={chapter.id}
											value={chapter.id}
											className="border-b-green"
											data-testid="book-chapter-item"
										>
											<AccordionTrigger
												data-testid="chapter-accordion-title"
												className="text-green font-bold"
											>
												{chapter.order}. {chapter.title}
											</AccordionTrigger>
											<AccordionContent data-testid="chapter-accordion-content">
												{chapter.summary || 'Não há resumo para este capítulo'}
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</TabsContent>
						</Tabs>
					)}

					{bookChapters?.length === 0 && !isLoading && !isFetching && (
						<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
							<p className="text-green font-bold text-lg">
								Não há capítulos disponíveis deste livro
							</p>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}

export { ChaptersList }
