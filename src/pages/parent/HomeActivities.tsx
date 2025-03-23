
import React, { useState } from 'react';
import { 
  BookOpen, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search,
  ChevronDown,
  AlertCircle,
  BookMarked,
  ArrowUpDown
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

// Mock data for activities
const activitiesData = [
  {
    id: 1,
    title: 'Sound Repetition Exercise',
    type: 'speech',
    therapist: 'Dr. Emma Thompson',
    description: 'Help your child practice pronouncing specific sounds using picture cards',
    status: 'active',
    steps: [
      'Choose 5-10 picture cards with objects that contain the target sound',
      'Show one card at a time and clearly pronounce the word, emphasizing the target sound',
      'Ask your child to repeat the word after you',
      'Provide positive reinforcement for each attempt',
      'Practice each word 3-5 times before moving to the next card'
    ],
    tips: [
      'Keep sessions short (10-15 minutes) to maintain engagement',
      'Use a mirror to help your child see mouth positions',
      'Make it fun by turning it into a game'
    ],
    frequency: '3 times per week',
    progress: 60,
    lastPracticed: '2 days ago'
  },
  {
    id: 2,
    title: 'Calm Down Routine',
    type: 'behavior',
    therapist: 'Dr. Michael Chen',
    description: 'A structured routine to help your child manage emotions and calm down when feeling overwhelmed',
    status: 'active',
    steps: [
      'Identify when your child is getting upset or overstimulated',
      'Guide them to a quiet, comfortable space designated as the "calm zone"',
      'Practice deep breathing together (5 counts in, 5 counts out)',
      'Use a visual timer to show how long to stay in the calm zone',
      'Provide a comfort item or sensory tool if helpful',
      'Review emotions when calm using emotion cards or a feelings chart'
    ],
    tips: [
      'Practice the routine when your child is already calm so they learn the steps',
      'Use consistent, simple language each time',
      'Praise small improvements in self-regulation',
      'Create a visual guide showing each step of the routine'
    ],
    frequency: 'As needed, practice steps daily',
    progress: 75,
    lastPracticed: 'Yesterday'
  },
  {
    id: 3,
    title: 'Texture Exploration',
    type: 'sensory',
    therapist: 'Dr. Sarah Williams',
    description: 'Help your child become more comfortable with different textures through guided exploration',
    status: 'active',
    steps: [
      'Gather 5-7 items with different textures (soft fabric, bumpy rubber, smooth plastic, etc.)',
      'Start with less challenging textures that your child already accepts',
      'Place items in a box or bag for "mystery" exploration',
      'Let your child touch each item and describe how it feels',
      'Name and categorize textures together (smooth, rough, soft, hard)',
      'Gradually introduce more challenging textures over time'
    ],
    tips: [
      'Never force contact with textures that cause distress',
      'Use descriptive language to build vocabulary',
      'Try exploration with feet as well as hands',
      'Connect textures to everyday items in your home'
    ],
    frequency: '2-3 times per week',
    progress: 40,
    lastPracticed: '4 days ago'
  },
  {
    id: 4,
    title: 'Following Multi-Step Directions',
    type: 'cognitive',
    therapist: 'Dr. Emma Thompson',
    description: 'Strengthen your child\'s ability to follow and remember sequences of instructions',
    status: 'completed',
    steps: [
      'Start with simple 2-step directions (e.g., "Pick up the book and put it on the table")',
      'Gradually increase to 3-step directions as your child shows success',
      'Use clear, concise language and pause between steps',
      'Have your child repeat the directions before following them',
      'Incorporate directions into daily routines and play activities'
    ],
    tips: [
      'Use visual cues if needed to support understanding',
      'Celebrate successful completion of all steps',
      'Make it fun by turning it into a treasure hunt or game',
      'Practice in different settings (home, park, store)'
    ],
    frequency: '4-5 times per week',
    progress: 100,
    lastPracticed: '1 week ago'
  }
];

const ParentHomeActivities = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(activitiesData[0]);
  
  const handleMarkComplete = (id: number) => {
    toast({
      title: "Activity marked as completed",
      description: "Your progress has been updated.",
    });
  };
  
  const filteredActivities = activitiesData.filter(activity => 
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <PageLayout title="Home Activities">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Home Activities</h1>
            <p className="text-muted-foreground">
              Recommended activities to support your child's therapy goals
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search activities..."
                className="w-full sm:w-[250px] pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
                  Speech
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="w-4 h-4 rounded-full bg-purple-500 mr-2"></span>
                  Behavior
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="w-4 h-4 rounded-full bg-amber-500 mr-2"></span>
                  Sensory
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                  Cognitive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-1">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                <DropdownMenuItem>By Type</DropdownMenuItem>
                <DropdownMenuItem>Progress (Low to High)</DropdownMenuItem>
                <DropdownMenuItem>Progress (High to Low)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                {filteredActivities
                  .filter(activity => activity.status === 'active')
                  .map((activity) => (
                    <Card 
                      key={activity.id} 
                      className={`cursor-pointer transition-all ${selectedActivity.id === activity.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Badge className={
                              activity.type === 'speech' ? 'bg-blue-500' :
                              activity.type === 'behavior' ? 'bg-purple-500' :
                              activity.type === 'sensory' ? 'bg-amber-500' :
                              'bg-green-500'
                            }>
                              {activity.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Last practiced: {activity.lastPracticed}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-lg mt-2">{activity.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {activity.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>Progress</span>
                          <span>{activity.progress}%</span>
                        </div>
                        <Progress value={activity.progress} className="h-2" />
                      </CardContent>
                      <CardFooter className="pt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarCheck className="h-3 w-3 mr-1" />
                          {activity.frequency}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
              
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={
                            selectedActivity.type === 'speech' ? 'bg-blue-500' :
                            selectedActivity.type === 'behavior' ? 'bg-purple-500' :
                            selectedActivity.type === 'sensory' ? 'bg-amber-500' :
                            'bg-green-500'
                          }>
                            {selectedActivity.type}
                          </Badge>
                        </div>
                        <CardTitle>{selectedActivity.title}</CardTitle>
                        <CardDescription className="mt-1">
                          Recommended by {selectedActivity.therapist}
                        </CardDescription>
                      </div>
                      <Button onClick={() => handleMarkComplete(selectedActivity.id)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Complete
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium flex items-center mb-2">
                        <BookOpen className="mr-2 h-4 w-4 text-primary" />
                        Description
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedActivity.description}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium flex items-center mb-2">
                        <BookMarked className="mr-2 h-4 w-4 text-primary" />
                        Steps to Follow
                      </h3>
                      <ol className="space-y-2 list-decimal list-inside">
                        {selectedActivity.steps.map((step, index) => (
                          <li key={index} className="text-muted-foreground">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium flex items-center mb-2">
                        <AlertCircle className="mr-2 h-4 w-4 text-primary" />
                        Tips & Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {selectedActivity.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span> 
                            <span className="text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CalendarCheck className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Recommended frequency: {selectedActivity.frequency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Progress:</span>
                        <Progress value={selectedActivity.progress} className="h-2 w-20" />
                        <span className="text-sm font-medium">{selectedActivity.progress}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredActivities
                .filter(activity => activity.status === 'completed')
                .map((activity) => (
                  <Card key={activity.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge className={
                          activity.type === 'speech' ? 'bg-blue-500' :
                          activity.type === 'behavior' ? 'bg-purple-500' :
                          activity.type === 'sensory' ? 'bg-amber-500' :
                          'bg-green-500'
                        }>
                          {activity.type}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{activity.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {activity.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={100} className="h-2" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => setSelectedActivity(activity)}>
                        View Details
                      </Button>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Last practiced: {activity.lastPracticed}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge className={
                        activity.type === 'speech' ? 'bg-blue-500' :
                        activity.type === 'behavior' ? 'bg-purple-500' :
                        activity.type === 'sensory' ? 'bg-amber-500' :
                        'bg-green-500'
                      }>
                        {activity.type}
                      </Badge>
                      {activity.status === 'completed' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2">{activity.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {activity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Progress</span>
                      <span>{activity.progress}%</span>
                    </div>
                    <Progress value={activity.progress} className="h-2" />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => setSelectedActivity(activity)}>
                      View Details
                    </Button>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Last practiced: {activity.lastPracticed}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ParentHomeActivities;
