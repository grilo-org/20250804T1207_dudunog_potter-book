import { GetSpellRequest, getSpell } from '@/app/spells/services/get-spell'
import { useQuery } from '@tanstack/react-query'

export function useGetSpell(params?: GetSpellRequest) {
	const {
		data: spell,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: getSpell.getCacheKey({
			id: params?.id,
		}),
		queryFn: async () => {
			const pageResult = await getSpell.execute(params)

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
		spell,
		isFetching,
		isLoading,
	}
}
