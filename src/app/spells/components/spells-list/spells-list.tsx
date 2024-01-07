import { Fragment, useCallback, useState } from 'react'
import { DEFAULT_PAGINATION_PAGE_SIZE } from '@/constants'
import { useGetSpells } from '@/shared/hooks/use-get-spells'
import { Error } from '@/shared/components/error'
import { Pagination } from '@/shared/components/pagination'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { SearchField } from '@/shared/components/search-field'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { SpellItem } from '@/app/spells/components/spell-item'

const SpellsListSkeleton = ({ length }: { length: number }) => {
	return Array.from({ length }, (_, index) => (
		<Card
			data-testid="spell-skeleton-item"
			key={index}
			className="w-[20rem] bg-secondary border-green"
		>
			<CardHeader>
				<Skeleton className="h-[2rem] w-full" />
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-6">
					<Skeleton className="h-[12.5rem] w-[12.5rem]" />
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

const SpellsList = () => {
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const { spells, isLoading, isFetching, isError } = useGetSpells({
		name: search,
		currentPage,
		rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
	})

	const handleSearch = useCallback(async (search: string) => {
		setSearch(search.trim())
	}, [])

	return (
		<Fragment>
			<SearchField
				data-testid="search-field"
				className="mt-4 w-full"
				onSearch={handleSearch}
			/>

			{isError ? (
				<Error
					title="Erro ao buscar dados"
					error="Ocorreu algum erro ao buscar os feitiços. Tente novamente recarregando
				a página!"
				/>
			) : (
				<Fragment>
					<div
						data-testid="spells-list"
						className="mt-4 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-3"
					>
						{isLoading || isFetching ? (
							<SpellsListSkeleton length={6} />
						) : (
							spells?.data.map(spell => (
								<SpellItem key={spell.id} spell={spell} />
							))
						)}
					</div>

					{spells?.data &&
						spells?.data.length > 0 &&
						!isLoading &&
						!isFetching && (
							<Pagination
								currentPage={currentPage}
								registersPerPage={DEFAULT_PAGINATION_PAGE_SIZE}
								totalCountOfRegisters={spells?.totalRows}
								onPageChange={setCurrentPage}
							/>
						)}

					{spells?.data?.length === 0 && !isLoading && !isFetching && (
						<div className="mt-4 flex flex-col items-center max-w-[40rem] max-h-[30rem]">
							<p className="text-minimal text-lg">
								Não há feitiços para serem listados
							</p>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}

export { SpellsList }
