import Link from 'next/link'
import Image from 'next/image'
import { Character } from '@/app/entities/Character'
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
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs'
const missingCharacterAvatarPath = '/missing_character.svg'

type CharactersListProps = {
	characters: Character[]
}

const CharactersList = ({ characters }: CharactersListProps) => {
	return characters.map(character => (
		<Card key={character.id} className="w-[20rem] bg-secondary border-green">
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
						href={`books/${character.id}`}
						className="w-[12rem] h-[12rem] relative"
					>
						<Image
							src={character.image || missingCharacterAvatarPath}
							className="transition-all hover:scale-105"
							alt="Book image"
							fill
						/>
					</Link>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col">
				{character.species && <Badge>{character.species}</Badge>}
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
	))
}

export { CharactersList }
