import { MovieProps } from '@/entities/Movie'
import { makeMovieResponse } from '@/tests/hooks/handlers'

const {
	data: { attributes, ...baseMovie },
} = makeMovieResponse()

export const MoviePropsMock: MovieProps = {
	...baseMovie,
	...attributes,
	boxOffice: attributes.box_office,
	musicComposers: attributes.music_composers,
	releaseDate: attributes.release_date,
	runningTime: attributes.running_time,
}
