import Link from 'next/link'
import Image from 'next/image'
import { Spell } from '@/app/entities/Spell'
import { Badge } from '@/app/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { truncateText } from '@/lib/utils'
import { GiFairyWand, GiStandingPotion } from 'react-icons/gi'

type SpellsListProps = {
	spells: Spell[]
}

const SpellsList = ({ spells }: SpellsListProps) => {
	return spells.map(spell => (
		<Card key={spell.id} className="w-[20rem] bg-secondary border-green">
			<CardHeader>
				<Link href={`spells/${spell.id}`}>
					<CardTitle className="text-green font-bold">{spell.name}</CardTitle>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center w-full">
					<Link
						href={`spells/${spell.id}`}
						className="w-[20rem] h-[12rem] relative"
					>
						{spell.image ? (
							<Image
								src={spell.image}
								className="transition-all hover:scale-105"
								alt="Spell image"
								fill
							/>
						) : (
							<GiStandingPotion size="100%" />
						)}
					</Link>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				{spell.category && (
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger>
								<Badge>{spell.category}</Badge>
							</TooltipTrigger>
							<TooltipContent>
								<p>Categoria</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				{spell.incantation && (
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger>
								<div className="mt-3 flex items-center gap-2">
									<GiFairyWand
										size={20}
										className="text-green hover:cursor-default"
									/>
									<label className="text-green text-md hover:cursor-text">
										{truncateText(spell.incantation, 40)}
									</label>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Encantamento</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</CardFooter>
		</Card>
	))
}

export { SpellsList }
