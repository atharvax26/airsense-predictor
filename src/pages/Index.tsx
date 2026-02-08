import { useState } from 'react';
import AQIPredictionForm from '@/components/AQIPredictionForm';
import AQIPredictionResult from '@/components/AQIPredictionResult';
import AQICharts from '@/components/AQICharts';
import AQICategoryGuide from '@/components/AQICategoryGuide';
import AQIStatsCards from '@/components/AQIStatsCards';
import WeatherDashboard from '@/components/WeatherDashboard';
import ThemeToggle from '@/components/ThemeToggle';
import { predictAQI, type PredictionResult } from '@/lib/aqi-predictor';
import { Wind, Cloud } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [prediction, setPrediction] = useState<{
    result: PredictionResult;
    year: number;
    month: number;
    locationId?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'aqi' | 'weather'>('aqi');

  const handlePredict = (year: number, month: number, locationId?: string) => {
    setIsLoading(true);
    // Simulate a brief loading state for UX
    setTimeout(() => {
      const result = predictAQI(year, month, locationId);
      setPrediction({ result, year, month, locationId });
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AQI Prediction Dashboard</h1>
                <p className="text-sm text-muted-foreground">Air Quality Index Forecasting System</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Toggle */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'aqi' | 'weather')}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="aqi" className="flex items-center gap-2">
                <Wind className="h-4 w-4" />
                AQI Dashboard
              </TabsTrigger>
              <TabsTrigger value="weather" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Weather Dashboard
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === 'aqi' ? (
          <>
            {/* Stats Overview */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Overview</h2>
              <AQIStatsCards />
            </section>

            {/* Main Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Prediction Form & Result */}
              <div className="lg:col-span-2 space-y-6">
                <AQIPredictionForm onPredict={handlePredict} isLoading={isLoading} />
                
                {prediction && (
                  <AQIPredictionResult
                    result={prediction.result}
                    year={prediction.year}
                    month={prediction.month}
                    locationId={prediction.locationId}
                  />
                )}

                <AQICharts />
              </div>

              {/* Right Column - Category Guide */}
              <div className="space-y-6">
                <AQICategoryGuide />
                
                {/* Info Card */}
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h3 className="font-medium mb-2">About This Tool</h3>
                  <p className="text-sm text-muted-foreground">
                    This AQI prediction system uses linear regression analysis on historical 
                    air quality data (2020-2025) combined with seasonal pattern recognition 
                    to forecast future air quality levels.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Predictions account for yearly improvement trends and monthly variations 
                    typical of different seasons.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <WeatherDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            AQI Prediction Dashboard • Built with React & TypeScript • 
            Data based on historical patterns (2020-2025)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
