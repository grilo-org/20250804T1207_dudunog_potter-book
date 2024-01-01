import Link from 'next/link'
import Image from 'next/image'
import { Potion } from '@/entities/Potion'
import { Badge } from '@/shared/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { truncateText } from '@/lib/utils'
import { GiFairyWand, GiStandingPotion } from 'react-icons/gi'
import { IoIosInformationCircleOutline } from 'react-icons/io'

type PotionItemProps = {
	potion: Potion
}

const PotionItem = ({ potion }: PotionItemProps) => {
	return (
		<Card
			data-testid="potion-item"
			key={potion.id}
			className="w-[20rem] bg-secondary border-green"
		>
			<CardHeader>
				<Link href={`potions/${potion.id}`}>
					<CardTitle className="text-green font-bold">{potion.name}</CardTitle>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center w-full">
					<Link
						href={`potions/${potion.id}`}
						className="w-[12rem] h-[12rem] relative"
					>
						{potion?.image ? (
							<Image
								src={potion.image}
								className="transition-all hover:scale-105"
								alt="Potion image"
								fill
							/>
						) : (
							<GiStandingPotion size="100%" />
						)}
					</Link>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				{potion.difficulty && (
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger>
								<Badge className="bg-green">{potion.difficulty}</Badge>
							</TooltipTrigger>
							<TooltipContent>
								<p>Dificuldade</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				{potion.effect && (
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger>
								<div className="mt-3 flex items-center gap-2">
									<GiFairyWand
										size={20}
										className="text-green hover:cursor-default"
									/>
									<label className="text-green text-md hover:cursor-text">
										{truncateText(potion.effect, 40)}
									</label>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Efeito</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				{potion.characteristics && (
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger>
								<div className="mt-3 flex items-center gap-2">
									<IoIosInformationCircleOutline
										size={20}
										className="text-green hover:cursor-default"
									/>
									<label className="text-green text-md hover:cursor-text">
										{truncateText(potion.characteristics, 40)}
									</label>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Características</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</CardFooter>
		</Card>
	)
}

export { PotionItem }
