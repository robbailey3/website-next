class RunUtilsService {
  public convertMillisecondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const sec = Math.floor(seconds - hours * 3600 - minutes * 60);

    let time = '';
    if (hours > 0) {
      time += hours.toString().padStart(2, '0') + ':';
    }
    time += minutes.toString().padStart(2, '0') + ':';
    time += sec.toString().padStart(2, '0');

    return time;
  }

  public convertMetersToMiles(meters: number, precision: number = 2): string {
    return (meters * 0.000621371).toFixed(precision);
  }

  public convertMetersToKilometers(meters: number): number {
    return meters * 0.001;
  }

  public convertMetersPerSecondToMinutesPerMile(metersPerSecond: number) {
    const d = new Date((26.8224 / metersPerSecond) * 1000 * 60);
    return `${d.getMinutes()}:${d.getSeconds()}`;
  }
}

export default new RunUtilsService();
