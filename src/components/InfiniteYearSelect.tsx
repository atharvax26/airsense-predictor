import { useState, useRef, useCallback, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface InfiniteYearSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  id?: string;
}

const InfiniteYearSelect = ({ value, onValueChange, id }: InfiniteYearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const [yearRange, setYearRange] = useState({
    start: currentYear,
    end: currentYear + 20
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const years = Array.from(
    { length: yearRange.end - yearRange.start + 1 },
    (_, i) => yearRange.start + i
  );

  const loadMoreYears = useCallback((direction: 'up' | 'down') => {
    setYearRange(prev => {
      if (direction === 'up') {
        return {
          start: Math.max(1900, prev.start - 10),
          end: prev.end
        };
      } else {
        return {
          start: prev.start,
          end: prev.end + 10
        };
      }
    });
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    // Load more when near bottom
    if (scrollHeight - scrollTop - clientHeight < 50) {
      loadMoreYears('down');
    }
    
    // Load more when near top
    if (scrollTop < 50 && yearRange.start > 1900) {
      loadMoreYears('up');
    }
  }, [loadMoreYears, yearRange.start]);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} className="w-full bg-background">
        <SelectValue placeholder="Choose year" />
      </SelectTrigger>
      <SelectContent 
        className="bg-popover z-50 max-h-[200px]"
        onScroll={handleScroll}
        ref={scrollRef}
        side="bottom"
      >
        {yearRange.start > 1900 && (
          <div 
            className="flex items-center justify-center py-1 text-muted-foreground cursor-pointer hover:bg-accent transition-colors"
            onClick={() => loadMoreYears('up')}
          >
            <ChevronUp className="h-4 w-4" />
            <span className="text-xs ml-1">Load earlier years</span>
          </div>
        )}
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
        <div 
          className="flex items-center justify-center py-1 text-muted-foreground cursor-pointer hover:bg-accent transition-colors"
          onClick={() => loadMoreYears('down')}
        >
          <ChevronDown className="h-4 w-4" />
          <span className="text-xs ml-1">Load more years</span>
        </div>
      </SelectContent>
    </Select>
  );
};

export default InfiniteYearSelect;
