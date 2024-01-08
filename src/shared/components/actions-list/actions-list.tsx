import Link from 'next/link'
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { IoBookOutline } from 'react-icons/io5'
import { MdOutlineMovie } from 'react-icons/md'
import { GiFairyWand, GiStandingPotion } from 'react-icons/gi'
import { FaArrowRightLong } from 'react-icons/fa6'
const missingCharacterAvatarPath = '/missing_character.svg'
const missingCharacterWhiteAvatarPath = '/missing_character_white.svg'

type ResourceProps = {
	icon: string | JSX.Element
	key: string
	value: string
	href: string
	iconOnHover?: string
}

const resources: ResourceProps[] = [
	{
		icon: <IoBookOutline size={37} />,
		key: 'book',
		value: 'Livros',
		href: '/books',
	},
	{
		icon: missingCharacterAvatarPath,
		key: 'character',
		value: 'Personagens',
		href: '/characters',
		iconOnHover: missingCharacterWhiteAvatarPath,
	},
	{
		icon: <MdOutlineMovie size={37} />,
		key: 'movie',
		value: 'Filmes',
		href: '/movies',
	},
	{
		icon: <GiStandingPotion size={37} />,
		key: 'potion',
		value: 'Poções',
		href: '/potions',
	},
	{
		icon: <GiFairyWand size={37} />,
		key: 'spell',
		value: 'Feitiços',
		href: '/spells',
	},
]

const ActionsList = () => {
	return (
		<div
			data-testid="actions-list"
			className="mt-[20rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-green"
		>
			{resources.map(resource => (
				<Link
					key={resource.key}
					data-testid={`${resource.key}-listing-item`}
					href={resource.href}
				>
					<div className="group flex items-center space-x-4 rounded-md border p-4 bg-background transition-all hover:scale-105 hover:bg-green hover:text-minimal">
						{typeof resource.icon === 'string' ? (
							<Avatar className="w-[2.4rem] h-[2.4rem] relative">
								<AvatarImage
									width="auto"
									height="auto"
									src={resource.icon}
									className="group-hover:hidden"
								/>
								<AvatarImage
									width="auto"
									height="auto"
									src={String(resource.iconOnHover) ?? resource.icon}
									className="hidden group-hover:block"
								/>
							</Avatar>
						) : (
							<div>{resource.icon}</div>
						)}
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium leading-none">
								{resource.value}
							</p>
						</div>
						<div>
							<FaArrowRightLong
								color="#8c8c8c"
								className="group-hover:hidden"
							/>
							<FaArrowRightLong className="hidden group-hover:block" />
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export { ActionsList }
