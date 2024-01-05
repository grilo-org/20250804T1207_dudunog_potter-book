import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Spell } from '@/entities/Spell'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'
import { GiFairyWand } from 'react-icons/gi'

type SpellDetailsProps = {
	spell: Spell
}

const SpellDetails = ({ spell }: SpellDetailsProps) => {
	const hasData = useMemo(() => spell && (spell.name || spell?.effect), [spell])

	return (
		<Card className="mb-4 bg-secondary border-green max-w-[52rem] w-full">
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
								<p className="text-sm text-muted-foreground">{spell?.effect}</p>
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
								<p className="text-sm text-green font-bold leading-none">Luz</p>
								<p className="text-sm text-muted-foreground">{spell?.light}</p>
							</div>
						)}
						{spell?.hand && (
							<div className="space-y-1 max-w-[35rem]">
								<p className="text-sm text-green font-bold leading-none">
									Comando
								</p>
								<p className="text-sm text-muted-foreground">{spell?.hand}</p>
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
		</Card>
	)
}

export { SpellDetails }
