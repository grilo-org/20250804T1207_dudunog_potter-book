'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetPotion } from '@/app/potions/hooks/use-get-potion'
import { PotionTabsList } from '@/app/potions/components/potion-tabs-list'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'
import { GiStandingPotion } from 'react-icons/gi'

const PotionSkeleton = () => (
	<>
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
	</>
)

export default function Potion() {
	const { id: potionId } = useParams()

	const { potion, isLoading } = useGetPotion({
		id: String(potionId),
	})

	const hasData = useMemo(
		() => potion && (potion.name || potion?.effect),
		[potion],
	)

	return (
		<Card
			key={potion?.id}
			className="my-4 bg-secondary border-green max-w-[52rem] w-full"
		>
			{isLoading ? (
				<PotionSkeleton />
			) : (
				<>
					<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
						<CardTitle className="mt-2 text-green font-bold w-full">
							{potion?.name}
						</CardTitle>
						<Link
							href={String(potion?.wiki)}
							target="_blank"
							className="flex items-center gap-3"
						>
							<Button
								variant="default"
								className="mt-0 flex items-center gap-3 bg-green"
							>
								Wiki
								<FaArrowRightLong />
							</Button>
						</Link>
					</CardHeader>
					<CardContent className="flex flex-col md:flex-row gap-8">
						<div className="flex flex-col items-center gap-6">
							{potion?.image ? (
								<Image
									width={200}
									height={200}
									src={String(potion?.image)}
									className="transition-all hover:scale-105"
									alt="Potion image"
								/>
							) : (
								<GiStandingPotion size="100%" />
							)}

							{potion?.difficulty && (
								<Badge className="mt-2 bg-green">{potion?.difficulty}</Badge>
							)}
						</div>

						{hasData && (
							<div className="flex flex-col gap-4">
								{potion?.effect && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Efeito
										</p>
										<p className="text-sm text-muted-foreground">
											{potion?.effect}
										</p>
									</div>
								)}
								{potion?.time && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Duração
										</p>
										<p className="text-sm text-muted-foreground">
											{potion?.time}
										</p>
									</div>
								)}
								{potion?.sideEffects && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Efeitos colaterais
										</p>
										<p className="text-sm text-muted-foreground">
											{potion?.sideEffects}
										</p>
									</div>
								)}
							</div>
						)}

						{!hasData && (
							<div className="mt-6">
								<p className="text-base text-green leading-none">
									Não há dados para esta poção
								</p>
							</div>
						)}
					</CardContent>

					<CardFooter>
						<PotionTabsList potionId={String(potionId)} />
					</CardFooter>
				</>
			)}
		</Card>
	)
}
