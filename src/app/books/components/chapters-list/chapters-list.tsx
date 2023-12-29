import { useGetBookChapters } from '@/app/books/hooks/use-get-book-chapters'
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

type ChaptersListProps = {
	bookId: string
}

const ChaptersList = ({ bookId }: ChaptersListProps) => {
	const { bookChapters } = useGetBookChapters({
		id: String(bookId),
	})

	return (
		<Tabs defaultValue="chapters" className="mt-2 w-full max-w-[49rem]">
			<TabsList className="grid w-full grid-cols-2 bg-green">
				<TabsTrigger value="chapters">Capítulos</TabsTrigger>
			</TabsList>
			<TabsContent value="chapters">
				<Accordion type="single" collapsible className="w-full">
					{bookChapters?.map(chapter => (
						<AccordionItem
							key={chapter.id}
							value={chapter.id}
							className="border-b-green"
						>
							<AccordionTrigger className="text-green font-bold">
								{chapter.order}. {chapter.title}
							</AccordionTrigger>
							<AccordionContent>
								{chapter.summary || 'Não há resumo para este capítulo'}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</TabsContent>
		</Tabs>
	)
}

export { ChaptersList }
