
import { useState } from 'react';
import { BarChart, PieChart, FileText, TrendingUp, Users, Calendar, ArrowRight, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportCardProps {
  type: 'progress' | 'effectiveness' | 'engagement' | 'comparison' | 'session' | 'attendance' | 'custom';
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const ReportCard = ({ type, title, description, icon, onClick }: ReportCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = () => {
    switch (type) {
      case 'progress':
        return icon || <TrendingUp className="h-5 w-5 text-therapy-green" />;
      case 'effectiveness':
        return icon || <BarChart className="h-5 w-5 text-therapy-blue" />;
      case 'engagement':
        return icon || <Users className="h-5 w-5 text-therapy-purple" />;
      case 'comparison':
        return icon || <LineChart className="h-5 w-5 text-therapy-orange" />;
      case 'session':
        return icon || <Calendar className="h-5 w-5 text-therapy-orange" />;
      case 'attendance':
        return icon || <PieChart className="h-5 w-5 text-therapy-yellow" />;
      default:
        return icon || <FileText className="h-5 w-5 text-therapy-blue" />;
    }
  };
  
  const getBgClass = () => {
    switch (type) {
      case 'progress':
        return 'bg-therapy-green/10';
      case 'effectiveness':
        return 'bg-therapy-blue/10';
      case 'engagement':
        return 'bg-therapy-purple/10';
      case 'comparison':
        return 'bg-therapy-orange/10';
      case 'session':
        return 'bg-therapy-orange/10';
      case 'attendance':
        return 'bg-therapy-yellow/10';
      default:
        return 'bg-primary/10';
    }
  };
  
  return (
    <div 
      className={cn(
        "therapy-card cursor-pointer transition-all duration-300 card-hover-effect relative overflow-hidden p-6",
        isHovered && "transform-gpu scale-[1.02]"
      )}
      onClick={onClick}
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
        <div className={cn("p-3 rounded-lg", getBgClass())}>
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{title}</h3>
            <ArrowRight className={cn(
              "h-4 w-4 transition-transform duration-300", 
              isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            )} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300",
        isHovered && "opacity-100"
      )} />
    </div>
  );
};

export default ReportCard;
