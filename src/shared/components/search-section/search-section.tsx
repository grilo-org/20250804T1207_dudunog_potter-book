import { Fragment, useCallback, useState } from 'react'
import { Book } from '@/entities/Book'
import { Character } from '@/entities/Character'
import { Movie } from '@/entities/Movie'
import { Potion } from '@/entities/Potion'
import { Spell } from '@/entities/Spell'
import { useGetResources } from '@/shared/hooks/use-get-resources'
import { ResourceItem, ResourceType } from '@/shared/components/resource-item'
import { SearchField } from '@/shared/components/search-field'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

const SearchResultsSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<div key={index} className="flex items-center gap-2">
			<Skeleton className="h-12 w-12 rounded-full" />
			<Skeleton className="h-4 w-[27rem]" />
		</div>
	))
}

const SearchSection = () => {
	const [showSearchResult, setShowSearchResult] = useState(false)
	const [resources, setResources] = useState<
		(Book | Character | Movie | Potion | Spell)[]
	>([])

	const { getResources, isLoading } = useGetResources()

	const handleSearch = useCallback(async (search: string) => {
		setShowSearchResult(true)

		const resourcesList = await getResources({
			name: search.trim(),
		})
		setResources(resourcesList)
	}, [])

	return (
		<Fragment>
			<SearchField
				className="mt-[9rem] max-w-[30rem]"
				placeholder="Procurando algo específico?"
				onSearch={handleSearch}
				onClick={() => {
					if (resources.length > 0 && !showSearchResult)
						setShowSearchResult(true)
				}}
			/>

			<Popover
				open={showSearchResult}
				onOpenChange={open => setShowSearchResult(open)}
			>
				<PopoverTrigger></PopoverTrigger>
				<PopoverContent className="w-full max-w-[40rem] max-h-[26rem] flex flex-col gap-3 overflow-y-auto">
					{isLoading ? (
						<SearchResultsSkeleton length={6} />
					) : (
						resources.map(resource => (
							<ResourceItem
								key={resource.id}
								resourceType={resource.type as ResourceType}
								resource={resource}
							/>
						))
					)}

					{resources.length === 0 && !isLoading && (
						<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
							<p className="text-gray text-sm">Nenhum resultado encontrado</p>
						</div>
					)}
				</PopoverContent>
			</Popover>
		</Fragment>
	)
}

export { SearchSection }
