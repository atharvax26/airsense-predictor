import { historicalAQIData, type AQIDataPoint } from './aqi-data';
import { getLocationById } from './locations';

export interface PredictionResult {
  predictedAQI: number;
  confidence: number;
  trend: 'improving' | 'stable' | 'worsening';
  seasonalFactor: string;
  locationFactor?: string;
}

/**
 * Client-side AQI prediction using linear regression with seasonal adjustment
 * 
 * The algorithm:
 * 1. Calculate overall yearly trend using linear regression
 * 2. Apply seasonal adjustment based on historical monthly patterns
 * 3. Add confidence interval based on prediction distance
 */
export const predictAQI = (targetYear: number, targetMonth: number, locationId?: string): PredictionResult => {
  // Step 1: Calculate yearly averages for trend analysis
  const yearlyAverages = calculateYearlyAverages();
  
  // Step 2: Perform linear regression on yearly data to get trend
  const yearlyTrend = linearRegression(yearlyAverages);
  
  // Step 3: Calculate seasonal factors (average deviation per month)
  const seasonalFactors = calculateSeasonalFactors();
  
  // Step 4: Predict base AQI for target year
  const baselineAQI = yearlyTrend.slope * targetYear + yearlyTrend.intercept;
  
  // Step 5: Apply seasonal adjustment
  const seasonalAdjustment = seasonalFactors[targetMonth - 1];
  let predictedAQI = Math.round(baselineAQI + seasonalAdjustment);
  
  // Step 5.5: Apply location modifier if provided
  let locationFactor: string | undefined;
  if (locationId) {
    const location = getLocationById(locationId);
    if (location) {
      predictedAQI += location.aqiModifier;
      locationFactor = location.description;
    }
  }
  
  // Step 6: Clamp to valid AQI range (0-500)
  const clampedAQI = Math.max(0, Math.min(500, predictedAQI));
  
  // Step 7: Determine trend direction
  const trend = determineTrend(yearlyTrend.slope);
  
  // Step 8: Get seasonal context
  const seasonalFactor = getSeasonalContext(targetMonth, seasonalAdjustment);
  
  // Step 9: Calculate confidence
  const confidence = calculateConfidence(targetYear, targetMonth);
  
  return {
    predictedAQI: clampedAQI,
    confidence,
    trend,
    seasonalFactor,
    locationFactor,
  };
};

// Calculate average AQI for each year
const calculateYearlyAverages = (): { year: number; avgAQI: number }[] => {
  const yearGroups = new Map<number, number[]>();
  
  historicalAQIData.forEach((dp) => {
    if (!yearGroups.has(dp.year)) {
      yearGroups.set(dp.year, []);
    }
    yearGroups.get(dp.year)!.push(dp.aqi);
  });
  
  return Array.from(yearGroups.entries()).map(([year, aqis]) => ({
    year,
    avgAQI: aqis.reduce((sum, aqi) => sum + aqi, 0) / aqis.length,
  }));
};

// Simple linear regression
const linearRegression = (data: { year: number; avgAQI: number }[]): { slope: number; intercept: number } => {
  const n = data.length;
  const sumX = data.reduce((sum, d) => sum + d.year, 0);
  const sumY = data.reduce((sum, d) => sum + d.avgAQI, 0);
  const sumXY = data.reduce((sum, d) => sum + d.year * d.avgAQI, 0);
  const sumX2 = data.reduce((sum, d) => sum + d.year * d.year, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept };
};

// Calculate how much each month deviates from yearly average
const calculateSeasonalFactors = (): number[] => {
  const monthlyDeviations: number[][] = Array(12).fill(null).map(() => []);
  
  // Group data by year to calculate yearly averages
  const yearlyAvg = new Map<number, number>();
  const yearData = new Map<number, AQIDataPoint[]>();
  
  historicalAQIData.forEach((dp) => {
    if (!yearData.has(dp.year)) {
      yearData.set(dp.year, []);
    }
    yearData.get(dp.year)!.push(dp);
  });
  
  yearData.forEach((dataPoints, year) => {
    const avg = dataPoints.reduce((sum, dp) => sum + dp.aqi, 0) / dataPoints.length;
    yearlyAvg.set(year, avg);
  });
  
  // Calculate deviation from yearly average for each month
  historicalAQIData.forEach((dp) => {
    const yearAvg = yearlyAvg.get(dp.year)!;
    const deviation = dp.aqi - yearAvg;
    monthlyDeviations[dp.month - 1].push(deviation);
  });
  
  // Average the deviations for each month
  return monthlyDeviations.map((deviations) => 
    deviations.length > 0 
      ? deviations.reduce((sum, d) => sum + d, 0) / deviations.length 
      : 0
  );
};

const determineTrend = (slope: number): 'improving' | 'stable' | 'worsening' => {
  if (slope < -2) return 'improving';
  if (slope > 2) return 'worsening';
  return 'stable';
};

const getSeasonalContext = (month: number, adjustment: number): string => {
  const season = getSeasonName(month);
  if (adjustment > 20) return `${season} typically sees higher pollution levels`;
  if (adjustment < -20) return `${season} typically has better air quality`;
  return `${season} shows moderate air quality patterns`;
};

const getSeasonName = (month: number): string => {
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Fall';
  return 'Winter';
};

const calculateConfidence = (targetYear: number, targetMonth: number): number => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  const monthsAhead = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
  
  if (monthsAhead <= 0) return 95;
  if (monthsAhead <= 3) return 88;
  if (monthsAhead <= 6) return 78;
  if (monthsAhead <= 12) return 68;
  if (monthsAhead <= 24) return 55;
  if (monthsAhead <= 36) return 42;
  return 30;
};

// Get monthly averages for chart
export const getMonthlyAverages = (): { month: string; avgAQI: number }[] => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthData: number[][] = Array(12).fill(null).map(() => []);
  
  historicalAQIData.forEach((dp) => {
    monthData[dp.month - 1].push(dp.aqi);
  });
  
  return monthData.map((data, idx) => ({
    month: monthNames[idx],
    avgAQI: Math.round(data.reduce((sum, v) => sum + v, 0) / data.length),
  }));
};

// Get yearly trend data for chart
export const getYearlyTrend = (): { year: number; avgAQI: number }[] => {
  return calculateYearlyAverages().map((d) => ({
    year: d.year,
    avgAQI: Math.round(d.avgAQI),
  }));
};
