import { ReactNode } from 'react'
import {
	getBooksErrorResponseHandler,
	getBooksSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const handlers = [
	getBooksSuccessResponseHandler,
	getBooksErrorResponseHandler,
]

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
