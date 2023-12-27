'use client'

import { useState } from 'react'
import { DEFAULT_PAGINATION_PAGE_SIZE } from '@/app/constants'
import { Spell } from '@/app/entities/Spell'
import { useGetSpells } from '@/app/hooks/use-get-spells'
import { SpellsList } from '@/app/spells/components/spells-list'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Pagination } from '@/app/components/pagination'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/app/components/ui/card'

const SpellsListSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<Card key={index} className="w-[20rem] bg-secondary border-green">
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

export default function Spells() {
	const [currentPage, setCurrentPage] = useState(1)

	const { spells, isLoading, isFetching } = useGetSpells({
		currentPage,
		rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
	})

	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Feitiços</h2>

				<div className="mt-4 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-3">
					{isLoading || isFetching ? (
						<SpellsListSkeleton length={6} />
					) : (
						<SpellsList spells={spells?.data as Spell[]} />
					)}
				</div>

				{spells?.data && !isLoading && !isFetching && (
					<Pagination
						currentPage={currentPage}
						registersPerPage={DEFAULT_PAGINATION_PAGE_SIZE}
						totalCountOfRegisters={spells?.totalRows}
						onPageChange={setCurrentPage}
					/>
				)}

				{spells?.data?.length === 0 && !isLoading && !isFetching && (
					<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
						<p className="text-minimal text-lg">
							Não há feitiços para serem listados
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
