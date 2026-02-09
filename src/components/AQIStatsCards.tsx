import { Card, CardContent } from '@/components/ui/card';
import { historicalAQIData } from '@/lib/aqi-data';
import { getAQICategory } from '@/lib/aqi-utils';
import { Activity, Calendar, TrendingDown, Leaf } from 'lucide-react';

const AQIStatsCards = () => {
  // Calculate stats
  const latestData = historicalAQIData[historicalAQIData.length - 1];
  const latestCategory = getAQICategory(latestData.aqi);
  
  const allAQIs = historicalAQIData.map(d => d.aqi);
  const avgAQI = Math.round(allAQIs.reduce((a, b) => a + b, 0) / allAQIs.length);
  const bestAQI = Math.min(...allAQIs);
  
  // Calculate improvement
  const firstYearAvg = historicalAQIData.filter(d => d.year === 2020).reduce((sum, d) => sum + d.aqi, 0) / 12;
  const lastYearData = historicalAQIData.filter(d => d.year === 2025);
  const lastYearAvg = lastYearData.reduce((sum, d) => sum + d.aqi, 0) / lastYearData.length;
  const improvement = Math.round(((firstYearAvg - lastYearAvg) / firstYearAvg) * 100);

  const stats = [
    {
      title: 'Latest AQI',
      value: latestData.aqi,
      subtitle: latestCategory.name,
      icon: Activity,
      color: latestCategory.color,
    },
    {
      title: 'Historical Avg',
      value: avgAQI,
      subtitle: '2020-2025',
      icon: Calendar,
      color: 'hsl(var(--primary))',
    },
    {
      title: 'Best Recorded',
      value: bestAQI,
      subtitle: 'All time low',
      icon: Leaf,
      color: 'hsl(142, 76%, 36%)',
    },
    {
      title: 'Improvement',
      value: `${improvement}%`,
      subtitle: 'Since 2020',
      icon: TrendingDown,
      color: improvement > 0 ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card 
          key={stat.title} 
          className="shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium transition-colors duration-300 group-hover:text-foreground">{stat.title}</p>
                <p 
                  className="text-2xl font-bold mt-1 transition-transform duration-300 group-hover:scale-105 origin-left"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.subtitle}</p>
              </div>
              <stat.icon 
                className="h-8 w-8 opacity-20 transition-all duration-300 group-hover:opacity-40 group-hover:scale-110"
                style={{ color: stat.color }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AQIStatsCards;
