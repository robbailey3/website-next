export class DateTime {
	public static format(
		date: Date,
		locale: string,
		options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
	): string {
		const intl = new Intl.DateTimeFormat(locale, options);
		return intl.format(date);
	}
}
