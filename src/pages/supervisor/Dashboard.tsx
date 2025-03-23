
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Lightbulb,
  User,
  ArrowRight,
  BarChart3,
  Mail,
  FileDown,
  FileText,
  MessageSquare
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import StatCardSimple from '@/components/cards/StatCardSimple';
import TherapistOverviewCard from '@/components/cards/TherapistOverviewCard';
import RecommendationCard from '@/components/cards/RecommendationCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Sample data for therapists
const therapistsData = [
  {
    id: '1',
    name: 'Dr. Emma Thompson',
    specialty: 'Speech & OT Therapist',
    children: 8,
    sessions: 120,
    weekSessions: 24,
    performance: 92
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Behavior Therapist',
    children: 6,
    sessions: 95,
    weekSessions: 18,
    performance: 88
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    specialty: 'Sensory Therapist',
    children: 5,
    sessions: 85,
    weekSessions: 15,
    performance: 95
  }
];

// Sample data for recommendations
const recommendationsData = [
  {
    id: '1',
    childName: 'Noah Williams',
    therapyType: 'speech',
    date: 'Today',
    priority: 'high' as const,
    description: 'Consider introducing visual cues alongside verbal exercises'
  },
  {
    id: '2',
    childName: 'Mia Rodriguez',
    therapyType: 'sensory',
    date: 'Yesterday',
    priority: 'medium' as const,
    description: 'Reduce sensory input during initial therapy sessions'
  },
  {
    id: '3',
    childName: 'Alex Johnson',
    therapyType: 'behavior',
    date: '2 days ago',
    priority: 'low' as const,
    description: 'Incorporate more reward-based activities'
  }
];

const SupervisorDashboard = () => {
  const { toast } = useToast();
  
  const handleTherapistClick = (id: string) => {
    toast({
      title: "Therapist Selected",
      description: `Viewing therapist with ID: ${id}`,
    });
  };
  
  const handleReviewRecommendation = (id: string) => {
    toast({
      title: "Recommendation Review",
      description: `Opening review for recommendation ID: ${id}`,
    });
  };
  
  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `Starting action: ${action}`,
    });
  };
  
  return (
    <PageLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardSimple
            icon={<Users className="h-6 w-6 text-blue-600" />}
            title="Therapists"
            value="3"
            indicator={{ type: 'positive', text: 'All active' }}
          />
          
          <StatCardSimple
            icon={<User className="h-6 w-6 text-purple-600" />}
            title="Children"
            value="15"
            indicator={{ type: 'warning', text: '2 need attention' }}
          />
          
          <StatCardSimple
            icon={<Calendar className="h-6 w-6 text-green-600" />}
            title="Sessions This Week"
            value="57"
            indicator={{ type: 'positive', text: '↑ 12% from last week' }}
          />
          
          <StatCardSimple
            icon={<Lightbulb className="h-6 w-6 text-amber-600" />}
            title="AI Recommendations"
            value="8"
            indicator={{ type: 'negative', text: '3 high priority' }}
          />
        </div>
        
        {/* Therapist Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Therapist Overview</h2>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <a href="/supervisor/therapists">
                View All <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="space-y-4">
            {therapistsData.map(therapist => (
              <TherapistOverviewCard 
                key={therapist.id} 
                therapist={therapist} 
                onClick={() => handleTherapistClick(therapist.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Recommendations */}
          <div className="border rounded-lg bg-white">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">AI Recommendations</h2>
            </div>
            
            <div className="divide-y">
              {recommendationsData.map(recommendation => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  onReview={() => handleReviewRecommendation(recommendation.id)}
                />
              ))}
            </div>
            
            <div className="p-4 flex justify-center">
              <Button variant="outline" className="w-full" asChild>
                <a href="/supervisor/recommendations">
                  View All Recommendations
                </a>
              </Button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="border rounded-lg bg-white">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start gap-2" onClick={() => handleQuickAction('Send Parent Update')}>
                <Mail className="h-4 w-4" />
                Send Parent Update
              </Button>
              
              <Button variant="outline" className="justify-start gap-2" onClick={() => handleQuickAction('Generate Child Report')}>
                <FileDown className="h-4 w-4" />
                Generate Child Report
              </Button>
              
              <Button variant="outline" className="justify-start gap-2" onClick={() => handleQuickAction('View Progress Charts')}>
                <BarChart3 className="h-4 w-4" />
                View Progress Charts
              </Button>
              
              <Button variant="outline" className="justify-start gap-2" onClick={() => handleQuickAction('Schedule Review')}>
                <Calendar className="h-4 w-4" />
                Schedule Review
              </Button>
              
              <Button variant="outline" className="justify-start gap-2" asChild>
                <a href="/supervisor/parent-messages">
                  <MessageSquare className="h-4 w-4" />
                  Message Parents
                </a>
              </Button>
              
              <Button variant="outline" className="justify-start gap-2" onClick={() => handleQuickAction('Submit Monthly Report')}>
                <FileText className="h-4 w-4" />
                Submit Monthly Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SupervisorDashboard;
