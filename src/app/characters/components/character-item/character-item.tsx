import Link from 'next/link'
import Image from 'next/image'
import { Character } from '@/entities/Character'
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
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs'
const missingCharacterAvatarPath = '/missing_character.svg'

type CharacterItemProps = {
	character: Character
}

const CharacterItem = ({ character }: CharacterItemProps) => {
	return (
		<Card
			data-testid="character-item"
			key={character.id}
			className="w-[20rem] bg-secondary border-green"
		>
			<CardHeader>
				<Link href={`characters/${character.id}`}>
					<CardTitle className="text-green font-bold">
						{character.name}
					</CardTitle>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center w-full">
					<Link
						href={`characters/${character.id}`}
						className="w-[12rem] h-[12rem] relative"
					>
						{character.image ? (
							<Image
								src={character.image}
								className="transition-all hover:scale-105"
								alt="Character image"
								fill
							/>
						) : (
							<Image
								data-testid="alternative-character-image"
								src={missingCharacterAvatarPath}
								className="transition-all hover:scale-105"
								alt="Alternative character image"
								fill
							/>
						)}
					</Link>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				{character.species && (
					<Badge className="bg-green">{character.species}</Badge>
				)}
				{character.gender && (
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger>
								<div className="mt-3 flex items-center gap-2">
									{character.gender?.toLowerCase() === 'male' ? (
										<BsGenderMale
											size={20}
											className="text-green hover:cursor-default"
										/>
									) : (
										<BsGenderFemale
											size={20}
											className="text-green hover:cursor-default"
										/>
									)}
									<label className="text-green text-md hover:cursor-text">
										{character.gender}
									</label>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Sexo</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</CardFooter>
		</Card>
	)
}

export { CharacterItem }
