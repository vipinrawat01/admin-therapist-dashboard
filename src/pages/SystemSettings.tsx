
import { useState } from 'react';
import { Search, BrainCircuit, DownloadCloud, Info, Lightbulb } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressBar from '@/components/elements/ProgressBar';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const aiActivities = [
  {
    id: '1',
    title: 'Speech therapy recommendations generated for Noah Williams',
    user: { name: 'Dr. Emma Thompson', role: 'Therapist' },
    time: '2 hours ago',
    accuracy: 95,
    feedback: 'Very helpful',
  },
  {
    id: '2',
    title: 'Sensory integration activities suggested for Mia Rodriguez',
    user: { name: 'Janet Miller', role: 'Supervisor' },
    time: 'Yesterday',
    accuracy: 87,
    feedback: 'Partially helpful',
  },
  {
    id: '3',
    title: 'Behavior management technique explained to parent',
    user: { name: 'Sarah Chen', role: 'Parent' },
    time: '2 days ago',
    accuracy: 98,
    feedback: 'Excellent suggestions',
  },
  {
    id: '4',
    title: 'Fine motor skills assessment analyzed',
    user: { name: 'Dr. Marcus Johnson', role: 'Therapist' },
    time: '3 days ago',
    accuracy: 92,
    feedback: 'Good but needed minor adjustments',
  },
  {
    id: '5',
    title: 'Parent communication strategy suggested',
    user: { name: 'Robert Wilson', role: 'Supervisor' },
    time: '1 week ago',
    accuracy: 83,
    feedback: 'Needed significant revision',
  },
];

const SystemSettings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ai-monitoring');
  const { toast } = useToast();

  const filteredActivities = aiActivities.filter(activity => {
    if (searchQuery && 
        !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !activity.user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExplain = (id: string) => {
    toast({
      title: "AI Explanation",
      description: "The AI analyzed previous therapy sessions and identified patterns in communication development that suggested these specific exercises would be most beneficial.",
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Data refreshed",
      description: "The latest AI monitoring data has been loaded.",
    });
  };

  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 95) return 'bg-therapy-green';
    if (accuracy >= 85) return 'bg-therapy-blue';
    if (accuracy >= 75) return 'bg-therapy-yellow';
    return 'bg-therapy-red';
  };

  const metrics = {
    recommendation: 92,
    satisfaction: 87,
    adoption: 78
  };

  return (
    <PageLayout title="System Settings">
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="ai-monitoring" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="ai-monitoring">AI Monitoring</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="ai-models">AI Models</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline" 
          className="gap-2 ml-4 hidden md:flex" 
          onClick={handleRefreshData}
        >
          <DownloadCloud className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>
      
      <TabsContent value="ai-monitoring" className="animate-fade-in mt-0">
        <div className="therapy-card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">AI Activity Monitoring</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Track and review AI-generated recommendations and suggestions across the platform
          </p>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search AI activities or users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
            {filteredActivities.map(activity => (
              <div 
                key={activity.id} 
                className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h3 className="font-medium">{activity.title}</h3>
                      <div 
                        className={cn(
                          "px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1",
                          activity.accuracy >= 95 ? "bg-green-100 text-therapy-green" :
                          activity.accuracy >= 85 ? "bg-blue-100 text-therapy-blue" :
                          activity.accuracy >= 75 ? "bg-yellow-100 text-therapy-yellow" :
                          "bg-red-100 text-therapy-red"
                        )}
                      >
                        {activity.accuracy}% Accuracy
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{activity.user.name} ({activity.user.role})</span>
                      <span className="mx-2">•</span>
                      <span>{activity.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm">{activity.feedback}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 text-primary" 
                        onClick={() => handleExplain(activity.id)}
                      >
                        <Info className="h-4 w-4" />
                        Explain
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="gap-1">
              <DownloadCloud className="h-4 w-4" />
              Export Report
            </Button>
            
            <Button size="sm" className="gap-1">
              View All Activity
            </Button>
          </div>
        </div>
        
        <div className="therapy-card">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">AI Performance Metrics</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Overview of AI recommendation accuracy and user satisfaction rates
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Recommendation Accuracy</span>
                <span className="font-medium">{metrics.recommendation}%</span>
              </div>
              <ProgressBar 
                value={metrics.recommendation} 
                color="green" 
                size="lg" 
                className="mb-2" 
              />
              <p className="text-xs text-muted-foreground">Based on therapist feedback</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">User Satisfaction</span>
                <span className="font-medium">{metrics.satisfaction}%</span>
              </div>
              <ProgressBar 
                value={metrics.satisfaction} 
                color="blue" 
                size="lg" 
                className="mb-2" 
              />
              <p className="text-xs text-muted-foreground">Based on all user feedback</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Activity Adoption</span>
                <span className="font-medium">{metrics.adoption}%</span>
              </div>
              <ProgressBar 
                value={metrics.adoption} 
                color="purple" 
                size="lg" 
                className="mb-2" 
              />
              <p className="text-xs text-muted-foreground">% of approved recommendations used</p>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="configuration" className="animate-fade-in mt-0">
        <div className="therapy-card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.9046 3.06005C12.6988 3.02106 12.4744 3 12.2363 3H11.7637C11.5256 3 11.3012 3.02106 11.0954 3.06005C10.7942 3.11353 10.5438 3.36229 10.4699 3.65864L10.2554 4.50168C10.1625 4.87711 9.89251 5.18008 9.52653 5.30997C9.38265 5.36533 9.24283 5.42949 9.10771 5.50193C8.77406 5.68032 8.37406 5.69399 8.06267 5.51437L7.30342 5.06023C7.03839 4.90128 6.73405 4.84039 6.4356 4.88597C6.26671 4.9113 6.10133 4.95216 5.94043 5.00762C5.64681 5.10806 5.41917 5.33467 5.31738 5.62755L5.05423 6.40896C4.91835 6.79613 4.97984 7.22551 5.26296 7.53583C5.41359 7.70278 5.52255 7.90523 5.57585 8.13452C5.6292 8.36409 5.62321 8.60399 5.55815 8.82992C5.50242 9.02307 5.41832 9.20595 5.30908 9.37353C5.1269 9.67401 4.80263 9.87411 4.41808 9.82931L3.56005 9.71446C3.22666 9.67305 2.89911 9.77648 2.65148 9.99518C2.53822 10.0959 2.43006 10.2032 2.32733 10.3169C2.11652 10.5424 2.01492 10.8425 2.05444 11.1451L2.17738 12.0001C2.22133 12.3347 2.43739 12.6255 2.74577 12.7686C3.04347 12.9057 3.27466 13.1358 3.41296 13.4334C3.55126 13.731 3.58591 14.0623 3.51068 14.3668C3.44776 14.6195 3.31147 14.8417 3.12511 15.0106C2.85337 15.2549 2.73906 15.6423 2.8249 16.0006L3.09335 16.7776C3.1912 17.1813 3.49651 17.4858 3.87129 17.5492C4.0626 17.5811 4.2510 17.6289 4.43607 17.6921C4.80471 17.8216 5.09338 18.1266 5.18631 18.5038L5.40074 19.345C5.47458 19.6409 5.72198 19.8895 6.02334 19.9443C6.23334 19.9827 6.45085 20.0018 6.67545 20.0018H7.14611C7.44615 20.0018 7.73628 19.9356 7.98142 19.79C8.10406 19.7139 8.23566 19.6496 8.37468 19.5979C8.70912 19.4773 9.08079 19.5059 9.36361 19.6952L10.1228 20.1494C10.3866 20.3071 10.6894 20.3679 10.9864 20.3233C11.1553 20.298 11.3207 20.2571 11.4816 20.2017C11.7768 20.1007 12.0057 19.8728 12.1074 19.5784L12.3706 18.797C12.5065 18.4098 12.445 17.9805 12.1619 17.6701C12.0112 17.5032 11.9023 17.3007 11.849 17.0714C11.7956 16.8419 11.8016 16.602 11.8667 16.376C11.9224 16.1829 12.0065 16 12.1158 15.8324C12.298 15.5319 12.6222 15.3318 13.0068 15.3766L13.865 15.4915C14.1983 15.5329 14.5259 15.4295 14.7735 15.2108C14.8868 15.1101 14.9949 15.0028 15.0977 14.8891C15.3085 14.6635 15.4101 14.3635 15.3706 14.0608L15.2476 13.2059C15.2037 12.8712 14.9876 12.5805 14.6792 12.4374C14.3815 12.3002 14.1503 12.0702 14.012 11.7726C13.8737 11.475 13.8391 11.1436 13.9143 10.8391C13.9772 10.5864 14.1135 10.3643 14.2999 10.1953C14.5716 9.95098 14.6859 9.56369 14.6001 9.20534L14.3316 8.42827C14.2338 8.02466 13.9285 7.72009 13.5537 7.65671C13.3624 7.62483 13.1739 7.57694 12.9889 7.51379C12.6203 7.38431 12.3316 7.07933 12.2387 6.70213L12.0243 5.86082C11.9504 5.56447 11.7019 5.31536 11.4016 5.26135L12.9046 3.06005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">System Configuration</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Configure system settings, permissions, and integration options
          </p>
          <Button>Access Configuration Panel</Button>
        </div>
      </TabsContent>
      
      <TabsContent value="ai-models" className="animate-fade-in mt-0">
        <div className="therapy-card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V2M12 22V20M4.93 19.07L3.51 20.49M20.49 3.51L19.07 4.93M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34M19.07 19.07L20.49 20.49M3.51 3.51L4.93 4.93M12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">AI Models</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Manage AI model settings, training, and deployment
          </p>
          <Button>Manage AI Models</Button>
        </div>
      </TabsContent>
    </PageLayout>
  );
};

export default SystemSettings;
