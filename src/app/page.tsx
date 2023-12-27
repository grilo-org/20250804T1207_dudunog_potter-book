'use client'

import { useCallback, useState } from 'react'
import { harryPotterFont } from '@/app/fonts'
import { Book } from '@/app/entities/Book'
import { Character } from '@/app/entities/Character'
import { Movie } from '@/app/entities/Movie'
import { Potion } from '@/app/entities/Potion'
import { Spell } from '@/app/entities/Spell'
import { useGetResources } from '@/app/hooks/use-get-resources'
import { ResourceItem, ResourceType } from '@/app/components/resource-item'
import { SearchField } from '@/app/components/search-field'
import { ActionsList } from '@/app/components/actions-list'
import { Skeleton } from '@/app/components/ui/skeleton'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'

const SearchResultsSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<div key={index} className="flex items-center gap-2">
			<Skeleton className="h-12 w-12 rounded-full" />
			<Skeleton className="h-4 w-[27rem]" />
		</div>
	))
}

export default function Home() {
	const [showSearchResult, setShowSearchResult] = useState(false)
	const [resources, setResources] = useState<
		(Book | Character | Movie | Potion | Spell)[]
	>([])
	const { getResources, isLoading } = useGetResources()

	const handleSearch = useCallback(async (search: string) => {
		setShowSearchResult(true)

		const resourcesList = await getResources({
			name: search,
		})
		setResources(resourcesList)
	}, [])

	return (
		<>
			<q className="text-md text-minimal">
				Palavras na minha não tão humilde opinião são nossa inesgotável fonte de
				magia.
			</q>

			<SearchField
				className="mt-8 max-w-[20rem]"
				placeholder="Pesquisar por..."
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

			<ActionsList />
		</>
	)
}
