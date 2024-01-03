import { useGetBooks } from '@/shared/hooks/use-get-books'
import { BooksList } from '@/app/books/components/books-list'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getBooksEmptyResponseHandler,
	getBooksErrorResponseHandler,
	getBooksSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { render, renderHook, screen, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetBooks({
				name: '',
			}),
		{ wrapper },
	)

	render(<BooksList />, {
		wrapper,
	})

	return {
		result,
	}
}

describe('books-list component', () => {
	test('renders skeleton when loading or fetching', async () => {
		const { result } = makeSut(getBooksSuccessResponseHandler)

		const skeletons = screen.getAllByTestId('book-skeleton-item')

		expect(result.current.isLoading).toBeTruthy()
		expect(skeletons).toHaveLength(6)
	})

	test('should renders books list correctly', async () => {
		const { result } = makeSut(getBooksSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const bookItems = screen.getAllByTestId('book-item')
			expect(bookItems).toHaveLength(5)
		})
	})

	test('should renders no books message when books list is empty', async () => {
		const { result } = makeSut(getBooksEmptyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const noBooksMessage = screen.getByText(
				'Não há livros para serem listados',
			)
			expect(noBooksMessage).toBeInTheDocument()
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getBooksErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()

			const error = screen.getByTestId('error')
			expect(error).toBeInTheDocument()
		})
	})
})
