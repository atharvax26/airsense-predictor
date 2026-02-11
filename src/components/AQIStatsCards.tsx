import { Card, CardContent } from '@/components/ui/card';
import { getAQICategory } from '@/lib/aqi-utils';
import { Activity, Calendar, TrendingDown, Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStats, type StatsResponse } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const AQIStatsCards = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load statistics');
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-md">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md col-span-2 lg:col-span-4">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              {error || 'Unable to load statistics. Make sure the backend is running.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avgCategory = getAQICategory(stats.historical_avg.aqi);
  const improvementColor = stats.improvement.percentage > 0 
    ? 'hsl(142, 76%, 36%)' 
    : stats.improvement.percentage < 0 
    ? 'hsl(0, 84%, 60%)' 
    : 'hsl(var(--primary))';

  const statsCards = [
    {
      title: 'Average AQI',
      value: Math.round(stats.historical_avg.aqi),
      subtitle: `All Cities - ${stats.historical_avg.period}`,
      icon: Activity,
      color: avgCategory.color,
    },
    {
      title: 'Total Records',
      value: stats.total_records.toLocaleString(),
      subtitle: `${stats.historical_avg.period} Dataset`,
      icon: Calendar,
      color: 'hsl(var(--primary))',
    },
    {
      title: 'Best Recorded',
      value: Math.round(stats.best_recorded.aqi),
      subtitle: `${stats.best_recorded.city} - ${stats.best_recorded.date}`,
      icon: Leaf,
      color: 'hsl(142, 76%, 36%)',
    },
    {
      title: 'Improvement',
      value: `${stats.improvement.percentage > 0 ? '+' : ''}${stats.improvement.percentage}%`,
      subtitle: `Since ${stats.improvement.from_year}`,
      icon: TrendingDown,
      color: improvementColor,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => (
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
