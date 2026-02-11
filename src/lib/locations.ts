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
    id: 'Delhi',
    name: 'Delhi',
    country: 'India',
    aqiModifier: 45,
    description: 'High pollution from traffic and industry',
  },
  {
    id: 'Mumbai',
    name: 'Mumbai',
    country: 'India',
    aqiModifier: 30,
    description: 'Coastal city with industrial and vehicular pollution',
  },
  {
    id: 'Bengaluru',
    name: 'Bengaluru',
    country: 'India',
    aqiModifier: 15,
    description: 'IT hub with growing traffic congestion',
  },
];

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(loc => loc.id === id);
};
