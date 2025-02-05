export interface AirQualityData {
  pm25: {
    values: number[];
  };
  co2: {
    values: number[];
  };
  ozone: {
    values: number[];
  };
}

export interface ChartData {
  name: string;
  value: number;
  fill: string;
}
