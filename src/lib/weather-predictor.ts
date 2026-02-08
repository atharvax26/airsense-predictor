import { historicalWeatherData, type WeatherDataPoint } from './weather-data';
import { getLocationById } from './locations';

export interface WeatherPredictionResult {
  predictedTemp: number;
  predictedHumidity: number;
  predictedRainfall: number;
  confidence: number;
  trend: 'warming' | 'stable' | 'cooling';
  seasonalFactor: string;
  locationFactor?: string;
}

// Location-based temperature modifiers
const locationTempModifiers: Record<string, number> = {
  delhi: 2,      // Hotter due to landlocked position
  mumbai: -2,    // Cooler due to coastal influence
  bengaluru: -4, // Cooler due to elevation
};

const locationHumidityModifiers: Record<string, number> = {
  delhi: -10,    // Drier
  mumbai: 15,    // More humid (coastal)
  bengaluru: 5,  // Moderate humidity
};

export const predictWeather = (targetYear: number, targetMonth: number, locationId?: string): WeatherPredictionResult => {
  // Step 1: Calculate yearly averages for trend analysis
  const yearlyAverages = calculateYearlyAverages();
  
  // Step 2: Perform linear regression on yearly temperature data
  const yearlyTrend = linearRegression(yearlyAverages);
  
  // Step 3: Calculate seasonal factors
  const seasonalFactors = calculateSeasonalFactors();
  
  // Step 4: Predict base temperature for target year
  const baselineTemp = yearlyTrend.slope * targetYear + yearlyTrend.intercept;
  
  // Step 5: Apply seasonal adjustment
  const seasonalAdjustment = seasonalFactors.temp[targetMonth - 1];
  let predictedTemp = Math.round((baselineTemp + seasonalAdjustment) * 10) / 10;
  let predictedHumidity = Math.round(seasonalFactors.humidity[targetMonth - 1]);
  let predictedRainfall = Math.round(seasonalFactors.rainfall[targetMonth - 1]);
  
  // Step 6: Apply location modifiers
  let locationFactor: string | undefined;
  if (locationId) {
    const location = getLocationById(locationId);
    if (location) {
      predictedTemp += locationTempModifiers[locationId] || 0;
      predictedHumidity += locationHumidityModifiers[locationId] || 0;
      predictedHumidity = Math.max(20, Math.min(95, predictedHumidity));
      locationFactor = location.description;
    }
  }
  
  // Step 7: Determine trend
  const trend = determineTrend(yearlyTrend.slope);
  
  // Step 8: Get seasonal context
  const seasonalFactor = getSeasonalContext(targetMonth);
  
  // Step 9: Calculate confidence
  const confidence = calculateConfidence(targetYear, targetMonth);
  
  return {
    predictedTemp,
    predictedHumidity,
    predictedRainfall,
    confidence,
    trend,
    seasonalFactor,
    locationFactor,
  };
};

const calculateYearlyAverages = (): { year: number; avgTemp: number }[] => {
  const yearGroups = new Map<number, number[]>();
  
  historicalWeatherData.forEach((dp) => {
    if (!yearGroups.has(dp.year)) {
      yearGroups.set(dp.year, []);
    }
    yearGroups.get(dp.year)!.push(dp.avgTemp);
  });
  
  return Array.from(yearGroups.entries()).map(([year, temps]) => ({
    year,
    avgTemp: temps.reduce((sum, t) => sum + t, 0) / temps.length,
  }));
};

const linearRegression = (data: { year: number; avgTemp: number }[]): { slope: number; intercept: number } => {
  const n = data.length;
  const sumX = data.reduce((sum, d) => sum + d.year, 0);
  const sumY = data.reduce((sum, d) => sum + d.avgTemp, 0);
  const sumXY = data.reduce((sum, d) => sum + d.year * d.avgTemp, 0);
  const sumX2 = data.reduce((sum, d) => sum + d.year * d.year, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept };
};

const calculateSeasonalFactors = (): { temp: number[]; humidity: number[]; rainfall: number[] } => {
  const monthlyTemp: number[][] = Array(12).fill(null).map(() => []);
  const monthlyHumidity: number[][] = Array(12).fill(null).map(() => []);
  const monthlyRainfall: number[][] = Array(12).fill(null).map(() => []);
  
  historicalWeatherData.forEach((dp) => {
    monthlyTemp[dp.month - 1].push(dp.avgTemp);
    monthlyHumidity[dp.month - 1].push(dp.avgHumidity);
    monthlyRainfall[dp.month - 1].push(dp.avgRainfall);
  });
  
  // Calculate yearly average temperature
  const overallAvg = historicalWeatherData.reduce((sum, dp) => sum + dp.avgTemp, 0) / historicalWeatherData.length;
  
  return {
    temp: monthlyTemp.map((temps) => 
      temps.length > 0 ? (temps.reduce((sum, t) => sum + t, 0) / temps.length) - overallAvg : 0
    ),
    humidity: monthlyHumidity.map((hums) => 
      hums.length > 0 ? hums.reduce((sum, h) => sum + h, 0) / hums.length : 50
    ),
    rainfall: monthlyRainfall.map((rains) => 
      rains.length > 0 ? rains.reduce((sum, r) => sum + r, 0) / rains.length : 0
    ),
  };
};

const determineTrend = (slope: number): 'warming' | 'stable' | 'cooling' => {
  if (slope > 0.1) return 'warming';
  if (slope < -0.1) return 'cooling';
  return 'stable';
};

const getSeasonalContext = (month: number): string => {
  if (month >= 3 && month <= 5) return 'Pre-monsoon season with hot and dry conditions';
  if (month >= 6 && month <= 9) return 'Monsoon season with heavy rainfall expected';
  if (month >= 10 && month <= 11) return 'Post-monsoon with retreating monsoon patterns';
  return 'Winter season with cool and dry weather';
};

const calculateConfidence = (targetYear: number, targetMonth: number): number => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  const monthsAhead = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
  
  if (monthsAhead <= 0) return 92;
  if (monthsAhead <= 3) return 85;
  if (monthsAhead <= 6) return 75;
  if (monthsAhead <= 12) return 65;
  if (monthsAhead <= 24) return 52;
  if (monthsAhead <= 36) return 40;
  return 28;
};

// Get monthly averages for charts
export const getMonthlyWeatherAverages = (): { month: string; avgTemp: number; avgRainfall: number }[] => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthData: { temp: number[]; rainfall: number[] }[] = Array(12).fill(null).map(() => ({ temp: [], rainfall: [] }));
  
  historicalWeatherData.forEach((dp) => {
    monthData[dp.month - 1].temp.push(dp.avgTemp);
    monthData[dp.month - 1].rainfall.push(dp.avgRainfall);
  });
  
  return monthData.map((data, idx) => ({
    month: monthNames[idx],
    avgTemp: Math.round((data.temp.reduce((sum, v) => sum + v, 0) / data.temp.length) * 10) / 10,
    avgRainfall: Math.round(data.rainfall.reduce((sum, v) => sum + v, 0) / data.rainfall.length),
  }));
};

// Get yearly trend data for charts
export const getYearlyWeatherTrend = (): { year: number; avgTemp: number }[] => {
  return calculateYearlyAverages().map((d) => ({
    year: d.year,
    avgTemp: Math.round(d.avgTemp * 10) / 10,
  }));
};
