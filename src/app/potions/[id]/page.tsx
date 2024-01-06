'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetPotion } from '@/app/potions/hooks/use-get-potion'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { PotionDetails } from '@/app/potions/components/potion-details'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { GiStandingPotion } from 'react-icons/gi'

const PotionSkeleton = () => (
	<Fragment>
		<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
			<div className="mt-2 w-full flex flex-col gap-1">
				<Skeleton className="h-[1.5rem] w-full max-w-[25rem]" />
			</div>
			<Skeleton className="h-[2.5rem] w-[5rem]" />
		</CardHeader>
		<CardContent className="flex flex-col md:flex-row gap-8">
			<div className="flex flex-col items-center gap-6">
				<Skeleton className="h-[14rem] w-[16.5rem]" />
				<Skeleton className="h-[1.8rem] w-[5.5rem] rounded-full" />
			</div>
			<div className="w-full flex flex-col gap-4">
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
			</div>
		</CardContent>
		<CardFooter className="mt-2 flex flex-col">
			<Skeleton className="h-[2.5rem] w-full" />
			<div className="mt-2 w-full flex flex-col gap-2">
				{Array.from({ length: 6 }, (_, index) => (
					<Skeleton key={index} className="h-[1rem] w-full max-w-[12rem]" />
				))}
			</div>
		</CardFooter>
	</Fragment>
)

export default function Potion() {
	const { id: potionId } = useParams()

	const { potion, isLoading } = useGetPotion({
		id: String(potionId),
	})

	return (
		<Fragment>
			<div className="mt-6 max-w-[52rem] w-full">
				<Link href="/potions" className="mt-6 flex items-center gap-3">
					<Button
						data-testid="back-button"
						variant="link"
						className="gap-3 text-minimal"
					>
						<FaArrowLeftLong />
						Voltar para poções
					</Button>
				</Link>
			</div>

			{isLoading && (
				<Card className="mb-6 bg-secondary border-green max-w-[52rem] w-full">
					<PotionSkeleton />
				</Card>
			)}

			{potion && <PotionDetails potion={potion} />}

			{!potion && !isLoading && (
				<Card className="mt-2 bg-secondary border-green max-w-[52rem] w-full">
					<div className="my-8 flex flex-col items-center text-center text-green font-bold">
						<GiStandingPotion size={150} />
						<p>Nenhuma poção encontrada</p>
					</div>
				</Card>
			)}
		</Fragment>
	)
}
