import Link from 'next/link'
import { Avatar, AvatarImage } from '@/app/components/ui/avatar'
import { IoBookOutline } from 'react-icons/io5'
import { MdOutlineMovie } from 'react-icons/md'
import { GiFairyWand, GiStandingPotion } from 'react-icons/gi'
import { FaArrowRightLong } from 'react-icons/fa6'
const missingCharacterAvatarPath = '/missing_character.svg'
const missingCharacterWhiteAvatarPath = '/missing_character_white.svg'

const resources = [
	{
		icon: <IoBookOutline size={37} />,
		key: 'Book',
		value: 'Livros',
		href: '/books',
	},
	{
		icon: missingCharacterAvatarPath,
		key: 'Character',
		value: 'Personagens',
		href: '/characters',
	},
	{
		icon: <MdOutlineMovie size={37} />,
		key: 'Movie',
		value: 'Filmes',
		href: '/movies',
	},
	{
		icon: <GiStandingPotion size={37} />,
		key: 'Potion',
		value: 'Poções',
		href: '/potions',
	},
	{
		icon: <GiFairyWand size={37} />,
		key: 'Spell',
		value: 'Feitiços',
		href: '/spells',
	},
]

const ActionsList = () => {
	return (
		<div className="mt-[20rem] grid grid-cols-3 gap-3">
			{resources.map(resource => (
				<Link key={resource.key} href={resource.href}>
					<div className="group flex items-center space-x-4 rounded-md border p-4 bg-background hover:bg-green hover:text-minimal">
						{typeof resource.icon === 'string' ? (
							<Avatar className="w-[2.4rem] h-[2.4rem] relative">
								<AvatarImage
									width="auto"
									height="auto"
									src={missingCharacterAvatarPath}
									className="group-hover:hidden"
								/>
								<AvatarImage
									width="auto"
									height="auto"
									src={missingCharacterWhiteAvatarPath}
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
							<FaArrowRightLong
								color="#FFFFFF"
								className="hidden group-hover:block"
							/>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export { ActionsList }
