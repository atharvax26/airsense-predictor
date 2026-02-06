// AQI Category definitions based on EPA standards
export interface AQICategory {
  name: string;
  range: [number, number];
  color: string;
  bgColor: string;
  textColor: string;
  healthImplication: string;
  advisory: string;
}

export const aqiCategories: AQICategory[] = [
  {
    name: 'Good',
    range: [0, 50],
    color: 'hsl(142, 76%, 36%)', // green
    bgColor: 'hsl(142, 76%, 94%)',
    textColor: 'hsl(142, 76%, 26%)',
    healthImplication: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    advisory: 'Enjoy outdoor activities! Air quality is excellent.',
  },
  {
    name: 'Moderate',
    range: [51, 100],
    color: 'hsl(45, 93%, 47%)', // yellow
    bgColor: 'hsl(45, 93%, 94%)',
    textColor: 'hsl(45, 93%, 25%)',
    healthImplication: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
    advisory: 'Unusually sensitive individuals should consider reducing prolonged outdoor exertion.',
  },
  {
    name: 'Unhealthy for Sensitive Groups',
    range: [101, 150],
    color: 'hsl(25, 95%, 53%)', // orange
    bgColor: 'hsl(25, 95%, 94%)',
    textColor: 'hsl(25, 95%, 30%)',
    healthImplication: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    advisory: 'Children, elderly, and those with respiratory conditions should limit prolonged outdoor exertion.',
  },
  {
    name: 'Unhealthy',
    range: [151, 200],
    color: 'hsl(0, 84%, 60%)', // red
    bgColor: 'hsl(0, 84%, 94%)',
    textColor: 'hsl(0, 84%, 30%)',
    healthImplication: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
    advisory: 'Everyone should reduce prolonged outdoor exertion. Sensitive groups should avoid outdoor activities.',
  },
  {
    name: 'Very Unhealthy',
    range: [201, 300],
    color: 'hsl(270, 60%, 50%)', // purple
    bgColor: 'hsl(270, 60%, 94%)',
    textColor: 'hsl(270, 60%, 30%)',
    healthImplication: 'Health alert: The risk of health effects is increased for everyone.',
    advisory: 'Avoid prolonged outdoor exertion. Everyone should reduce outdoor activities.',
  },
  {
    name: 'Hazardous',
    range: [301, 500],
    color: 'hsl(345, 80%, 35%)', // maroon
    bgColor: 'hsl(345, 80%, 94%)',
    textColor: 'hsl(345, 80%, 25%)',
    healthImplication: 'Health warning of emergency conditions: everyone is more likely to be affected.',
    advisory: 'Everyone should avoid all outdoor physical activities. Stay indoors and keep windows closed.',
  },
];

export const getAQICategory = (aqi: number): AQICategory => {
  const category = aqiCategories.find(
    (cat) => aqi >= cat.range[0] && aqi <= cat.range[1]
  );
  return category || aqiCategories[aqiCategories.length - 1];
};

export const getAQIColor = (aqi: number): string => {
  return getAQICategory(aqi).color;
};

// Calculate confidence based on how far into the future we're predicting
export const getConfidenceLevel = (targetYear: number, targetMonth: number): number => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  const monthsAhead = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
  
  if (monthsAhead <= 0) return 95;
  if (monthsAhead <= 3) return 90;
  if (monthsAhead <= 6) return 82;
  if (monthsAhead <= 12) return 72;
  if (monthsAhead <= 24) return 60;
  if (monthsAhead <= 36) return 48;
  return 35;
};

export const getConfidenceLabel = (confidence: number): string => {
  if (confidence >= 85) return 'High';
  if (confidence >= 65) return 'Moderate';
  if (confidence >= 45) return 'Low';
  return 'Very Low';
};
