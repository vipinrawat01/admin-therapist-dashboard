
import React from 'react';
import { Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TherapistOverviewCardProps {
  therapist: {
    id: string;
    name: string;
    specialty: string;
    children: number;
    sessions: number;
    weekSessions: number;
    performance: number;
  };
  onClick?: () => void;
}

const TherapistOverviewCard = ({ therapist, onClick }: TherapistOverviewCardProps) => {
  // Get the first letter of the first name
  const initial = therapist.name.split(' ')[0][0];
  
  // Determine performance color
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 bg-green-100';
    if (performance >= 80) return 'text-blue-600 bg-blue-100';
    if (performance >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
  
  return (
    <div 
      className="bg-white border rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xl">
          {initial}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{therapist.name}</h3>
              <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
            </div>
            
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              getPerformanceColor(therapist.performance)
            )}>
              {therapist.performance}% Performance
            </div>
          </div>
          
          <div className="flex items-center mt-3 text-sm gap-5">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{therapist.children} children</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{therapist.weekSessions} sessions this week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistOverviewCard;
