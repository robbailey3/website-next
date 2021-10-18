export class DataResponse<T> {
	constructor(public data: T, public status: number, public error?: string) {}
}
