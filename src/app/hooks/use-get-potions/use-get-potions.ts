import { useMutation } from '@tanstack/react-query'
import { getPotions } from '@/app/services/get-potions'

export function useGetPotions() {
	const { mutateAsync, isLoading, error } = useMutation(
		async (params: any) => getPotions.execute(params),
		{
			mutationKey: getPotions.getCacheKey(),
			cacheTime: Infinity,
		},
	)

	return {
		getPotions: mutateAsync,
		isLoading,
		error,
	}
}
