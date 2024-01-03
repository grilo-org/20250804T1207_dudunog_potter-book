import { Fragment, useState } from 'react'
import { DEFAULT_PAGINATION_PAGE_SIZE } from '@/constants'
import { useGetCharacters } from '@/shared/hooks/use-get-characters'
import { Error } from '@/shared/components/error'
import { Pagination } from '@/shared/components/pagination'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { CharacterItem } from '@/app/characters/components/character-item'

const CharactersListSkeleton = ({ length }: { length: number }) => {
	return Array.from({ length }, (_, index) => (
		<Card
			data-testid="character-skeleton-item"
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

const CharactersList = () => {
	const [currentPage, setCurrentPage] = useState(1)

	const { characters, isLoading, isFetching, isError } = useGetCharacters({
		currentPage,
		rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
	})

	return (
		<Fragment>
			{isError ? (
				<Error
					title="Erro ao buscar dados"
					error="Ocorreu algum erro ao buscar os personagens. Tente novamente recarregando
				a página!"
				/>
			) : (
				<Fragment>
					<div className="mt-4 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-3">
						{isLoading || isFetching ? (
							<CharactersListSkeleton length={6} />
						) : (
							characters?.data.map(character => (
								<CharacterItem key={character.id} character={character} />
							))
						)}
					</div>

					{characters?.data && !isLoading && !isFetching && (
						<Pagination
							currentPage={currentPage}
							registersPerPage={DEFAULT_PAGINATION_PAGE_SIZE}
							totalCountOfRegisters={characters?.totalRows}
							onPageChange={setCurrentPage}
						/>
					)}

					{characters?.data?.length === 0 && !isLoading && !isFetching && (
						<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
							<p className="text-minimal text-lg">
								Não há personagens para serem listados
							</p>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}

export { CharactersList }
