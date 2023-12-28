import {
	GetCharacterRequest,
	getCharacter,
} from '@/app/characters/services/get-character'
import { useQuery } from '@tanstack/react-query'

export function useGetCharacter(params?: GetCharacterRequest) {
	const {
		data: character,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: getCharacter.getCacheKey({
			id: params?.id,
		}),
		queryFn: async () => {
			const pageResult = await getCharacter.execute(params)

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
		character,
		isFetching,
		isLoading,
	}
}
