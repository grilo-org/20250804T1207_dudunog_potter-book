import { BookProps } from '@/entities/Book'
import { makeBookResponse } from '@/tests/hooks/handlers'

const {
	data: { attributes, ...baseBook },
} = makeBookResponse()

export const BookPropsMock: BookProps = {
	...baseBook,
	...attributes,
	releaseDate: attributes.release_date,
}
