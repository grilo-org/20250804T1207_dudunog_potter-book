import { Pagination } from '@/entities/Pagination'
import { Book } from '@/entities/Book'
import { Movie } from '@/entities/Movie'
import { getBooks } from '@/shared/services/get-books'
import {
	GetCharactersDTO,
	getCharacters,
} from '@/shared/services/get-characters'
import { getMovies } from '@/shared/services/get-movies'
import { GetPotionsDTO, getPotions } from '@/shared/services/get-potions'
import { GetSpellsDTO, getSpells } from '@/shared/services/get-spells'
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
