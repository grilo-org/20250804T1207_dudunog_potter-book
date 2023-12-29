'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/shared/components/ui/input'
import { useDebounce } from '@/shared/hooks/useDebounce'

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onSearch: (search: string) => void
}

const defaultDebounceTime = 750

const SearchField: React.FC<SearchFieldProps> = ({
	value,
	onSearch = () => {},
	...rest
}) => {
	const [search, setSearch] = useState(value)
	const [debouncedSearch, setDebouncedSearch] = useDebounce(
		search,
		defaultDebounceTime,
	)
	const [searchPerformed, setSearchPerformed] = useState(false)

	const canSearch = (newSearch: string): boolean => {
		return (
			newSearch.length >= 4 || newSearch.length === 0 || newSearch !== search
		)
	}

	const makeSearch = (newSearch: string): void => {
		if (canSearch(newSearch)) {
			onSearch(newSearch)
			setSearchPerformed(true)
		}
	}

	const handleSearch = (newSearch: string): void => {
		setSearch(newSearch)
		setDebouncedSearch(newSearch.trim())
		setSearchPerformed(true)
	}

	useEffect(() => {
		if (searchPerformed) {
			makeSearch(debouncedSearch)
		}
	}, [debouncedSearch])

	return (
		<Input
			type="text"
			name="search"
			placeholder="Digite a localidade..."
			value={search}
			onChange={e => handleSearch(e.target.value)}
			{...rest}
		/>
	)
}

export { SearchField }
