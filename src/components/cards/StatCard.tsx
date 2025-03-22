
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  color?: 'default' | 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
  className?: string;
}

const StatCard = ({ value, label, trend, icon, color = 'default', className }: StatCardProps) => {
  const colorClasses = {
    default: '',
    blue: 'border-l-4 border-l-therapy-blue',
    green: 'border-l-4 border-l-therapy-green',
    purple: 'border-l-4 border-l-therapy-purple',
    orange: 'border-l-4 border-l-therapy-orange',
    red: 'border-l-4 border-l-therapy-red',
    yellow: 'border-l-4 border-l-therapy-yellow',
  };

  const trendIconColor = trend?.isPositive ? 'text-therapy-green' : 'text-therapy-red';

  return (
    <div className={cn("stat-card animate-scale-in card-hover-effect", colorClasses[color], className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="stat-value">{value}</p>
          <p className="stat-label">{label}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-primary/10">
            {icon}
          </div>
        )}
      </div>
      
      {trend && (
        <div className={cn("stat-trend", trendIconColor)}>
          {trend.isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          <span>{Math.abs(trend.value)}%</span>
          {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
