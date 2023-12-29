import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { GetPotionsRequest, getPotions } from '@/shared/services/get-potions'
import { useQuery } from '@tanstack/react-query'

export function useGetPotions(params?: GetPotionsRequest) {
	const {
		data: potions,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: getPotions.getCacheKey({
			currentPage: params?.currentPage,
			rowsPerPage: params?.rowsPerPage,
			name: params?.name,
		}),
		queryFn: async () => {
			const pageResult = await getPotions.execute({
				currentPage: params?.currentPage || DEFAULT_PAGINATION_PAGE,
				rowsPerPage: params?.rowsPerPage || DEFAULT_PAGINATION_PAGE_SIZE,
				name: params?.name,
			})

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
		potions,
		isFetching,
		isLoading,
	}
}
