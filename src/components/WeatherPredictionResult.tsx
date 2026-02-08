import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getTemperatureCategory, getConfidenceLabel } from '@/lib/weather-utils';
import { getMonthName } from '@/lib/weather-data';
import { getLocationById } from '@/lib/locations';
import type { WeatherPredictionResult as PredictionResult } from '@/lib/weather-predictor';
import { Thermometer, Droplets, CloudRain, TrendingUp, TrendingDown, Minus, Shield, MapPin, Activity } from 'lucide-react';

interface WeatherPredictionResultProps {
  result: PredictionResult;
  year: number;
  month: number;
  locationId?: string;
}

const WeatherPredictionResult = ({ result, year, month, locationId }: WeatherPredictionResultProps) => {
  const category = getTemperatureCategory(result.predictedTemp);
  const confidenceLabel = getConfidenceLabel(result.confidence);
  const location = locationId ? getLocationById(locationId) : undefined;

  const getTrendIcon = () => {
    switch (result.trend) {
      case 'cooling':
        return <TrendingDown className="h-4 w-4 text-blue-600" />;
      case 'warming':
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getTrendText = () => {
    switch (result.trend) {
      case 'cooling':
        return 'Temperatures trending cooler year-over-year';
      case 'warming':
        return 'Temperatures trending warmer year-over-year';
      default:
        return 'Temperature trends remain stable';
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <Card 
        className="border-2 shadow-xl overflow-hidden"
        style={{ borderColor: category.color }}
      >
        <div 
          className="h-2 w-full"
          style={{ backgroundColor: category.color }}
        />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-lg text-muted-foreground">
              {location ? `${location.name}, ${location.country}` : 'Prediction'} — {getMonthName(month)} {year}
            </span>
            <Badge 
              className="text-sm px-3 py-1"
              style={{ 
                backgroundColor: category.bgColor,
                color: category.textColor,
                border: `1px solid ${category.color}`
              }}
            >
              {category.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Temperature Value */}
          <div className="text-center py-4">
            <div 
              className="text-7xl font-bold mb-2"
              style={{ color: category.color }}
            >
              {result.predictedTemp}°C
            </div>
            <p className="text-muted-foreground">Predicted Temperature</p>
          </div>

          {/* Additional Weather Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-semibold">{result.predictedHumidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <CloudRain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Rainfall</p>
                <p className="font-semibold">{result.predictedRainfall} mm</p>
              </div>
            </div>
          </div>

          {/* Confidence Meter */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Prediction Confidence</span>
              <span className="font-medium">{result.confidence}% ({confidenceLabel})</span>
            </div>
            <Progress value={result.confidence} className="h-2" />
          </div>

          {/* Location Factor */}
          {result.locationFactor && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <MapPin className="h-4 w-4 mt-0.5 text-primary" />
              <span className="text-sm">{result.locationFactor}</span>
            </div>
          )}

          {/* Trend Indicator */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            {getTrendIcon()}
            <span className="text-sm">{getTrendText()}</span>
          </div>

          {/* Seasonal Context */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
            <Activity className="h-4 w-4 mt-0.5 text-primary" />
            <span className="text-sm">{result.seasonalFactor}</span>
          </div>
        </CardContent>
      </Card>

      {/* Weather Advisory Card */}
      <Card className="border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Weather Advisory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: category.bgColor }}
          >
            <div className="flex items-start gap-3">
              <Thermometer 
                className="h-5 w-5 mt-0.5 flex-shrink-0"
                style={{ color: category.color }}
              />
              <div>
                <p 
                  className="font-medium mb-1"
                  style={{ color: category.textColor }}
                >
                  {category.description}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: category.textColor, opacity: 0.85 }}
                >
                  {category.advisory}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherPredictionResult;
