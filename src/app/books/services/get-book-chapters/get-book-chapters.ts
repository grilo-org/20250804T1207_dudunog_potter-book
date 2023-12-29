import { BaseApiResponse, ApiService } from '@/shared/core'
import { Chapter } from '@/entities/Chapter'
import { httpClient } from '@/infra'

export type GetBookChaptersAPIResponse = BaseApiResponse<
	{
		id: string
		type: string
		attributes: {
			order: number
			slug: string
			summary: string
			title: string
		}
	}[]
>

export type GetBookDTO = Chapter

export type GetBookChaptersRequest = {
	id: string
}

type GetBookChaptersResponse = Promise<GetBookDTO[]>

export const getBookChapters = new ApiService<
	GetBookChaptersRequest,
	GetBookChaptersResponse
>({
	cacheKey: 'book-chapters',
	handler: async request => {
		const { data } = await httpClient.get<GetBookChaptersAPIResponse>(
			`/books/${request.id}/chapters`,
		)

		return data.data.map(
			chapter =>
				new Chapter({
					id: chapter.id,
					type: chapter.type,
					order: chapter.attributes.order,
					slug: chapter.attributes.slug,
					summary: chapter.attributes.summary,
					title: chapter.attributes.title,
				}),
		)
	},
})
