import { useMutation } from '@tanstack/react-query'
import { getMovies } from '@/app/services/get-movies'

export function useGetMovies() {
	const { mutateAsync, isLoading, error } = useMutation(
		async (params: any) => getMovies.execute(params),
		{
			mutationKey: getMovies.getCacheKey(),
			cacheTime: Infinity,
		},
	)

	return {
		getCharacters: mutateAsync,
		isLoading,
		error,
	}
}
