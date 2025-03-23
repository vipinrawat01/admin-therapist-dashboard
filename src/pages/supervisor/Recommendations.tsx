
import React, { useState } from 'react';
import { SearchIcon, Info, Check, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Sample recommendations data
const recommendationsData = [
  {
    id: "1",
    childName: "Noah Williams",
    childId: "1",
    therapyType: "speech",
    date: "Today",
    priority: "high" as const,
    description: "Consider introducing visual cues alongside verbal exercises to reinforce speech patterns.",
    detailedInfo: {
      activity: "Visual Cues Integration",
      steps: [
        "Prepare flashcards with images representing common words",
        "Show the image while pronouncing the word clearly",
        "Ask the child to repeat while looking at the image",
        "Gradually reduce visual dependency as verbal skills improve"
      ],
      benefits: [
        "Strengthens connection between visual and auditory processing",
        "Provides additional reinforcement for learning",
        "Makes speech exercises more engaging and concrete"
      ],
      considerations: [
        "Ensure images are clear and age-appropriate",
        "Don't rush the transition away from visual cues",
        "Monitor progress to adjust the balance between visual and verbal"
      ]
    }
  },
  {
    id: "2",
    childName: "Mia Rodriguez",
    childId: "2",
    therapyType: "sensory",
    date: "Yesterday",
    priority: "medium" as const,
    description: "Reduce sensory input during initial therapy sessions to prevent overstimulation.",
    detailedInfo: {
      activity: "Sensory Calibration Sessions",
      steps: [
        "Start therapy in a minimally stimulating environment",
        "Control lighting, sound, and tactile elements",
        "Introduce sensory elements one at a time",
        "Observe reactions and adjust accordingly"
      ],
      benefits: [
        "Prevents sensory overload and associated meltdowns",
        "Allows better focus on individual sensory processing",
        "Creates a comfortable baseline for therapy progression"
      ],
      considerations: [
        "Each session may need different environmental setup",
        "Be prepared to adjust quickly if signs of distress appear",
        "Document specific triggers for future reference"
      ]
    }
  },
  {
    id: "3",
    childName: "Alex Johnson",
    childId: "3",
    therapyType: "behavior",
    date: "2 days ago",
    priority: "low" as const,
    description: "Incorporate more reward-based activities to reinforce positive behaviors.",
    detailedInfo: {
      activity: "Strategic Reward System",
      steps: [
        "Create a personalized reward chart based on interests",
        "Define clear, achievable behavioral goals",
        "Provide immediate positive reinforcement when goals are met",
        "Gradually extend the time between behavior and reward"
      ],
      benefits: [
        "Strengthens connection between desired behaviors and positive outcomes",
        "Increases motivation to maintain positive behaviors",
        "Provides concrete feedback on progress"
      ],
      considerations: [
        "Ensure rewards are meaningful to the child",
        "Be consistent with the reward system",
        "Gradually transition from external to internal motivation"
      ]
    }
  },
  {
    id: "4",
    childName: "Lily Carter",
    childId: "4",
    therapyType: "speech",
    date: "3 days ago",
    priority: "medium" as const,
    description: "Try using music and rhythm to improve speech flow and articulation.",
    detailedInfo: {
      activity: "Musical Speech Therapy",
      steps: [
        "Select simple songs with clear lyrics and repetitive patterns",
        "Demonstrate clapping or tapping to the rhythm while speaking",
        "Practice problematic sounds within musical phrases",
        "Record sessions to review and celebrate improvement"
      ],
      benefits: [
        "Music engages different neural pathways than regular speech",
        "Rhythm provides structure for speech timing and flow",
        "Makes practice more enjoyable and memorable"
      ],
      considerations: [
        "Choose appropriate music for age and interests",
        "Don't focus exclusively on musical approaches",
        "Ensure volume levels are comfortable"
      ]
    }
  }
];

const SupervisorRecommendations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedTherapyType, setSelectedTherapyType] = useState<string>('all');
  const [openRecommendation, setOpenRecommendation] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter recommendations based on search and filters
  const filteredRecommendations = recommendationsData.filter(rec => {
    const matchesSearch = rec.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = selectedPriority === 'all' || 
      rec.priority === selectedPriority;
    
    const matchesTherapyType = selectedTherapyType === 'all' || 
      rec.therapyType === selectedTherapyType;
    
    return matchesSearch && matchesPriority && matchesTherapyType;
  });

  const handleApprove = (id: string) => {
    toast({
      title: "Recommendation Approved",
      description: "The recommendation has been approved and sent to the therapist.",
    });
    setOpenRecommendation(null);
  };

  const handleReject = (id: string) => {
    toast({
      title: "Recommendation Rejected",
      description: "The recommendation has been rejected.",
    });
    setOpenRecommendation(null);
  };

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

  const selectedRecommendation = recommendationsData.find(rec => rec.id === openRecommendation);

  return (
    <PageLayout title="AI Recommendations">
      <p className="text-muted-foreground mb-6">
        This page will display AI-generated therapy recommendations that need review and approval.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search recommendations by child name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={selectedPriority}
          onValueChange={setSelectedPriority}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedTherapyType}
          onValueChange={setSelectedTherapyType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Therapy Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Therapy Types</SelectItem>
            <SelectItem value="speech">Speech</SelectItem>
            <SelectItem value="behavior">Behavior</SelectItem>
            <SelectItem value="sensory">Sensory</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map(recommendation => (
            <Card key={recommendation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
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
                
                <div className="flex justify-end">
                  <Dialog open={openRecommendation === recommendation.id} onOpenChange={(open) => {
                    if (open) setOpenRecommendation(recommendation.id);
                    else setOpenRecommendation(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Review & Approve
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Review Recommendation</DialogTitle>
                      </DialogHeader>
                      
                      {selectedRecommendation && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-lg">{selectedRecommendation.childName}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={cn(
                                  "text-xs px-2 py-1 rounded-full",
                                  getTherapyTypeColor(selectedRecommendation.therapyType)
                                )}>
                                  {selectedRecommendation.therapyType}
                                </span>
                                <span className="text-xs text-muted-foreground">therapy</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <span className={cn(
                                "text-sm font-medium",
                                getPriorityColor(selectedRecommendation.priority)
                              )}>
                                {selectedRecommendation.priority} priority
                              </span>
                              <span className="text-xs text-muted-foreground mt-1">{selectedRecommendation.date}</span>
                            </div>
                          </div>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle>{selectedRecommendation.detailedInfo.activity}</CardTitle>
                              <CardDescription>{selectedRecommendation.description}</CardDescription>
                            </CardHeader>
                            
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Implementation Steps</h4>
                                <ul className="space-y-2">
                                  {selectedRecommendation.detailedInfo.steps.map((step, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{index + 1}</span>
                                      <span className="text-sm">{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="font-medium mb-2">Benefits</h4>
                                <ul className="space-y-1">
                                  {selectedRecommendation.detailedInfo.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                      <span className="text-sm">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="font-medium mb-2">Important Considerations</h4>
                                <ul className="space-y-1">
                                  {selectedRecommendation.detailedInfo.considerations.map((consideration, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                                      <span className="text-sm">{consideration}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => handleReject(selectedRecommendation.id)} className="gap-1">
                              <X className="h-4 w-4" />
                              Reject
                            </Button>
                            <Button onClick={() => handleApprove(selectedRecommendation.id)} className="gap-1">
                              <Check className="h-4 w-4" />
                              Approve
                            </Button>
                          </DialogFooter>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium">No recommendations found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search criteria or filters.
            </p>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default SupervisorRecommendations;
