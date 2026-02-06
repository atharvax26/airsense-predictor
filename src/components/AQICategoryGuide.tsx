import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { aqiCategories } from '@/lib/aqi-utils';
import { Info } from 'lucide-react';

const AQICategoryGuide = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5 text-primary" />
          AQI Categories Reference
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {aqiCategories.map((category) => (
            <div 
              key={category.name}
              className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-muted/50"
            >
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({category.range[0]}-{category.range[1]})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AQICategoryGuide;
