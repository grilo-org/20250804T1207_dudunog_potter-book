import { useMutation } from '@tanstack/react-query'
import { getBooks } from '@/app/services/get-books'
import { getCharacters } from '@/app/services/get-characters'
import { getMovies } from '@/app/services/get-movies'
import { getPotions } from '@/app/services/get-potions'
import { getSpells } from '@/app/services/get-spells'

type GetResourcesRequest = {
	name: string
}

export function useGetResources() {
	const { mutateAsync, isLoading, error } = useMutation(
		async (params: GetResourcesRequest) => {
			const calls = [
				getBooks.execute(params),
				getCharacters.execute(params),
				getMovies.execute(params),
				getPotions.execute(params),
				getSpells.execute(params),
			]

			const [books, characters, movies, potions, spells] =
				await Promise.all(calls)

			return [...books, ...characters, ...movies, ...potions, ...spells]
		},
		{
			mutationKey: getBooks.getCacheKey(),
			cacheTime: Infinity,
		},
	)

	return {
		getResources: mutateAsync,
		isLoading,
		error,
	}
}
