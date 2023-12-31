'use client'

import { BooksList } from '@/app/books/components/books-list'

export default function Books() {
	return (
		<div className="mt-4 mb-8 max-w-7xl w-full flex flex-col items-center">
			<div>
				<h2 className="mt-6 text-minimal text-3xl font-bold">Livros</h2>

				<BooksList />
			</div>
		</div>
	)
}
