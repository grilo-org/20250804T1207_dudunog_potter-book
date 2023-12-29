import { ReactNode } from 'react'
import {
	booksErrorResponseHandler,
	booksSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const handlers = [booksSuccessResponseHandler, booksErrorResponseHandler]

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

export const wrapper = ({ children }: { children: ReactNode }) => {
	const queryClient = createQueryClient()
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
