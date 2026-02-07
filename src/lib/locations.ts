export interface Location {
  id: string;
  name: string;
  country: string;
  // AQI modifier: positive = worse air quality, negative = better
  aqiModifier: number;
  description: string;
}

export const locations: Location[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    country: 'India',
    aqiModifier: 45,
    description: 'High pollution from traffic and industry',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    aqiModifier: 30,
    description: 'Coastal city with industrial and vehicular pollution',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    country: 'India',
    aqiModifier: 15,
    description: 'IT hub with growing traffic congestion',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    country: 'India',
    aqiModifier: 20,
    description: 'Coastal industrial city',
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    country: 'India',
    aqiModifier: 35,
    description: 'Dense urban area with industrial activity',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    country: 'India',
    aqiModifier: 18,
    description: 'Growing tech hub with moderate pollution',
  },
  {
    id: 'pune',
    name: 'Pune',
    country: 'India',
    aqiModifier: 12,
    description: 'Industrial and educational hub',
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    country: 'India',
    aqiModifier: 28,
    description: 'Industrial city with textile and chemical industries',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    aqiModifier: 25,
    description: 'Desert climate with dust and traffic pollution',
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    country: 'India',
    aqiModifier: 32,
    description: 'Growing city with seasonal air quality issues',
  },
];

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(loc => loc.id === id);
};
