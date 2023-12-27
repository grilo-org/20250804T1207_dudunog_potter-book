'use client'

import { useState } from 'react'
import { Potion } from '@/app/entities/Potion'
import { useGetPotions } from '@/app/hooks/use-get-potions'
import { PotionsList } from '@/app/potions/components/potions-list'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Pagination } from '@/app/components/pagination'

const PotionsListSkeleton = ({ length = 4 }: { length?: number }) => {
	return Array.from({ length }, (_, index) => (
		<div key={index} className="flex items-center gap-2">
			<Skeleton className="h-[30rem] w-[20rem]" />
		</div>
	))
}

const DEFAULT_PAGE_SIZE = 10

export default function Potions() {
	const [currentPage, setCurrentPage] = useState(1)

	const { potions, isLoading } = useGetPotions({
		currentPage,
		rowsPerPage: DEFAULT_PAGE_SIZE,
	})

	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Poções</h2>

				<div className="mt-4 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-3">
					{isLoading ? (
						<PotionsListSkeleton length={6} />
					) : (
						<PotionsList potions={potions?.data as Potion[]} />
					)}
				</div>

				<Pagination
					currentPage={currentPage}
					registersPerPage={DEFAULT_PAGE_SIZE}
					totalCountOfRegisters={potions?.totalRows}
					onPageChange={setCurrentPage}
				/>

				{potions?.data?.length === 0 && !isLoading && (
					<div className="flex flex-col items-center max-w-[40rem] max-h-[30rem]">
						<p className="text-minimal text-lg">
							Não há poções para serem listados
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
