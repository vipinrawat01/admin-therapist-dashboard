
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'default' | 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'default', 
  size = 'md',
  showValue = false,
  className 
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'bg-therapy-blue';
      case 'green': return 'bg-therapy-green';
      case 'purple': return 'bg-therapy-purple';
      case 'orange': return 'bg-therapy-orange';
      case 'red': return 'bg-therapy-red';
      case 'yellow': return 'bg-therapy-yellow';
      default: return 'bg-primary';
    }
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-1';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };
  
  return (
    <div className={cn("w-full", className)}>
      {showValue && (
        <div className="flex justify-between text-xs mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={cn("progress-bar", getSizeClass())}>
        <div 
          className={cn("progress-value", getColorClass())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-xs text-right">{percentage.toFixed(0)}%</div>
      )}
    </div>
  );
};

export default ProgressBar;
