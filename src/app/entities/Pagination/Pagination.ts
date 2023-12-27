type PaginationProps<T = any> = {
	itemsPerPage: number
	page: number
	totalPages: number
	totalRows?: number
	data: T
}

export class Pagination<T extends Array<any> = any> {
	constructor(private readonly props: PaginationProps<T>) {
		this.data = props.data
	}

	public data: T

	setData(newData: T) {
		this.data = newData
	}

	get previousPage(): number {
		if (this.props.page > 1) {
			return this.props.page - 1
		}

		return this.props.page
	}

	get nextPage(): number | null {
		if (this.props.page < this.lastPage) {
			return this.props.page + 1
		}

		return null
	}

	get page(): number {
		return this.props.page
	}

	get lastPage(): number {
		return this.props.totalPages
	}

	get totalRows(): number {
		return this.props.totalRows || 0
	}

	get itemsPerPage(): number {
		return this.props.itemsPerPage
	}

	get firstPage(): number {
		return 1
	}

	get reachedEnd(): boolean {
		return this.props.totalPages === this.props.page
	}

	public static create(props: PaginationProps): Pagination {
		return new Pagination(props)
	}
}
