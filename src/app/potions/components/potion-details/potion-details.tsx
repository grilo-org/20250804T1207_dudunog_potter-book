import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Potion } from '@/entities/Potion'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Alert, AlertDescription } from '@/shared/components/ui/alert'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { PotionTabsList } from '@/app/potions/components/potion-tabs-list'
import { FaArrowRightLong } from 'react-icons/fa6'
import { GiStandingPotion } from 'react-icons/gi'

type PotionDetailsProps = {
	potion: Potion
}

const PotionDetails = ({ potion }: PotionDetailsProps) => {
	const hasData = useMemo(
		() => potion && (potion.effect || potion?.time || potion?.sideEffects),
		[potion],
	)

	return (
		<Card
			data-testid="potion-details"
			className="mt-2 mb-6 bg-secondary border-green max-w-[52rem] w-full"
		>
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
							src={potion?.image}
							className="transition-all hover:scale-105"
							alt="Potion image"
						/>
					) : (
						<GiStandingPotion
							data-testid="alternative-potion-image"
							size="100%"
							className="text-green transition-all hover:scale-105"
							title="Alternative potion image"
						/>
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
								<p className="text-sm text-muted-foreground">{potion?.time}</p>
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
					<div>
						<Alert
							data-testid="no-character-data"
							variant="default"
							className="mt-4 bg-transparent border-green w-full"
						>
							<AlertDescription>
								Não há dados disponíveis para esta poção
							</AlertDescription>
						</Alert>
					</div>
				)}
			</CardContent>
			<CardFooter>
				<PotionTabsList potionId={potion.id} />
			</CardFooter>
		</Card>
	)
}

export { PotionDetails }
