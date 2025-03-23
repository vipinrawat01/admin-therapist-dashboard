
import React, { useState } from 'react';
import { SearchIcon, Info, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
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

// Sample data for children with recommendations
const childrenData = [
  {
    id: "1",
    name: "Noah Williams",
    therapyType: "speech",
    recommendations: [
      {
        id: "1-1",
        childName: "Noah Williams",
        therapyType: "speech",
        date: "Today",
        description: "Consider introducing visual cues alongside verbal exercises to reinforce speech patterns.",
        isApproved: false,
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
        id: "1-2",
        childName: "Noah Williams",
        therapyType: "speech",
        date: "Yesterday",
        description: "Implement rhythmic speaking exercises to improve fluency and articulation.",
        isApproved: false,
        detailedInfo: {
          activity: "Rhythmic Speech Patterns",
          steps: [
            "Start with simple clapping patterns while speaking",
            "Progress to more complex rhythms that match natural speech patterns",
            "Practice challenging sounds within rhythmic patterns",
            "Record sessions to review progress"
          ],
          benefits: [
            "Develops natural speech cadence and flow",
            "Makes articulation practice more engaging",
            "Helps with memory and sequencing of sounds"
          ],
          considerations: [
            "Adjust complexity based on child's abilities",
            "Focus on enjoyment rather than perfection",
            "Use music or metronome if helpful"
          ]
        }
      },
      {
        id: "1-3",
        childName: "Noah Williams",
        therapyType: "speech",
        date: "2 days ago",
        description: "Use storytelling with picture prompts to encourage descriptive language development.",
        isApproved: false,
        detailedInfo: {
          activity: "Picture-Prompted Storytelling",
          steps: [
            "Select engaging picture sequences or story cards",
            "Model descriptive language by narrating what you see",
            "Ask open-ended questions about the pictures",
            "Gradually reduce prompting as child's confidence increases"
          ],
          benefits: [
            "Expands vocabulary in context",
            "Develops narrative skills",
            "Improves sentence formation and grammar"
          ],
          considerations: [
            "Choose age and interest-appropriate images",
            "Allow time for processing before expecting responses",
            "Praise creative interpretations, not just correct descriptions"
          ]
        }
      }
    ]
  },
  {
    id: "2",
    name: "Mia Rodriguez",
    therapyType: "sensory",
    recommendations: [
      {
        id: "2-1",
        childName: "Mia Rodriguez",
        therapyType: "sensory",
        date: "Yesterday",
        description: "Reduce sensory input during initial therapy sessions to prevent overstimulation.",
        isApproved: false,
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
        id: "2-2",
        childName: "Mia Rodriguez",
        therapyType: "sensory",
        date: "3 days ago",
        description: "Introduce weighted blanket during calming activities to provide deep pressure stimulation.",
        isApproved: false,
        detailedInfo: {
          activity: "Weighted Comfort Integration",
          steps: [
            "Start with brief periods using the weighted blanket",
            "Incorporate during story time or quiet activities",
            "Gradually increase duration as tolerated",
            "Monitor child's response and adjust weight if needed"
          ],
          benefits: [
            "Provides proprioceptive input for regulation",
            "Can reduce anxiety and hyperactivity",
            "Improves body awareness and focus"
          ],
          considerations: [
            "Ensure weight is appropriate (generally 10% of body weight)",
            "Never force use if child shows resistance",
            "Teach child to request the blanket when needed"
          ]
        }
      },
      {
        id: "2-3",
        childName: "Mia Rodriguez",
        therapyType: "sensory",
        date: "4 days ago",
        description: "Create a sensory corner with various texture items for exploration during therapy sessions.",
        isApproved: false,
        detailedInfo: {
          activity: "Texture Exploration Station",
          steps: [
            "Collect various safe texture materials (fabrics, clay, beads, etc.)",
            "Organize materials in accessible containers",
            "Introduce each texture with guided exploration",
            "Allow free exploration once comfort is established"
          ],
          benefits: [
            "Develops tactile discrimination abilities",
            "Reduces tactile defensiveness through controlled exposure",
            "Expands sensory vocabulary and preferences"
          ],
          considerations: [
            "Consider allergies when selecting materials",
            "Start with less challenging textures",
            "Respect child's boundaries if they refuse certain textures"
          ]
        }
      }
    ]
  },
  {
    id: "3",
    name: "Alex Johnson",
    therapyType: "behavior",
    recommendations: [
      {
        id: "3-1",
        childName: "Alex Johnson",
        therapyType: "behavior",
        date: "2 days ago",
        description: "Incorporate more reward-based activities to reinforce positive behaviors.",
        isApproved: false,
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
        id: "3-2",
        childName: "Alex Johnson",
        therapyType: "behavior",
        date: "3 days ago",
        description: "Implement visual schedules to reduce transition anxiety between activities.",
        isApproved: false,
        detailedInfo: {
          activity: "Visual Transition Supports",
          steps: [
            "Create simple visual schedule cards for daily activities",
            "Review the schedule at the start of each session",
            "Use countdown techniques before transitions",
            "Celebrate successful transitions"
          ],
          benefits: [
            "Reduces anxiety about what comes next",
            "Builds predictability into the therapy routine",
            "Develops time management skills"
          ],
          considerations: [
            "Keep visuals clear and simple",
            "Be consistent in using the schedule",
            "Allow child to participate in creating or managing the schedule"
          ]
        }
      },
      {
        id: "3-3",
        childName: "Alex Johnson",
        therapyType: "behavior",
        date: "4 days ago",
        description: "Use social stories to prepare for challenging situations and develop coping strategies.",
        isApproved: false,
        detailedInfo: {
          activity: "Personalized Social Stories",
          steps: [
            "Identify specific challenging situations",
            "Create simple stories with clear expectations and strategies",
            "Read stories regularly before anticipated challenging events",
            "Update stories as child develops new skills"
          ],
          benefits: [
            "Prepares child for difficult situations",
            "Provides concrete strategies for coping",
            "Reduces anxiety through familiarity"
          ],
          considerations: [
            "Use positive, affirming language",
            "Include the child's perspective in stories",
            "Keep stories concrete and specific to situations"
          ]
        }
      }
    ]
  }
];

const SupervisorRecommendations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTherapyType, setSelectedTherapyType] = useState<string>('all');
  const [openRecommendation, setOpenRecommendation] = useState<string | null>(null);
  const [expandedChildren, setExpandedChildren] = useState<string[]>([]);
  const [approvedRecommendations, setApprovedRecommendations] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Filter children based on search and therapy type
  const filteredChildren = childrenData.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTherapyType = selectedTherapyType === 'all' || 
      child.therapyType === selectedTherapyType;
    
    return matchesSearch && matchesTherapyType;
  });

  const handleApprove = (id: string) => {
    setApprovedRecommendations(prev => [...prev, id]);
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

  const toggleExpandChild = (childId: string) => {
    setExpandedChildren(prev => 
      prev.includes(childId) 
        ? prev.filter(id => id !== childId)
        : [...prev, childId]
    );
  };

  const getTherapyTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'speech': return 'bg-blue-100 text-blue-600';
      case 'behavior': return 'bg-purple-100 text-purple-600';
      case 'sensory': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const selectedRecommendation = childrenData
    .flatMap(child => child.recommendations)
    .find(rec => rec.id === openRecommendation);

  return (
    <PageLayout title="AI Recommendations">
      <p className="text-muted-foreground mb-6">
        Review and approve AI-generated therapy recommendations for children under your supervision.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search recommendations by child name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

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
        {filteredChildren.length > 0 ? (
          filteredChildren.map(child => (
            <Card key={child.id} className="hover:shadow-md transition-shadow">
              <CardHeader 
                className="cursor-pointer" 
                onClick={() => toggleExpandChild(child.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xl">
                      {child.name[0]}
                    </div>
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          getTherapyTypeColor(child.therapyType)
                        )}>
                          {child.therapyType}
                        </span>
                        <span>therapy</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{child.recommendations.length} recommendations</span>
                    {expandedChildren.includes(child.id) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {expandedChildren.includes(child.id) && (
                <CardContent className="pt-0">
                  <div className="divide-y">
                    {child.recommendations.map(recommendation => (
                      <div key={recommendation.id} className="py-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            {approvedRecommendations.includes(recommendation.id) && (
                              <span className="text-sm font-medium text-green-600">Approved</span>
                            )}
                            <span className="text-xs text-muted-foreground">{recommendation.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Dialog open={openRecommendation === recommendation.id} onOpenChange={(open) => {
                            if (open) setOpenRecommendation(recommendation.id);
                            else setOpenRecommendation(null);
                          }}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className={approvedRecommendations.includes(recommendation.id) ? 
                                  "border-green-600 text-green-600" : ""}
                                disabled={approvedRecommendations.includes(recommendation.id)}
                              >
                                {approvedRecommendations.includes(recommendation.id) ? 
                                  "Approved" : "Review & Approve"}
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
                                    
                                    <span className="text-xs text-muted-foreground">{selectedRecommendation.date}</span>
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
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
