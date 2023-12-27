import { useMutation, useQuery } from '@tanstack/react-query'
import { GetPotionsRequest, getPotions } from '@/app/services/get-potions'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

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
				currentPage: params?.currentPage || DEFAULT_PAGE,
				rowsPerPage: params?.rowsPerPage || DEFAULT_PAGE_SIZE,
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
