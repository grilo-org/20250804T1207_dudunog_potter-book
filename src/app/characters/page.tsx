'use client'

import { useState } from 'react'
import { Character } from '@/app/entities/Character'
import { DEFAULT_PAGINATION_PAGE_SIZE } from '@/app/constants'
import { useGetCharacters } from '@/app/hooks/use-get-characters'
import { CharactersList } from '@/app/characters/components/characters-list'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Pagination } from '@/app/components/pagination'

const CharactersListSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<div key={index} className="flex items-center gap-2">
			<Skeleton className="h-[30rem] w-[20rem]" />
		</div>
	))
}

export default function Characters() {
	const [currentPage, setCurrentPage] = useState(1)

	const { characters, isLoading } = useGetCharacters({
		currentPage,
		rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
	})

	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Personagens</h2>

				<div className="mt-4 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-3">
					{isLoading ? (
						<CharactersListSkeleton length={6} />
					) : (
						<CharactersList characters={characters?.data as Character[]} />
					)}
				</div>

				{characters?.data && !isLoading && (
					<Pagination
						currentPage={currentPage}
						registersPerPage={DEFAULT_PAGINATION_PAGE_SIZE}
						totalCountOfRegisters={characters?.totalRows}
						onPageChange={setCurrentPage}
					/>
				)}

				{characters?.data?.length === 0 && !isLoading && (
					<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
						<p className="text-minimal text-lg">
							Não há personagens para serem listados
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
