'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetCharacter } from '@/app/characters/hooks/use-get-character'
import { CharacterTabsList } from '@/app/characters/components/character-tabs-list'
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
const missingCharacterAvatarPath = '/missing_character.svg'

const CharacterSkeleton = () => (
	<>
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
	</>
)

export default function Character() {
	const { id: characterId } = useParams()

	const { character, isLoading } = useGetCharacter({
		id: String(characterId),
	})

	const hasData = useMemo(
		() =>
			character &&
			(character.gender ||
				character?.nationality ||
				character?.maritalStatus ||
				character?.bloodStatus ||
				character?.house ||
				character?.eyeColor ||
				character?.hairColor ||
				character?.height ||
				character?.weight ||
				character?.boggart ||
				character?.patronus),
		[character],
	)

	return (
		<Card
			key={character?.id}
			className="my-4 bg-secondary border-green max-w-[52rem] w-full"
		>
			{isLoading ? (
				<CharacterSkeleton />
			) : (
				<>
					<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
						<div className="mt-2 w-full">
							<CardTitle className="text-green font-bold">
								{character?.name}
							</CardTitle>
							{character && character?.aliasNames.length > 0 && (
								<p className="text-sm text-muted-foreground">
									{character?.aliasNames[0]}
								</p>
							)}
						</div>
						<Link
							href={String(character?.wiki)}
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
							<div className="w-[12rem] h-[12rem] relative">
								<Image
									src={character?.image || missingCharacterAvatarPath}
									className="transition-all hover:scale-105"
									alt="Character image"
									fill
								/>
							</div>
							{character?.species && (
								<Badge className="bg-green">{character?.species}</Badge>
							)}
						</div>
						{hasData && (
							<div className="flex flex-col gap-4">
								{character?.born && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Nascimento
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.born}
										</p>
									</div>
								)}
								{character?.gender && (
									<div className="space-y-1">
										<p className="text-sm text-green font-bold leading-none">
											Sexo
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.gender}
										</p>
									</div>
								)}
								{character?.nationality && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Nacionalidade
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.nationality}
										</p>
									</div>
								)}
								{character?.maritalStatus && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Estado civil
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.maritalStatus}
										</p>
									</div>
								)}
								{character?.bloodStatus && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Estado sanguíneo
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.bloodStatus}
										</p>
									</div>
								)}
								{character?.house && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Casa
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.house}
										</p>
									</div>
								)}
								{character?.eyeColor && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Cor do olho
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.eyeColor}
										</p>
									</div>
								)}
								{character?.hairColor && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Cor do cabelo
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.hairColor}
										</p>
									</div>
								)}
								{character?.height && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Altura
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.height}
										</p>
									</div>
								)}
								{character?.weight && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Peso
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.weight}
										</p>
									</div>
								)}
								{character?.boggart && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Bicho papão
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.boggart}
										</p>
									</div>
								)}
								{character?.patronus && (
									<div className="space-y-1 max-w-[35rem]">
										<p className="text-sm text-green font-bold leading-none">
											Patronus
										</p>
										<p className="text-sm text-muted-foreground">
											{character?.patronus}
										</p>
									</div>
								)}
							</div>
						)}
						{!hasData && (
							<div className="mt-6">
								<p className="text-base text-green leading-none">
									Não há dados para este personagem
								</p>
							</div>
						)}
					</CardContent>

					<CardFooter>
						<CharacterTabsList characterId={String(characterId)} />
					</CardFooter>
				</>
			)}
		</Card>
	)
}
