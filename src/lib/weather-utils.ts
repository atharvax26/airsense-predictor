export interface WeatherCategory {
  name: string;
  range: [number, number];
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  advisory: string;
}

export const temperatureCategories: WeatherCategory[] = [
  {
    name: 'Very Cold',
    range: [-10, 10],
    color: 'hsl(200, 80%, 50%)',
    bgColor: 'hsl(200, 80%, 95%)',
    textColor: 'hsl(200, 80%, 25%)',
    description: 'Freezing to very cold temperatures',
    advisory: 'Wear heavy winter clothing. Risk of hypothermia if exposed.',
  },
  {
    name: 'Cold',
    range: [10, 18],
    color: 'hsl(190, 70%, 50%)',
    bgColor: 'hsl(190, 70%, 95%)',
    textColor: 'hsl(190, 70%, 25%)',
    description: 'Cold weather conditions',
    advisory: 'Layer up with warm clothing. Good for outdoor activities.',
  },
  {
    name: 'Pleasant',
    range: [18, 25],
    color: 'hsl(142, 76%, 36%)',
    bgColor: 'hsl(142, 76%, 95%)',
    textColor: 'hsl(142, 76%, 20%)',
    description: 'Comfortable and pleasant weather',
    advisory: 'Ideal conditions for all outdoor activities.',
  },
  {
    name: 'Warm',
    range: [25, 32],
    color: 'hsl(45, 93%, 47%)',
    bgColor: 'hsl(45, 93%, 95%)',
    textColor: 'hsl(45, 93%, 25%)',
    description: 'Warm weather conditions',
    advisory: 'Stay hydrated. Light clothing recommended.',
  },
  {
    name: 'Hot',
    range: [32, 40],
    color: 'hsl(25, 95%, 53%)',
    bgColor: 'hsl(25, 95%, 95%)',
    textColor: 'hsl(25, 95%, 25%)',
    description: 'Hot weather conditions',
    advisory: 'Avoid prolonged sun exposure. Stay hydrated and cool.',
  },
  {
    name: 'Extreme Heat',
    range: [40, 50],
    color: 'hsl(0, 84%, 60%)',
    bgColor: 'hsl(0, 84%, 95%)',
    textColor: 'hsl(0, 84%, 25%)',
    description: 'Dangerously hot conditions',
    advisory: 'Heat stroke risk. Avoid outdoor activities. Stay indoors with AC.',
  },
];

export const getTemperatureCategory = (temp: number): WeatherCategory => {
  for (const category of temperatureCategories) {
    if (temp >= category.range[0] && temp < category.range[1]) {
      return category;
    }
  }
  // Default to last category for extreme values
  return temp < temperatureCategories[0].range[0] 
    ? temperatureCategories[0] 
    : temperatureCategories[temperatureCategories.length - 1];
};

export const getTemperatureColor = (temp: number): string => {
  return getTemperatureCategory(temp).color;
};

export const getConfidenceLabel = (confidence: number): string => {
  if (confidence >= 85) return 'Very High';
  if (confidence >= 70) return 'High';
  if (confidence >= 55) return 'Moderate';
  if (confidence >= 40) return 'Low';
  return 'Very Low';
};
