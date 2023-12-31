import { BaseApiResponse, ApiService } from '@/shared/core'
import { Book } from '@/entities/Book'
import { httpClient } from '@/infra'

export type GetBookAPIResponse = BaseApiResponse<{
	id: string
	type: string
	attributes: {
		author: string
		cover: string
		dedication: string
		pages: number
		release_date: string
		slug: string
		summary: string
		title: string
		wiki: string
	}
}>

export type GetBookDTO = Book | null

export type GetBookRequest = {
	id: string
}

type GetBookResponse = Promise<GetBookDTO>

export const getBook = new ApiService<GetBookRequest, GetBookResponse>({
	cacheKey: 'book',
	handler: async request => {
		const {
			data: { data: book },
		} = await httpClient.get<GetBookAPIResponse>(`/books/${request.id}`)

		if (!book) {
			return null
		}

		return new Book({
			id: book.id,
			type: book.type,
			author: book.attributes.author,
			cover: book.attributes.cover,
			dedication: book.attributes.dedication,
			pages: book.attributes.pages,
			releaseDate: book.attributes.release_date,
			slug: book.attributes.slug,
			summary: book.attributes.summary,
			title: book.attributes.title,
			wiki: book.attributes.wiki,
		})
	},
})
