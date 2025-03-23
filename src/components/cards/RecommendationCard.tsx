
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: {
    id: string;
    childName: string;
    therapyType: string;
    date: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
  };
  onReview: (id: string) => void;
}

const RecommendationCard = ({ recommendation, onReview }: RecommendationCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };
  
  const getTherapyTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'speech': return 'bg-blue-100 text-blue-600';
      case 'behavior': return 'bg-purple-100 text-purple-600';
      case 'sensory': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div className="flex flex-col p-5 border-b">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium">{recommendation.childName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              getTherapyTypeColor(recommendation.therapyType)
            )}>
              {recommendation.therapyType}
            </span>
            <span className="text-xs text-muted-foreground">therapy</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className={cn(
            "text-sm font-medium",
            getPriorityColor(recommendation.priority)
          )}>
            {recommendation.priority} priority
          </span>
          <span className="text-xs text-muted-foreground mt-1">{recommendation.date}</span>
        </div>
      </div>
      
      <div className="flex items-start gap-2 mb-3">
        <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
      </div>
      
      <div className="self-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onReview(recommendation.id)}
        >
          Review & Approve
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
