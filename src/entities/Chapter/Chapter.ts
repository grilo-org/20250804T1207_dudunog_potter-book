type ChapterProps = {
	id: string
	order: number
	summary: string
	title: string
}

export class Chapter {
	get id() {
		return this.props.id.toString()
	}

	get order() {
		return this.props.order
	}

	get summary() {
		return this.props.summary?.toString()
	}

	get title() {
		return this.props.title.toString()
	}

	constructor(private readonly props: ChapterProps) {}
}
