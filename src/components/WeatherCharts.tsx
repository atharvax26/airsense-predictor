import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getMonthlyWeatherAverages, getYearlyWeatherTrend } from '@/lib/weather-predictor';
import { getTemperatureColor } from '@/lib/weather-utils';
import { BarChart3, TrendingUp } from 'lucide-react';

const WeatherCharts = () => {
  const monthlyData = getMonthlyWeatherAverages();
  const yearlyData = getYearlyWeatherTrend();

  const TempTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      const temp = payload.find(p => p.dataKey === 'avgTemp')?.value;
      const rainfall = payload.find(p => p.dataKey === 'avgRainfall')?.value;
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          {temp !== undefined && (
            <p className="text-sm" style={{ color: getTemperatureColor(temp) }}>
              Temp: <span className="font-bold">{temp}°C</span>
            </p>
          )}
          {rainfall !== undefined && (
            <p className="text-sm text-blue-500">
              Rainfall: <span className="font-bold">{rainfall} mm</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const YearlyTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      const temp = payload[0].value;
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm" style={{ color: getTemperatureColor(temp) }}>
            Avg Temp: <span className="font-bold">{temp}°C</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Historical Weather Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="yearly" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Yearly Trend
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Monthly Averages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="yearly" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="year" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={[20, 35]}
                  />
                  <Tooltip content={<YearlyTooltip />} />
                  <ReferenceLine y={25} stroke="hsl(142, 76%, 36%)" strokeDasharray="5 5" />
                  <ReferenceLine y={32} stroke="hsl(25, 95%, 53%)" strokeDasharray="5 5" />
                  <Line 
                    type="monotone" 
                    dataKey="avgTemp" 
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Average temperature per year (2020-2025)
            </p>
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    yAxisId="temp"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={[0, 45]}
                  />
                  <YAxis 
                    yAxisId="rain"
                    orientation="right"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={[0, 300]}
                  />
                  <Tooltip content={<TempTooltip />} />
                  <Bar 
                    yAxisId="temp"
                    dataKey="avgTemp" 
                    fill="hsl(25, 95%, 53%)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    yAxisId="rain"
                    dataKey="avgRainfall" 
                    fill="hsl(200, 80%, 50%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Temperature (orange) & Rainfall (blue) by month
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeatherCharts;
