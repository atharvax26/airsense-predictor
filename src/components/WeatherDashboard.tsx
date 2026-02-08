import { Cloud, Droplets, Wind, Thermometer, Sun, CloudRain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeatherDashboard = () => {
  // Mock weather data for Indian cities
  const weatherData = [
    { city: 'Delhi', temp: 32, humidity: 45, wind: 12, condition: 'Sunny' },
    { city: 'Mumbai', temp: 28, humidity: 78, wind: 18, condition: 'Cloudy' },
    { city: 'Bengaluru', temp: 24, humidity: 65, wind: 10, condition: 'Partly Cloudy' },
    { city: 'Chennai', temp: 30, humidity: 82, wind: 15, condition: 'Humid' },
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'Cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'Rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Weather Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {weatherData.map((city) => (
          <Card key={city.city} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{city.city}</CardTitle>
              {getWeatherIcon(city.condition)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{city.temp}°C</div>
              <p className="text-xs text-muted-foreground">{city.condition}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  <span>{city.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="h-4 w-4" />
                  <span>{city.wind} km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Today's Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-6">
            {['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'].map((time, index) => (
              <div key={time} className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">{time}</p>
                <Sun className="h-6 w-6 mx-auto my-2 text-yellow-500" />
                <p className="font-semibold">{24 + index * 2}°C</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <div className="p-4 rounded-lg bg-muted/50 border">
        <h3 className="font-medium mb-2">Weather Dashboard</h3>
        <p className="text-sm text-muted-foreground">
          This weather dashboard displays current conditions and forecasts for major Indian cities. 
          Data shown is for demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default WeatherDashboard;
