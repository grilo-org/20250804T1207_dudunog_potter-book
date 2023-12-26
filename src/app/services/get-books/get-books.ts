import { BaseApiResponse, ApiService } from '@/app/core'
import { Book } from '@/app/entities/Book'
import { httpClient } from '@/app/infra'

export type GetBooksAPIResponse = BaseApiResponse<
	{
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
	}[]
>

export type GetBooksDTO = Book

export type GetBooksRequest = {
	name?: string
}

type GetBooksResponse = Promise<GetBooksDTO[]>

export const getBooks = new ApiService<GetBooksRequest, GetBooksResponse>({
	cacheKey: 'books',
	handler: async request => {
		const { data } = await httpClient.get<GetBooksAPIResponse>(
			`/books?${request.name ? `filter[title_cont]=${request.name}` : ''}`,
		)

		return data.data.map(
			book =>
				new Book({
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
				}),
		)
	},
})
