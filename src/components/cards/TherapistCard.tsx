
import { useState } from 'react';
import { User, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TherapistCardProps {
  therapist: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    children: number;
    sessions: number;
    specialties: string[];
  };
  onSelect: (id: string) => void;
  selected?: boolean;
}

const TherapistCard = ({ therapist, onSelect, selected }: TherapistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Helper function to get badge class based on specialty
  const getBadgeClass = (specialty: string) => {
    const specialtyLower = specialty.toLowerCase();
    if (specialtyLower.includes('speech')) return 'badge-speech';
    if (specialtyLower.includes('behavior')) return 'badge-behavior';
    if (specialtyLower.includes('sensory')) return 'badge-sensory';
    if (specialtyLower.includes('occupational')) return 'badge-occupational';
    if (specialtyLower.includes('adl')) return 'badge-adl';
    if (specialtyLower.includes('special')) return 'badge-special';
    return 'therapy-badge bg-gray-100 text-gray-700';
  };
  
  return (
    <div 
      className={cn(
        "therapy-card cursor-pointer transition-all card-hover-effect relative overflow-hidden",
        selected && "ring-2 ring-primary",
        isHovered && "transform-gpu"
      )}
      onClick={() => onSelect(therapist.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight bar animation */}
      <div
        className={cn(
          "absolute top-0 left-0 h-1 bg-primary transition-all duration-300", 
          isHovered ? "w-full" : "w-0"
        )}
      />
      
      <div className="flex items-start gap-4">
        <div className="avatar-initial w-10 h-10 text-white">
          {therapist.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{therapist.name}</h3>
              <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{therapist.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-3 text-sm">
            <div className="flex items-center gap-1 mr-4">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{therapist.children} children</span>
            </div>
            <div className="text-muted-foreground">
              {therapist.sessions} sessions
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {therapist.specialties.map((specialty, i) => (
              <span key={i} className={getBadgeClass(specialty)}>
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className={cn(
        "mt-4 pt-3 border-t border-border flex justify-end transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-70"
      )}>
        <Button variant="ghost" size="sm" className="gap-1 text-primary">
          <span>View details</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TherapistCard;
