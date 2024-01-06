'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Character } from '@/entities/Character'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { CharacterTabsList } from '@/app/characters/components/character-tabs-list'
import { FaArrowRightLong } from 'react-icons/fa6'
const missingCharacterAvatarPath = '/missing_character.svg'

type CharacterDetailsProps = {
	character: Character
}

const CharacterDetails = ({ character }: CharacterDetailsProps) => {
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
			data-testid="character-details"
			className="mt-2 mb-6 bg-secondary border-green max-w-[52rem] w-full"
		>
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
						{character?.image ? (
							<Image
								src={character?.image}
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
				<CharacterTabsList characterId={character.id} />
			</CardFooter>
		</Card>
	)
}

export { CharacterDetails }
