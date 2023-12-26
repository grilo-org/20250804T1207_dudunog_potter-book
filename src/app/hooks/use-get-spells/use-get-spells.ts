import { useMutation } from '@tanstack/react-query'
import { getSpells } from '@/app/services/get-spells'

export function useGetSpells() {
	const { mutateAsync, isLoading, error } = useMutation(
		async (params: any) => getSpells.execute(params),
		{
			mutationKey: getSpells.getCacheKey(),
			cacheTime: Infinity,
		},
	)

	return {
		getv: mutateAsync,
		isLoading,
		error,
	}
}
