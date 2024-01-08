export type MovieProps = {
	id: string
	type: string
	boxOffice: string
	budget: string
	cinematographers: string[]
	directors: string[]
	distributors: string[]
	editors: string[]
	musicComposers: string[]
	poster: string
	producers: string[]
	rating: string
	releaseDate: string
	runningTime: string
	screenwriters: string[]
	summary: string
	title: string
	trailer: string
	wiki: string
}

export class Movie {
	get id() {
		return this.props.id.toString()
	}

	get type() {
		return this.props.type.toString()
	}

	get boxOffice() {
		return this.props.boxOffice.toString()
	}

	get budget() {
		return this.props.budget.toString()
	}

	get cinematographers() {
		return this.props.cinematographers
	}

	get directors() {
		return this.props.directors
	}

	get distributors() {
		return this.props.distributors
	}

	get editors() {
		return this.props.editors
	}

	get musicComposers() {
		return this.props.musicComposers
	}

	get poster() {
		return this.props.poster.toString()
	}

	get producers() {
		return this.props.producers
	}

	get rating() {
		return this.props.rating.toString()
	}

	get releaseDate() {
		return this.props.releaseDate.toString()
	}

	get runningTime() {
		return this.props.runningTime.toString()
	}

	get screenwriters() {
		return this.props.screenwriters
	}

	get summary() {
		return this.props.summary.toString()
	}

	get title() {
		return this.props.title.toString()
	}

	get trailer() {
		return this.props.trailer.toString()
	}

	get wiki() {
		return this.props.wiki.toString()
	}

	constructor(private readonly props: MovieProps) {}
}
