import { BaseApiResponse, ApiService } from '@/app/core'
import { Movie } from '@/app/entities/Movie'
import { httpClient } from '@/app/infra'

export type GetMoviesAPIResponse = BaseApiResponse<
	{
		id: string
		type: string
		attributes: {
			box_office: string
			budget: string
			cinematographers: string[]
			directors: string[]
			distributors: string[]
			editors: string[]
			music_composers: string[]
			poster: string
			producers: string[]
			rating: string
			release_date: string
			running_time: string
			screenwriters: string
			slug: string
			summary: string
			title: string
			trailer: string
			wiki: string
		}
	}[]
>

export type GetMoviesDTO = Movie

type GetMoviesRequest = {
	name: string
}

type GetMoviesResponse = Promise<GetMoviesDTO[]>

export const getMovies = new ApiService<GetMoviesRequest, GetMoviesResponse>({
	cacheKey: 'movies',
	handler: async request => {
		const { data } = await httpClient.get<GetMoviesAPIResponse>(
			`/movies?filter[title_cont]=${request.name}`,
		)

		return data.data.map(
			movie =>
				new Movie({
					id: movie.id,
					type: movie.type,
					boxOffice: movie.attributes.box_office,
					budget: movie.attributes.budget,
					cinematographers: movie.attributes.cinematographers,
					directors: movie.attributes.directors,
					distributors: movie.attributes.distributors,
					editors: movie.attributes.editors,
					musicComposers: movie.attributes.music_composers,
					poster: movie.attributes.poster,
					producers: movie.attributes.producers,
					rating: movie.attributes.rating,
					releaseDate: movie.attributes.release_date,
					runningTime: movie.attributes.running_time,
					screenwriters: movie.attributes.screenwriters,
					slug: movie.attributes.slug,
					summary: movie.attributes.summary,
					title: movie.attributes.title,
					trailer: movie.attributes.trailer,
					wiki: movie.attributes.wiki,
				}),
		)
	},
})
