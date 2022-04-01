export interface TotalsDataDateObject {
  year: number;
  month: number;
}

export interface TotalsData {
  _id: TotalsDataDateObject;
  totalDistance: number;
  totalElevationGain: number;
  count: number;
}
