import { Fragment } from 'react'
import { useGetCharacter } from '@/app/characters/hooks/use-get-character'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'

type TabsKey = 'aliasNames' | 'familyMembers' | 'jobs' | 'romances' | 'wands'

const tabs: { key: TabsKey; label: string }[] = [
	{
		key: 'aliasNames',
		label: 'Nome(s) alternativo(s)',
	},
	{
		key: 'familyMembers',
		label: 'Membro(s) da família',
	},
	{
		key: 'jobs',
		label: 'Trabalhos',
	},
	{
		key: 'romances',
		label: 'Romances',
	},
	{
		key: 'wands',
		label: 'Varinhas',
	},
]

type CharacterTabsListProps = {
	characterId: string
}

const CharacterTabsList = ({ characterId }: CharacterTabsListProps) => {
	const { character } = useGetCharacter({
		id: String(characterId),
	})

	return (
		<Tabs
			data-testid="character-tabs"
			defaultValue={
				tabs.find(
					tab => character?.[tab.key] && character?.[tab.key].length > 0,
				)?.key
			}
			className="mt-2 w-full max-w-[49rem]"
		>
			{tabs.some(
				tab => character?.[tab.key] && character?.[tab.key].length > 0,
			) && (
				<Fragment>
					<TabsList className="w-full justify-around bg-green">
						{tabs.map(tab => {
							if (character?.[tab.key] && character?.[tab.key].length > 0) {
								return (
									<TabsTrigger
										data-testid={`${tab.key}-tab-item-header`}
										key={tab.key}
										value={tab.key}
										className="text-minimal hover:bg-minimal hover:text-green"
									>
										{tab.label}
									</TabsTrigger>
								)
							}
						})}
					</TabsList>
					{tabs.map(tab => (
						<TabsContent
							data-testid={`${tab.key}-tab-item-content`}
							key={tab.key}
							value={tab.key}
						>
							{character?.[tab.key]?.map?.((item: string) => (
								<li key={item}>{item}</li>
							))}
						</TabsContent>
					))}
				</Fragment>
			)}
		</Tabs>
	)
}

export { CharacterTabsList }
