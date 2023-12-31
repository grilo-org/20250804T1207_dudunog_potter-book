import { GetPotionRequest, getPotion } from '@/app/potions/services/get-potion'
import { useQuery } from '@tanstack/react-query'

export function useGetPotion(params?: GetPotionRequest) {
	const {
		data: potion,
		isLoading,
		isFetching,
		isSuccess,
		isError,
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
		keepPreviousData: true,
	})

	return {
		potion,
		isFetching,
		isLoading,
		isSuccess,
		isError,
	}
}
