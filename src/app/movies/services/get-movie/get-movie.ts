import { BaseApiResponse, ApiService } from '@/shared/core'
import { Movie } from '@/entities/Movie'
import { httpClient } from '@/infra'

export type GetMovieAPIResponse = BaseApiResponse<{
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
		screenwriters: string[]
		summary: string
		title: string
		trailer: string
		wiki: string
	}
}>

export type GetMovieDTO = Movie | null

export type GetMovieRequest = {
	id: string
}

type GetMovieResponse = Promise<GetMovieDTO>

export const getMovie = new ApiService<GetMovieRequest, GetMovieResponse>({
	cacheKey: 'movie',
	handler: async request => {
		const {
			data: { data: movie },
		} = await httpClient.get<GetMovieAPIResponse>(`/movies/${request.id}`)

		if (!movie) {
			return null
		}

		return new Movie({
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
			summary: movie.attributes.summary,
			title: movie.attributes.title,
			trailer: movie.attributes.trailer,
			wiki: movie.attributes.wiki,
		})
	},
})
