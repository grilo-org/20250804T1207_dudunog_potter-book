import { useMutation } from '@tanstack/react-query'
import { getCharacters } from '@/app/services/get-characters'

export function useGetCharacters() {
	const { mutateAsync, isLoading, error } = useMutation(
		async (params: any) => getCharacters.execute(params),
		{
			mutationKey: getCharacters.getCacheKey(),
			cacheTime: Infinity,
		},
	)

	return {
		getCharacters: mutateAsync,
		isLoading,
		error,
	}
}
