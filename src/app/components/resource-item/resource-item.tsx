import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Book } from '@/app/entities/Book'
import { Character } from '@/app/entities/Character'
import { Movie } from '@/app/entities/Movie'
import { Potion } from '@/app/entities/Potion'
import { Spell } from '@/app/entities/Spell'
import { SearchResultItem } from '@/app/components/search-result-item'
import { Avatar, AvatarImage } from '@/app/components/ui/avatar'
import { IoBookOutline } from 'react-icons/io5'
import { MdOutlineMovie } from 'react-icons/md'
import { GiStandingPotion } from 'react-icons/gi'
import { GiFairyWand } from 'react-icons/gi'
import { FaArrowRightLong } from 'react-icons/fa6'
const missingCharacterAvatarPath = '/missing_character.svg'

export type ResourceType = 'book' | 'character' | 'movie' | 'potion' | 'spell'

type ResourceItemProps = {
	resourceType: ResourceType
	resource: Book | Character | Movie | Potion | Spell
}

type ResourceComponent = {
	book: (book: Book) => ReactNode
	character: (character: Character) => ReactNode
	movie: (movie: Movie) => ReactNode
	potion: (potion: Potion) => ReactNode
	spell: (spell: Spell) => ReactNode
}

type ComponentMapType = {
	[Key in ResourceType]: ResourceComponent[Key]
}

const componentMap: ComponentMapType = {
	book: (book: Book) => (
		<Link href={`books/${book.id}`}>
			<SearchResultItem key={book.id}>
				<SearchResultItem.Icon className="w-11 h-11 relative">
					{book.cover ? (
						<Image src={book.cover} alt="Book image" fill />
					) : (
						<IoBookOutline size={37} />
					)}
				</SearchResultItem.Icon>
				<SearchResultItem.Title title={book.title} className="ml-1">
					{book.title}
				</SearchResultItem.Title>
				<SearchResultItem.Children className="ml-auto">
					<FaArrowRightLong color="#8c8c8c" />
				</SearchResultItem.Children>
			</SearchResultItem>
		</Link>
	),
	character: (character: Character) => (
		<Link href={`characters/${character.id}`}>
			<SearchResultItem key={character.id}>
				<SearchResultItem.Icon className="w-[3rem] h-[3rem] relative">
					<Avatar className="w-full h-full">
						<AvatarImage
							width="auto"
							height="auto"
							src={character.image || missingCharacterAvatarPath}
						/>
					</Avatar>
				</SearchResultItem.Icon>
				<SearchResultItem.Title title={character.name}>
					{character.name}
				</SearchResultItem.Title>
				<SearchResultItem.Children className="ml-auto">
					<FaArrowRightLong color="#8c8c8c" />
				</SearchResultItem.Children>
			</SearchResultItem>
		</Link>
	),
	movie: (movie: Movie) => (
		<Link href={`movies/${movie.id}`}>
			<SearchResultItem key={movie.id}>
				<SearchResultItem.Icon className="w-11 h-11 relative">
					{movie.poster ? (
						<Image src={movie.poster} alt="Movie image" fill />
					) : (
						<MdOutlineMovie size={37} />
					)}
				</SearchResultItem.Icon>
				<SearchResultItem.Title title={movie.title} className="ml-1">
					{movie.title}
				</SearchResultItem.Title>
				<SearchResultItem.Children className="ml-auto">
					<FaArrowRightLong color="#8c8c8c" />
				</SearchResultItem.Children>
			</SearchResultItem>
		</Link>
	),
	potion: (potion: Potion) => (
		<Link href={`potions/${potion.id}`}>
			<SearchResultItem key={potion.id}>
				<SearchResultItem.Icon className="w-11 h-11 relative">
					{potion.image ? (
						<Image src={potion.image} alt="Potion image" fill />
					) : (
						<GiStandingPotion size={37} />
					)}
				</SearchResultItem.Icon>
				<SearchResultItem.Title title={potion.name} className="ml-1">
					{potion.name}
				</SearchResultItem.Title>
				<SearchResultItem.Children className="ml-auto">
					<FaArrowRightLong color="#8c8c8c" />
				</SearchResultItem.Children>
			</SearchResultItem>
		</Link>
	),
	spell: (spell: Spell) => (
		<Link href={`spells/${spell.id}`}>
			<SearchResultItem key={spell.id}>
				<SearchResultItem.Icon className="w-11 h-11 relative">
					{spell.image ? (
						<Image src={spell.image} alt="Spell image" fill />
					) : (
						<GiFairyWand size={37} />
					)}
				</SearchResultItem.Icon>
				<SearchResultItem.Title title={spell.name} className="ml-1">
					{spell.name}
				</SearchResultItem.Title>
				<SearchResultItem.Children className="ml-auto">
					<FaArrowRightLong color="#8c8c8c" />
				</SearchResultItem.Children>
			</SearchResultItem>
		</Link>
	),
}

const ResourceItem = ({ resourceType, resource }: ResourceItemProps) =>
	componentMap[resourceType](resource as never)

export { ResourceItem }
