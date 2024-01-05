'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/shared/components/ui/card'
import { useGetCharacter } from '@/app/characters/hooks/use-get-character'
import { CharacterDetails } from '@/app/characters/components/character-details'
import { FaArrowRightLong } from 'react-icons/fa6'
const missingCharacterAvatarPath = '/missing_character.svg'

const CharacterSkeleton = () => (
	<Fragment>
		<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
			<div className="mt-2 w-full flex flex-col gap-1">
				<Skeleton className="h-[1.5rem] w-full max-w-[25rem]" />
				<Skeleton className="h-[1rem] w-full max-w-[15rem]" />
			</div>
			<Skeleton className="h-[2.5rem] w-[5rem]" />
		</CardHeader>
		<CardContent className="flex flex-col md:flex-row gap-8">
			<div className="flex flex-col items-center gap-6">
				<Skeleton className="h-[18rem] w-[12.5rem]" />
				<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
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

export default function Character() {
	const { id: characterId } = useParams()

	const { character, isLoading } = useGetCharacter({
		id: String(characterId),
	})

	return (
		<Fragment>
			{isLoading && (
				<Card className="my-6 bg-secondary border-green max-w-[52rem] w-full">
					<CharacterSkeleton />
				</Card>
			)}

			{character && <CharacterDetails character={character} />}

			{!character && !isLoading && (
				<Card className="my-4 bg-secondary border-green max-w-[52rem] w-full">
					<div className="my-8 flex flex-col items-center text-center text-green font-bold">
						<Avatar className="w-[12rem] h-[12rem] relative">
							<AvatarImage
								width="auto"
								height="auto"
								src={missingCharacterAvatarPath}
							/>
						</Avatar>
						<p>Nenhum personagem encontrado</p>

						<Link href="/characters" className="mt-10 flex items-center gap-3">
							<Button
								variant="default"
								className="mt-0 flex items-center gap-3 bg-green"
							>
								Ir para a página de personagens
								<FaArrowRightLong />
							</Button>
						</Link>
					</div>
				</Card>
			)}
		</Fragment>
	)
}
