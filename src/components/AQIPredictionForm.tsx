import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, TrendingUp, MapPin } from 'lucide-react';
import { monthNames } from '@/lib/aqi-data';
import { locations } from '@/lib/locations';
import InfiniteYearSelect from '@/components/InfiniteYearSelect';

interface AQIPredictionFormProps {
  onPredict: (year: number, month: number, locationId?: string) => void;
  isLoading?: boolean;
}

const AQIPredictionForm = ({ onPredict, isLoading }: AQIPredictionFormProps) => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedYear && selectedMonth) {
      onPredict(
        parseInt(selectedYear), 
        parseInt(selectedMonth),
        selectedLocation || undefined
      );
    }
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="h-5 w-5 text-primary" />
          Predict Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="location">Select Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location" className="w-full bg-background">
                  <SelectValue placeholder="Choose city" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      <span className="flex items-center gap-2">
                        {location.name}
                        <span className="text-muted-foreground text-xs">
                          ({location.country})
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Select Year</Label>
              <InfiniteYearSelect 
                id="year"
                value={selectedYear} 
                onValueChange={setSelectedYear} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Select Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="month" className="w-full bg-background">
                  <SelectValue placeholder="Choose month" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50" side="bottom">
                  {monthNames.map((month, idx) => (
                    <SelectItem key={month} value={(idx + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full gap-2" 
            size="lg"
            disabled={!selectedYear || !selectedMonth || isLoading}
          >
            <TrendingUp className="h-4 w-4" />
            {isLoading ? 'Calculating...' : 'Predict AQI'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AQIPredictionForm;
