import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getAQIColor } from '@/lib/aqi-utils';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getYearlyTrend, getMonthlyAverages, type YearlyTrendData, type MonthlyAverageData } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const AQICharts = () => {
  const [yearlyData, setYearlyData] = useState<YearlyTrendData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyAverageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const [yearly, monthly] = await Promise.all([
          getYearlyTrend(),
          getMonthlyAverages()
        ]);
        console.log('Yearly data received:', yearly);
        console.log('Monthly data received:', monthly);
        setYearlyData(yearly);
        setMonthlyData(monthly);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chart data');
        console.error('Failed to fetch chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      const aqi = payload[0].value;
      return (
        <div className="bg-popover border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm" style={{ color: getAQIColor(aqi) }}>
            AQI: <span className="font-bold">{aqi}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Historical AQI Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Historical AQI Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Historical AQI Trends</CardTitle>
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
                <LineChart 
                  data={yearlyData} 
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  key={JSON.stringify(yearlyData)}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="year" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={[0, 'dataMax + 20']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={50} stroke="hsl(142, 76%, 36%)" strokeDasharray="5 5" label="" />
                  <ReferenceLine y={100} stroke="hsl(45, 93%, 47%)" strokeDasharray="5 5" label="" />
                  <ReferenceLine y={150} stroke="hsl(25, 95%, 53%)" strokeDasharray="5 5" label="" />
                  <Line 
                    type="monotone" 
                    dataKey="avgAQI" 
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Average AQI values per year from real dataset
            </p>
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={monthlyData} 
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  key={JSON.stringify(monthlyData)}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={[0, 'dataMax + 20']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="avgAQI" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Average AQI by month across all years from real dataset
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AQICharts;
