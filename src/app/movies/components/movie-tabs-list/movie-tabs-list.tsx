import { Fragment } from 'react'
import { useGetMovie } from '@/app/movies/hooks/use-get-movie'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/ui/tabs'

type TabsKey =
	| 'cinematographers'
	| 'directors'
	| 'editors'
	| 'musicComposers'
	| 'producers'
	| 'screenwriters'

const tabs: { key: TabsKey; label: string }[] = [
	{
		key: 'cinematographers',
		label: 'Nome(s) alternativo(s)',
	},
	{
		key: 'directors',
		label: 'Membro(s) da família',
	},
	{
		key: 'editors',
		label: 'Trabalhos',
	},
	{
		key: 'musicComposers',
		label: 'Romances',
	},
	{
		key: 'producers',
		label: 'Varinhas',
	},
	{
		key: 'screenwriters',
		label: 'Varinhas',
	},
]

type MovieTabsListProps = {
	movieId: string
}

const MovieTabsList = ({ movieId }: MovieTabsListProps) => {
	const { movie } = useGetMovie({
		id: String(movieId),
	})

	return (
		<Tabs
			defaultValue={
				tabs.find(tab => movie?.[tab.key] && movie?.[tab.key].length > 0)?.key
			}
			className="mt-2 w-full max-w-[49rem]"
		>
			{tabs.some(tab => movie?.[tab.key] && movie?.[tab.key].length > 0) && (
				<Fragment>
					<TabsList className="w-full justify-around bg-green">
						{tabs.map(tab => {
							if (movie?.[tab.key] && movie?.[tab.key].length > 0) {
								return (
									<TabsTrigger
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
						<TabsContent key={tab.key} value={tab.key}>
							{movie?.[tab.key]?.map?.((item: string) => (
								<li key={item}>{item}</li>
							))}
						</TabsContent>
					))}
				</Fragment>
			)}
		</Tabs>
	)
}

export { MovieTabsList }
