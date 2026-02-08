// Historical weather data for Indian cities (2020-2025)
export interface WeatherDataPoint {
  year: number;
  month: number;
  avgTemp: number; // Celsius
  avgHumidity: number; // Percentage
  avgRainfall: number; // mm
}

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getMonthName = (month: number): string => {
  return monthNames[month - 1] || 'Unknown';
};

// Base weather patterns for India (seasonal variations)
const generateWeatherData = (): WeatherDataPoint[] => {
  const data: WeatherDataPoint[] = [];
  
  // Seasonal temperature patterns (base values)
  const monthlyTempBase = [18, 21, 26, 32, 36, 34, 30, 29, 30, 28, 23, 19];
  const monthlyHumidityBase = [55, 45, 35, 30, 35, 55, 75, 80, 75, 60, 50, 55];
  const monthlyRainfallBase = [15, 10, 8, 5, 15, 120, 280, 260, 150, 40, 10, 8];
  
  for (let year = 2020; year <= 2025; year++) {
    for (let month = 1; month <= 12; month++) {
      // Add yearly climate change trend (slight warming)
      const yearOffset = (year - 2020) * 0.15;
      
      // Add random variation
      const tempVariation = (Math.random() - 0.5) * 4;
      const humidityVariation = (Math.random() - 0.5) * 10;
      const rainfallVariation = (Math.random() - 0.5) * 30;
      
      data.push({
        year,
        month,
        avgTemp: Math.round((monthlyTempBase[month - 1] + yearOffset + tempVariation) * 10) / 10,
        avgHumidity: Math.round(Math.max(20, Math.min(95, monthlyHumidityBase[month - 1] + humidityVariation))),
        avgRainfall: Math.round(Math.max(0, monthlyRainfallBase[month - 1] + rainfallVariation)),
      });
    }
  }
  
  return data;
};

export const historicalWeatherData = generateWeatherData();
