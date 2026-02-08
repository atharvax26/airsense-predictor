import { Card, CardContent } from '@/components/ui/card';
import { historicalWeatherData } from '@/lib/weather-data';
import { getTemperatureCategory } from '@/lib/weather-utils';
import { Thermometer, Calendar, TrendingUp, Droplets } from 'lucide-react';

const WeatherStatsCards = () => {
  // Calculate stats
  const latestData = historicalWeatherData[historicalWeatherData.length - 1];
  const latestCategory = getTemperatureCategory(latestData.avgTemp);
  
  const allTemps = historicalWeatherData.map(d => d.avgTemp);
  const avgTemp = Math.round((allTemps.reduce((a, b) => a + b, 0) / allTemps.length) * 10) / 10;
  const maxTemp = Math.max(...allTemps);
  
  // Calculate average humidity
  const allHumidity = historicalWeatherData.map(d => d.avgHumidity);
  const avgHumidity = Math.round(allHumidity.reduce((a, b) => a + b, 0) / allHumidity.length);

  const stats = [
    {
      title: 'Latest Temp',
      value: `${latestData.avgTemp}°C`,
      subtitle: latestCategory.name,
      icon: Thermometer,
      color: latestCategory.color,
    },
    {
      title: 'Historical Avg',
      value: `${avgTemp}°C`,
      subtitle: '2020-2025',
      icon: Calendar,
      color: 'hsl(var(--primary))',
    },
    {
      title: 'Peak Recorded',
      value: `${maxTemp}°C`,
      subtitle: 'All time high',
      icon: TrendingUp,
      color: 'hsl(0, 84%, 60%)',
    },
    {
      title: 'Avg Humidity',
      value: `${avgHumidity}%`,
      subtitle: '2020-2025',
      icon: Droplets,
      color: 'hsl(200, 80%, 50%)',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{stat.title}</p>
                <p 
                  className="text-2xl font-bold mt-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.subtitle}</p>
              </div>
              <stat.icon 
                className="h-8 w-8 opacity-20"
                style={{ color: stat.color }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeatherStatsCards;
