import { useState } from 'react';
import WeatherPredictionForm from '@/components/WeatherPredictionForm';
import WeatherPredictionResult from '@/components/WeatherPredictionResult';
import WeatherCharts from '@/components/WeatherCharts';
import WeatherCategoryGuide from '@/components/WeatherCategoryGuide';
import WeatherStatsCards from '@/components/WeatherStatsCards';
import { predictWeather, type WeatherPredictionResult as PredictionResult } from '@/lib/weather-predictor';

const WeatherDashboard = () => {
  const [prediction, setPrediction] = useState<{
    result: PredictionResult;
    year: number;
    month: number;
    locationId?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = (year: number, month: number, locationId?: string) => {
    setIsLoading(true);
    // Simulate a brief loading state for UX
    setTimeout(() => {
      const result = predictWeather(year, month, locationId);
      setPrediction({ result, year, month, locationId });
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Stats Overview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Overview</h2>
        <WeatherStatsCards />
      </section>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Prediction Form & Result */}
        <div className="lg:col-span-2 space-y-6">
          <WeatherPredictionForm onPredict={handlePredict} isLoading={isLoading} />
          
          {prediction && (
            <WeatherPredictionResult
              result={prediction.result}
              year={prediction.year}
              month={prediction.month}
              locationId={prediction.locationId}
            />
          )}

          <WeatherCharts />
        </div>

        {/* Right Column - Category Guide */}
        <div className="space-y-6">
          <WeatherCategoryGuide />
          
          {/* Info Card */}
          <div className="p-4 rounded-lg bg-muted/50 border">
            <h3 className="font-medium mb-2">About This Tool</h3>
            <p className="text-sm text-muted-foreground">
              This weather prediction system uses linear regression analysis on historical 
              weather data (2020-2025) combined with seasonal pattern recognition 
              to forecast future weather conditions.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Predictions account for yearly climate trends and monthly variations 
              typical of different seasons in India.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDashboard;
