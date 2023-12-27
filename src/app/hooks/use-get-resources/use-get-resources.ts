import { Pagination } from '@/app/entities/Pagination'
import { Book } from '@/app/entities/Book'
import { Movie } from '@/app/entities/Movie'
import { getBooks } from '@/app/services/get-books'
import { GetCharactersDTO, getCharacters } from '@/app/services/get-characters'
import { getMovies } from '@/app/services/get-movies'
import { GetPotionsDTO, getPotions } from '@/app/services/get-potions'
import { GetSpellsDTO, getSpells } from '@/app/services/get-spells'
import { useMutation } from '@tanstack/react-query'

type GetResourcesRequest = {
	name: string
}

export function useGetResources() {
	const { mutateAsync, isLoading, error } = useMutation(
		async (params: GetResourcesRequest) => {
			const calls = [
				getBooks.execute(params),
				getCharacters.execute({
					name: params.name,
					currentPage: 1,
					rowsPerPage: 999999,
				}),
				getMovies.execute(params),
				getPotions.execute({
					name: params.name,
					currentPage: 1,
					rowsPerPage: 999999,
				}),
				getSpells.execute({
					name: params.name,
					currentPage: 1,
					rowsPerPage: 999999,
				}),
			]

			const [books, characters, movies, potions, spells] =
				await Promise.all(calls)

			return [
				...(books as Book[]),
				...(characters as Pagination<GetCharactersDTO[]>).data,
				...(movies as Movie[]),
				...(potions as Pagination<GetPotionsDTO[]>).data,
				...(spells as Pagination<GetSpellsDTO[]>).data,
			]
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
