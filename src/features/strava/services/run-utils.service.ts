export class RunUtils {
  public static convertMetersPerSecondToMinutesPerKm(
    metersPerSecond: number
  ): string {
    const minsPerKm = 1 / ((metersPerSecond / 1000) * 60);

    const minsPerKmRounded = Math.round(minsPerKm);
    const seconds = Math.round((minsPerKm % 1) * 60);

    return `${String(minsPerKmRounded).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
  }

  public static convertSecondsToHoursMinutesSeconds(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    const hoursString =
      hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
    const minutesString =
      minutes > 0 ? `${minutes.toString().padStart(2, '0')}:` : '';
    const secondsString = secondsLeft.toString().padStart(2, '0');

    return `${hoursString}${minutesString}${secondsString}`;
  }
}
