import { GetPotionRequest, getPotion } from '@/app/potions/services/get-potion'
import { useQuery } from '@tanstack/react-query'

export function useGetPotion(params?: GetPotionRequest) {
	const {
		data: potion,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: getPotion.getCacheKey({
			id: params?.id,
		}),
		queryFn: async () => {
			const pageResult = await getPotion.execute(params)

			if (pageResult) {
				return pageResult
			}

			return null
		},
		enabled: true,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		retry: 2,
		keepPreviousData: true,
	})

	return {
		potion,
		isFetching,
		isLoading,
	}
}
