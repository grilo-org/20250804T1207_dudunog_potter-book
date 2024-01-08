'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetSpell } from '@/app/spells/hooks/use-get-spell'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { SpellDetails } from '@/app/spells/components/spell-details'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { GiFairyWand } from 'react-icons/gi'

const SpellSkeleton = () => (
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
		<CardFooter />
	</Fragment>
)

export default function Spell() {
	const { id: spellId } = useParams()

	const { spell, isLoading } = useGetSpell({
		id: String(spellId),
	})

	return (
		<Fragment>
			<div className="mt-6 max-w-[52rem] w-full">
				<Link href="/spells" className="mt-6 flex items-center gap-3">
					<Button
						data-testid="back-button"
						variant="link"
						className="gap-3 text-minimal"
					>
						<FaArrowLeftLong />
						Voltar para feitiços
					</Button>
				</Link>
			</div>

			{isLoading && (
				<Card
					data-testid="spell-details-skeleton"
					className="mb-6 bg-secondary border-green max-w-[52rem] w-full"
				>
					<SpellSkeleton />
				</Card>
			)}

			{spell && <SpellDetails spell={spell} />}

			{!spell && !isLoading && (
				<Card className="mt-2 bg-secondary border-green max-w-[52rem] w-full">
					<div className="my-8 flex flex-col items-center text-center text-green font-bold">
						<GiFairyWand size={150} />
						<p className="mt-6">Nenhum feitiço encontrado</p>
					</div>
				</Card>
			)}
		</Fragment>
	)
}
