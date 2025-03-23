
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardSimpleProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  indicator?: {
    type: 'positive' | 'negative' | 'warning';
    text: string;
  };
  className?: string;
}

const StatCardSimple = ({ icon, title, value, indicator, className }: StatCardSimpleProps) => {
  return (
    <div className={cn("bg-white rounded-lg p-5 border flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      
      {indicator && (
        <div className={cn(
          "text-xs font-medium",
          indicator.type === 'positive' && "text-green-600",
          indicator.type === 'negative' && "text-red-600",
          indicator.type === 'warning' && "text-amber-600",
        )}>
          {indicator.text}
        </div>
      )}
    </div>
  );
};

export default StatCardSimple;
