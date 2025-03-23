
import React, { useState } from 'react';
import { SearchIcon, Filter, FileDown, BarChart3, PieChart } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

// Sample children data
const childrenData = [
  {
    id: "1",
    name: "Noah Williams",
    age: 5,
    therapist: "Emma Thompson",
    therapyType: "Speech",
    sessionCount: 24,
    nextSession: "Tomorrow, 10:00 AM",
    progress: 75,
    startDate: "2023-01-15",
    domains: {
      speech: 75,
      communication: 70,
      listening: 80
    }
  },
  {
    id: "2",
    name: "Mia Rodriguez",
    age: 6,
    therapist: "Michael Chen",
    therapyType: "Behavior",
    sessionCount: 18,
    nextSession: "Today, 2:30 PM",
    progress: 65,
    startDate: "2023-02-10",
    domains: {
      attention: 60,
      social: 65,
      emotional: 70
    }
  },
  {
    id: "3",
    name: "Alex Johnson",
    age: 4,
    therapist: "Sarah Williams",
    therapyType: "Sensory",
    sessionCount: 32,
    nextSession: "Wednesday, 11:15 AM",
    progress: 80,
    startDate: "2022-11-05",
    domains: {
      tactile: 85,
      auditory: 75,
      visual: 80
    }
  },
  {
    id: "4",
    name: "Lily Carter",
    age: 7,
    therapist: "Emma Thompson",
    therapyType: "Speech",
    sessionCount: 16,
    nextSession: "Friday, 3:00 PM",
    progress: 60,
    startDate: "2023-03-20",
    domains: {
      speech: 60,
      communication: 55,
      listening: 65
    }
  },
  {
    id: "5",
    name: "Ethan Patel",
    age: 8,
    therapist: "Michael Chen",
    therapyType: "Behavior",
    sessionCount: 28,
    nextSession: "Thursday, 1:45 PM",
    progress: 85,
    startDate: "2022-09-15",
    domains: {
      attention: 90,
      social: 80,
      emotional: 85
    }
  }
];

const SupervisorChildProgress = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTherapyType, setSelectedTherapyType] = useState<string>('all');
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter children based on search query and therapy type
  const filteredChildren = childrenData.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.therapist.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTherapyType = selectedTherapyType === 'all' || 
      child.therapyType.toLowerCase() === selectedTherapyType.toLowerCase();
    
    return matchesSearch && matchesTherapyType;
  });

  const handleProgressView = (id: string) => {
    setSelectedChild(id);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTherapyTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'speech': return 'bg-blue-100 text-blue-600';
      case 'behavior': return 'bg-purple-100 text-purple-600';
      case 'sensory': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const selectedChildData = childrenData.find(child => child.id === selectedChild);

  const handleExportProgress = () => {
    toast({
      title: "Export Started",
      description: `Exporting progress report for ${selectedChildData?.name}`,
    });
  };

  return (
    <PageLayout title="Child Progress">
      <p className="text-muted-foreground mb-6">
        This page will show detailed progress tracking for each child.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search children by name or therapist..."
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

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Therapist</TableHead>
              <TableHead>Therapy Type</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChildren.length > 0 ? (
              filteredChildren.map(child => (
                <TableRow key={child.id}>
                  <TableCell className="font-medium">{child.name}</TableCell>
                  <TableCell>{child.age}</TableCell>
                  <TableCell>{child.therapist}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTherapyTypeColor(child.therapyType)}>
                      {child.therapyType}
                    </Badge>
                  </TableCell>
                  <TableCell>{child.sessionCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(child.progress)}`}
                          style={{ width: `${child.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{child.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleProgressView(child.id)}
                        >
                          View Progress
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Progress Details - {child.name}</DialogTitle>
                        </DialogHeader>
                        
                        <Tabs defaultValue="overview">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="domains">Domain Progress</TabsTrigger>
                            <TabsTrigger value="sessions">Session History</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">{child.progress}%</div>
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div 
                                      className={`h-2 rounded-full ${getProgressColor(child.progress)}`}
                                      style={{ width: `${child.progress}%` }}
                                    ></div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">{child.sessionCount}</div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Started {new Date(child.startDate).toLocaleDateString()}
                                  </p>
                                </CardContent>
                              </Card>
                              
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm font-medium">Next Session</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-base font-medium">{child.nextSession}</div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    With {child.therapist}
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle>Progress Chart</CardTitle>
                              </CardHeader>
                              <CardContent className="h-64 flex items-center justify-center">
                                <div className="text-center">
                                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                                  <p className="mt-2 text-muted-foreground">Progress chart visualization would appear here</p>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <div className="flex justify-end">
                              <Button onClick={handleExportProgress} className="gap-2">
                                <FileDown className="h-4 w-4" />
                                Export Progress Report
                              </Button>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="domains" className="space-y-4 pt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Domain-specific Progress</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {Object.entries(child.domains).map(([domain, progress]) => (
                                    <div key={domain} className="space-y-1">
                                      <div className="flex justify-between">
                                        <span className="text-sm font-medium capitalize">{domain}</span>
                                        <span className="text-sm">{progress}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                          className={`h-2 rounded-full ${getProgressColor(progress)}`}
                                          style={{ width: `${progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle>Domain Distribution</CardTitle>
                              </CardHeader>
                              <CardContent className="h-64 flex items-center justify-center">
                                <div className="text-center">
                                  <PieChart className="h-16 w-16 mx-auto text-muted-foreground" />
                                  <p className="mt-2 text-muted-foreground">Domain distribution chart would appear here</p>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="sessions" className="space-y-4 pt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Recent Sessions</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Therapist</TableHead>
                                      <TableHead>Focus Areas</TableHead>
                                      <TableHead>Progress</TableHead>
                                      <TableHead>Notes</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {/* Sample session data */}
                                    <TableRow>
                                      <TableCell>May 10, 2023</TableCell>
                                      <TableCell>{child.therapist}</TableCell>
                                      <TableCell>Core Skills</TableCell>
                                      <TableCell>
                                        <Badge className="bg-green-100 text-green-800">Good</Badge>
                                      </TableCell>
                                      <TableCell>Made significant progress with key exercises</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>May 3, 2023</TableCell>
                                      <TableCell>{child.therapist}</TableCell>
                                      <TableCell>Practical Application</TableCell>
                                      <TableCell>
                                        <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
                                      </TableCell>
                                      <TableCell>Struggled with new concepts but showed effort</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>April 26, 2023</TableCell>
                                      <TableCell>{child.therapist}</TableCell>
                                      <TableCell>Skill Review</TableCell>
                                      <TableCell>
                                        <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                                      </TableCell>
                                      <TableCell>Exceeded expectations in all activities</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </CardContent>
                            </Card>
                            
                            <div className="flex justify-end">
                              <Button variant="outline">View All Sessions</Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <h3 className="text-lg font-medium">No children found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </PageLayout>
  );
};

export default SupervisorChildProgress;
