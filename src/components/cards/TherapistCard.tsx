
import { User, Star, Calendar } from 'lucide-react';
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
  // Helper function to get badge class based on specialty
  const getBadgeClass = (specialty: string) => {
    const specialtyLower = specialty.toLowerCase();
    
    if (specialtyLower === 'speech') 
      return 'bg-blue-100 text-blue-600';
    if (specialtyLower === 'behavior') 
      return 'bg-purple-100 text-purple-600';
    if (specialtyLower === 'sensory') 
      return 'bg-pink-100 text-pink-600';
    if (specialtyLower === 'occupational') 
      return 'bg-green-100 text-green-600';
    if (specialtyLower === 'adl') 
      return 'bg-orange-100 text-orange-600';
    if (specialtyLower === 'special') 
      return 'bg-yellow-100 text-yellow-600';
    
    return 'bg-gray-100 text-gray-600';
  };
  
  // First letter for avatar
  const firstLetter = therapist.name.split(' ')[0][0];
  
  return (
    <div 
      className={cn(
        "bg-white border rounded-lg p-5 cursor-pointer transition-all hover:shadow-md",
        selected && "ring-2 ring-primary"
      )}
      onClick={() => onSelect(therapist.id)}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xl">
          {firstLetter}
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
          
          <div className="flex items-center mt-3 text-sm gap-5">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{therapist.children} children</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{therapist.sessions} sessions</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {therapist.specialties.map((specialty, i) => (
              <span 
                key={i} 
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  getBadgeClass(specialty)
                )}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
