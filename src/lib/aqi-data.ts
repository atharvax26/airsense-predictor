// Historical AQI data with seasonal patterns (2020-2025)
export interface AQIDataPoint {
  year: number;
  month: number;
  aqi: number;
}

// Generate realistic historical data with seasonal variations
// Winter months (Nov-Feb) tend to have worse AQI due to heating/inversions
// Summer months may have ozone issues
export const historicalAQIData: AQIDataPoint[] = [
  // 2020
  { year: 2020, month: 1, aqi: 142 },
  { year: 2020, month: 2, aqi: 135 },
  { year: 2020, month: 3, aqi: 98 },
  { year: 2020, month: 4, aqi: 72 },
  { year: 2020, month: 5, aqi: 65 },
  { year: 2020, month: 6, aqi: 78 },
  { year: 2020, month: 7, aqi: 85 },
  { year: 2020, month: 8, aqi: 82 },
  { year: 2020, month: 9, aqi: 68 },
  { year: 2020, month: 10, aqi: 88 },
  { year: 2020, month: 11, aqi: 125 },
  { year: 2020, month: 12, aqi: 148 },
  // 2021
  { year: 2021, month: 1, aqi: 155 },
  { year: 2021, month: 2, aqi: 138 },
  { year: 2021, month: 3, aqi: 95 },
  { year: 2021, month: 4, aqi: 68 },
  { year: 2021, month: 5, aqi: 58 },
  { year: 2021, month: 6, aqi: 72 },
  { year: 2021, month: 7, aqi: 88 },
  { year: 2021, month: 8, aqi: 79 },
  { year: 2021, month: 9, aqi: 62 },
  { year: 2021, month: 10, aqi: 85 },
  { year: 2021, month: 11, aqi: 118 },
  { year: 2021, month: 12, aqi: 142 },
  // 2022
  { year: 2022, month: 1, aqi: 148 },
  { year: 2022, month: 2, aqi: 132 },
  { year: 2022, month: 3, aqi: 92 },
  { year: 2022, month: 4, aqi: 65 },
  { year: 2022, month: 5, aqi: 55 },
  { year: 2022, month: 6, aqi: 68 },
  { year: 2022, month: 7, aqi: 82 },
  { year: 2022, month: 8, aqi: 75 },
  { year: 2022, month: 9, aqi: 58 },
  { year: 2022, month: 10, aqi: 78 },
  { year: 2022, month: 11, aqi: 112 },
  { year: 2022, month: 12, aqi: 138 },
  // 2023
  { year: 2023, month: 1, aqi: 145 },
  { year: 2023, month: 2, aqi: 128 },
  { year: 2023, month: 3, aqi: 88 },
  { year: 2023, month: 4, aqi: 62 },
  { year: 2023, month: 5, aqi: 52 },
  { year: 2023, month: 6, aqi: 65 },
  { year: 2023, month: 7, aqi: 78 },
  { year: 2023, month: 8, aqi: 72 },
  { year: 2023, month: 9, aqi: 55 },
  { year: 2023, month: 10, aqi: 72 },
  { year: 2023, month: 11, aqi: 108 },
  { year: 2023, month: 12, aqi: 132 },
  // 2024
  { year: 2024, month: 1, aqi: 140 },
  { year: 2024, month: 2, aqi: 125 },
  { year: 2024, month: 3, aqi: 85 },
  { year: 2024, month: 4, aqi: 58 },
  { year: 2024, month: 5, aqi: 48 },
  { year: 2024, month: 6, aqi: 62 },
  { year: 2024, month: 7, aqi: 75 },
  { year: 2024, month: 8, aqi: 68 },
  { year: 2024, month: 9, aqi: 52 },
  { year: 2024, month: 10, aqi: 68 },
  { year: 2024, month: 11, aqi: 102 },
  { year: 2024, month: 12, aqi: 128 },
  // 2025 (partial - up to current)
  { year: 2025, month: 1, aqi: 135 },
  { year: 2025, month: 2, aqi: 120 },
];

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getMonthName = (month: number): string => monthNames[month - 1];
