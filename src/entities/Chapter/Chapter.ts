type ChapterProps = {
	id: string
	type: string
	order: number
	slug: string
	summary: string
	title: string
}

export class Chapter {
	get id() {
		return this.props.id.toString()
	}

	get type() {
		return this.props.type.toString()
	}

	get order() {
		return this.props.order
	}

	get slug() {
		return this.props.slug.toString()
	}

	get summary() {
		return this.props.summary?.toString()
	}

	get title() {
		return this.props.title.toString()
	}

	constructor(private readonly props: ChapterProps) {}
}
