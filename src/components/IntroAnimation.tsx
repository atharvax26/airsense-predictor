import { useEffect, useState } from 'react';
import { Wind, Cloud } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [stage, setStage] = useState<'initial' | 'icons' | 'text' | 'fadeOut'>('initial');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('icons'), 300),
      setTimeout(() => setStage('text'), 800),
      setTimeout(() => setStage('fadeOut'), 2500),
      setTimeout(() => onComplete(), 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 transition-opacity duration-700 ${
        stage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated Icons */}
        <div className="relative flex items-center gap-6">
          {/* Wind Icon */}
          <div 
            className={`p-4 rounded-2xl bg-primary/10 transition-all duration-700 ease-out ${
              stage === 'initial' 
                ? 'opacity-0 -translate-x-12 scale-50' 
                : 'opacity-100 translate-x-0 scale-100'
            }`}
          >
            <Wind 
              className={`h-12 w-12 text-primary transition-all duration-500 ${
                stage !== 'initial' ? 'animate-pulse' : ''
              }`} 
            />
          </div>

          {/* Connecting Line */}
          <div 
            className={`h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full transition-all duration-500 delay-200 ${
              stage === 'initial' ? 'w-0' : 'w-16'
            }`}
          />

          {/* Cloud Icon */}
          <div 
            className={`p-4 rounded-2xl bg-primary/10 transition-all duration-700 ease-out delay-150 ${
              stage === 'initial' 
                ? 'opacity-0 translate-x-12 scale-50' 
                : 'opacity-100 translate-x-0 scale-100'
            }`}
          >
            <Cloud 
              className={`h-12 w-12 text-primary transition-all duration-500 ${
                stage !== 'initial' ? 'animate-pulse' : ''
              }`} 
            />
          </div>
        </div>

        {/* Title Text */}
        <div 
          className={`text-center transition-all duration-700 ease-out ${
            stage === 'text' || stage === 'fadeOut'
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            AQI & Weather Prediction
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Forecasting System
          </p>
        </div>

        {/* Loading Dots */}
        <div 
          className={`flex gap-2 transition-all duration-500 ${
            stage === 'text' || stage === 'fadeOut' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ${
            stage !== 'initial' ? 'scale-150 opacity-100' : 'scale-50 opacity-0'
          }`}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
            stage !== 'initial' ? 'scale-150 opacity-100' : 'scale-50 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default IntroAnimation;
