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

  public static isToday(date: Date): boolean {
    const today = new Date();
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }
}
