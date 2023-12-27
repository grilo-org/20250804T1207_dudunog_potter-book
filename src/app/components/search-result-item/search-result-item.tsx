'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SearchResultItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const SearchResultItemContext = React.createContext({})

const SearchResultItem = ({ children, ...rest }: SearchResultItemProps) => {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState('')
	const toggle = React.useCallback(() => setOpen(state => !state), [])

	return (
		<SearchResultItemContext.Provider value={{ open, toggle, value, setValue }}>
			<div className="flex items-center gap-2" {...rest}>
				{children}
			</div>
		</SearchResultItemContext.Provider>
	)
}

interface IconProps extends React.HTMLAttributes<HTMLElement> {}

interface TitleProps extends React.InputHTMLAttributes<HTMLParagraphElement> {
	title: string
}

interface ChildrenProps extends React.HTMLAttributes<HTMLElement> {}

const Icon = ({ children, ...rest }: IconProps) => {
	return <div {...rest}>{children}</div>
}

const Title = ({ title, className, ...rest }: TitleProps) => {
	return (
		<p className={cn('max-w-[14rem] sm:max-w-none', className)} {...rest}>
			{title}
		</p>
	)
}

const Children = ({ children, ...rest }: ChildrenProps) => {
	return <div {...rest}>{children}</div>
}

SearchResultItem.Icon = Icon
SearchResultItem.Title = Title
SearchResultItem.Children = Children

export { SearchResultItem }
