type ApiServiceProps<RequestType, ReturnType> = {
	cacheKey?: string
	handler: (req: RequestType) => ReturnType
}

export class ApiService<
	RequestType,
	ReturnType,
	CacheKeySufixes extends Record<string, string | number> = any,
> {
	getCacheKey(sufixes?: CacheKeySufixes): string[] {
		const sufixesAsArr = Object.values(sufixes || {})
		const validSufixes = sufixesAsArr
			.filter(Boolean)
			.map(s => s!.toString()) as string[]

		return this.props.cacheKey
			? [this.props.cacheKey, ...validSufixes]
			: validSufixes
	}

	execute(props?: RequestType) {
		return this.props.handler(props as RequestType)
	}

	constructor(
		private readonly props: ApiServiceProps<RequestType, ReturnType>,
	) {}
}
