'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetSpell } from '@/app/spells/hooks/use-get-spell'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'
import { GiFairyWand } from 'react-icons/gi'

const SpellSkeleton = () => (
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
		<CardFooter />
	</>
)

export default function Spell() {
	const { id: spellId } = useParams()

	const { spell, isLoading } = useGetSpell({
		id: String(spellId),
	})

	const hasData = useMemo(() => spell && (spell.name || spell?.effect), [spell])

	return (
		<Card
			key={spell?.id}
			className="my-4 bg-secondary border-green max-w-[52rem] w-full"
		>
			{isLoading ? (
				<SpellSkeleton />
			) : (
				<>
					<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
						<CardTitle className="mt-2 text-green font-bold w-full">
							{spell?.name}
						</CardTitle>
						<Link
							href={String(spell?.wiki)}
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
							{spell?.image ? (
								<Image
									width={200}
									height={200}
									src={String(spell?.image)}
									className="transition-all hover:scale-105"
									alt="Spell image"
								/>
							) : (
								<GiFairyWand size="100%" />
							)}

							{spell?.category && (
								<Badge className="mt-2 bg-green">{spell?.category}</Badge>
							)}
						</div>

						{hasData && (
							<div className="flex flex-col gap-4">
								{spell?.effect && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Efeito
										</p>
										<p className="text-sm text-muted-foreground">
											{spell?.effect}
										</p>
									</div>
								)}
								{spell?.creator && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Criador
										</p>
										<p className="text-sm text-muted-foreground">
											{spell?.creator}
										</p>
									</div>
								)}
								{spell?.light && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Luz
										</p>
										<p className="text-sm text-muted-foreground">
											{spell?.light}
										</p>
									</div>
								)}
								{spell?.hand && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Comando
										</p>
										<p className="text-sm text-muted-foreground">
											{spell?.hand}
										</p>
									</div>
								)}
							</div>
						)}

						{!hasData && (
							<div className="mt-6">
								<p className="text-base text-green leading-none">
									Não há dados para este feitiço
								</p>
							</div>
						)}
					</CardContent>

					<CardFooter />
				</>
			)}
		</Card>
	)
}
