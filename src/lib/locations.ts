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
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    aqiModifier: 35,
    description: 'Seasonal smog and industrial activity',
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    country: 'USA',
    aqiModifier: 15,
    description: 'Vehicle emissions and geographic basin',
  },
  {
    id: 'london',
    name: 'London',
    country: 'UK',
    aqiModifier: 5,
    description: 'Moderate urban pollution',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    aqiModifier: 10,
    description: 'Dense urban area with good controls',
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    aqiModifier: -10,
    description: 'Coastal city with good air flow',
  },
  {
    id: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    aqiModifier: -20,
    description: 'Clean alpine air and strict regulations',
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    aqiModifier: -30,
    description: 'Minimal industry, clean oceanic air',
  },
];

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(loc => loc.id === id);
};
