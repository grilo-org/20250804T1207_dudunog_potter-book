import { Fragment } from 'react'
import { useGetPotion } from '@/app/potions/hooks/use-get-potion'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'

type TabsKey = 'ingredients' | 'inventors' | 'manufacturers' | 'characteristics'

const tabs: { key: TabsKey; label: string }[] = [
	{
		key: 'ingredients',
		label: 'Ingrediente(s)',
	},
	{
		key: 'inventors',
		label: 'Inventor(es)',
	},
	{
		key: 'manufacturers',
		label: 'Fabricante(s)',
	},
	{
		key: 'characteristics',
		label: 'Características',
	},
]

type PotionTabsListProps = {
	potionId: string
}

const PotionTabsList = ({ potionId }: PotionTabsListProps) => {
	const { potion } = useGetPotion({
		id: String(potionId),
	})

	return (
		<Tabs
			defaultValue={
				tabs.find(tab => potion?.[tab.key] && potion?.[tab.key].length > 0)?.key
			}
			className="mt-2 w-full max-w-[49rem]"
		>
			{tabs.some(tab => potion?.[tab.key] && potion?.[tab.key].length > 0) && (
				<Fragment>
					<TabsList className="w-full justify-around bg-green">
						{tabs.map(tab => {
							if (potion?.[tab.key] && potion?.[tab.key].length > 0) {
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
							{potion?.[tab.key]
								?.split(',')
								?.map?.((item: string) => <li key={item}>{item}</li>)}
						</TabsContent>
					))}
				</Fragment>
			)}
		</Tabs>
	)
}

export { PotionTabsList }
