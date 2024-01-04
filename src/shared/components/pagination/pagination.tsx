import { Fragment, ReactElement } from 'react'
import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as PaginationUi,
} from '@/shared/components/ui/pagination'
import { cn } from '@/lib/utils'

type PaginationProps = {
	totalCountOfRegisters?: number
	registersPerPage?: number
	currentPage?: number
	onPageChange: (page: number) => void
}

const siblingsCount = 1

const generatePagesArray = (from: number, to: number): number[] => {
	return [...new Array(to - from)]
		.map((_, index) => {
			return from + index + 1
		})
		.filter(page => page > 0)
}

const Pagination = ({
	totalCountOfRegisters = 0,
	registersPerPage = 10,
	currentPage = 1,
	onPageChange,
	...rest
}: PaginationProps): ReactElement => {
	const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

	const previousPages =
		currentPage > 1
			? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
			: []

	const nextPages =
		currentPage < lastPage
			? generatePagesArray(
					currentPage,
					Math.min(currentPage + siblingsCount, lastPage),
				)
			: []

	const initialItem = (currentPage - 1) * registersPerPage + 1
	const lastItem =
		(currentPage - 1) * registersPerPage + registersPerPage >
		totalCountOfRegisters
			? totalCountOfRegisters
			: (currentPage - 1) * registersPerPage + registersPerPage

	return (
		<PaginationUi className="my-4 flex-col gap-4 items-center justify-between text-minimal md:flex-row">
			<div>
				<strong>{lastItem === 0 ? 0 : initialItem}</strong> -{' '}
				<strong>{lastItem}</strong> de <strong>{totalCountOfRegisters}</strong>
			</div>
			<PaginationContent className="flex flex-col sm:flex-row">
				<PaginationItem>
					<PaginationPrevious
						onClick={() =>
							onPageChange(currentPage === 1 ? 1 : currentPage - 1)
						}
						className={cn({
							'opacity-50 hover:bg-inherit hover:text-inherit hover:cursor-not-allowed':
								currentPage === 1,
						})}
						href=""
					/>
				</PaginationItem>
				<div className="flex gap-1">
					{currentPage > 1 + siblingsCount && (
						<Fragment>
							<PaginationItem data-testid="pagination-item-1">
								<PaginationLink onClick={() => onPageChange(1)} href="#">
									1
								</PaginationLink>
							</PaginationItem>
							{currentPage > 2 + siblingsCount && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
						</Fragment>
					)}
					{previousPages.length > 0 &&
						previousPages.map(page => {
							return (
								<PaginationItem
									data-testid={`pagination-item-${page}`}
									key={page}
								>
									<PaginationLink onClick={() => onPageChange(page)} href="#">
										{page}
									</PaginationLink>
								</PaginationItem>
							)
						})}
					<PaginationItem
						data-testid={`pagination-item-${currentPage}`}
						className="bg-minimal text-black rounded-md"
					>
						<PaginationLink onClick={() => onPageChange(currentPage)} href="#">
							{currentPage}
						</PaginationLink>
					</PaginationItem>
					{nextPages.length > 0 &&
						nextPages.map(page => {
							return (
								<PaginationItem
									data-testid={`pagination-item-${page}`}
									key={page}
								>
									<PaginationLink onClick={() => onPageChange(page)} href="#">
										{page}
									</PaginationLink>
								</PaginationItem>
							)
						})}
					{currentPage < lastPage - siblingsCount && (
						<Fragment>
							{currentPage < lastPage - siblingsCount - 1 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							<PaginationItem data-testid={`pagination-item-${lastPage}`}>
								<PaginationLink onClick={() => onPageChange(lastPage)} href="#">
									{lastPage}
								</PaginationLink>
							</PaginationItem>
						</Fragment>
					)}
				</div>
				<PaginationItem>
					<PaginationNext
						onClick={() =>
							onPageChange(
								nextPages.length === 0 ? currentPage : currentPage + 1,
							)
						}
						className={cn({
							'opacity-50 hover:bg-inherit hover:text-inherit hover:cursor-not-allowed':
								nextPages.length === 0,
						})}
						href=""
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationUi>
	)
}

export { Pagination }
