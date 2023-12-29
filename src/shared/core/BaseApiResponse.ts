export type BaseApiMetadata = {
	pagination: {
		current: number
		last: number
		next: number
		records: number
	}
}

export type BaseApiResponse<ResponseType> = {
	data: ResponseType
	meta: BaseApiMetadata
}
