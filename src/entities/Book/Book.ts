export type BookProps = {
	id: string
	type: string
	author: string
	cover: string
	dedication: string
	pages: number
	releaseDate: string
	slug: string
	summary: string
	title: string
	wiki: string
}

export class Book {
	get id() {
		return this.props.id.toString()
	}

	get type() {
		return this.props.type.toString()
	}

	get author() {
		return this.props.author.toString()
	}

	get cover() {
		return this.props.cover.toString()
	}

	get dedication() {
		return this.props.dedication.toString()
	}

	get pages() {
		return this.props.pages
	}

	get releaseDate() {
		return this.props.releaseDate.toString()
	}

	get slug() {
		return this.props.slug.toString()
	}

	get summary() {
		return this.props.summary.toString()
	}

	get title() {
		return this.props.title.toString()
	}

	get wiki() {
		return this.props.wiki.toString()
	}

	constructor(private readonly props: BookProps) {}
}
