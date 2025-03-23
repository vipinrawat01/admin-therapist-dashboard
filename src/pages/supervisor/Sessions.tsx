
import React, { useState } from 'react';
import { SearchIcon, CalendarIcon, Calendar as CalendarFull, Filter, FileDown, FileText } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { format } from "date-fns";

// Sample therapy sessions data
const sessionsData = [
  {
    id: "1",
    date: "2023-05-10",
    time: "10:00 AM",
    duration: 60,
    childName: "Noah Williams",
    childId: "1",
    therapistName: "Emma Thompson",
    therapistId: "1",
    therapyType: "Speech",
    status: "completed" as const,
    notes: "Focused on articulation of 'r' sounds. Made good progress with word repetition exercises.",
    goals: ["Improve 'r' sound articulation", "Practice conversational skills"],
    achievements: ["Successfully pronounced 'r' in 7/10 test words", "Engaged in 5-minute conversation with minimal prompts"],
    nextSteps: "Continue with 'r' sound exercises, introduce more complex conversational scenarios"
  },
  {
    id: "2",
    date: "2023-05-10",
    time: "1:30 PM",
    duration: 45,
    childName: "Mia Rodriguez",
    childId: "2",
    therapistName: "Michael Chen",
    therapistId: "2",
    therapyType: "Behavior",
    status: "completed" as const,
    notes: "Worked on transition management. Showed improvement when using visual schedule.",
    goals: ["Reduce transition resistance", "Practice using visual schedule independently"],
    achievements: ["Completed 4/5 transitions with minimal resistance", "Referenced visual schedule without prompting twice"],
    nextSteps: "Continue using visual schedule, gradually reduce verbal prompts"
  },
  {
    id: "3",
    date: "2023-05-11",
    time: "9:15 AM",
    duration: 60,
    childName: "Alex Johnson",
    childId: "3",
    therapistName: "Sarah Williams",
    therapistId: "3",
    therapyType: "Sensory",
    status: "scheduled" as const,
    notes: "",
    goals: ["Tactile desensitization", "Improve response to auditory stimuli"],
    achievements: [],
    nextSteps: ""
  },
  {
    id: "4",
    date: "2023-05-11",
    time: "11:30 AM",
    duration: 45,
    childName: "Lily Carter",
    childId: "4",
    therapistName: "Emma Thompson",
    therapistId: "1",
    therapyType: "Speech",
    status: "scheduled" as const,
    notes: "",
    goals: ["Review vowel sounds", "Practice word combinations"],
    achievements: [],
    nextSteps: ""
  },
  {
    id: "5",
    date: "2023-05-09",
    time: "3:00 PM",
    duration: 60,
    childName: "Ethan Patel",
    childId: "5",
    therapistName: "Michael Chen",
    therapistId: "2",
    therapyType: "Behavior",
    status: "completed" as const,
    notes: "Focused on emotional regulation strategies. Responded well to calming techniques.",
    goals: ["Identify emotional triggers", "Practice calming techniques"],
    achievements: ["Identified 3 emotional triggers", "Successfully used deep breathing twice during session"],
    nextSteps: "Continue practicing calming techniques, introduce emotion journaling"
  },
  {
    id: "6",
    date: "2023-05-12",
    time: "2:45 PM",
    duration: 60,
    childName: "Noah Williams",
    childId: "1",
    therapistName: "Emma Thompson",
    therapistId: "1",
    therapyType: "Speech",
    status: "scheduled" as const,
    notes: "",
    goals: ["Continue 'r' sound work", "Introduce 'l' sound exercises"],
    achievements: [],
    nextSteps: ""
  }
];

const SupervisorSessions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTherapist, setSelectedTherapist] = useState<string>('all');
  const [selectedTherapyType, setSelectedTherapyType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const { toast } = useToast();

  // Filter sessions based on criteria
  const filteredSessions = sessionsData.filter(session => {
    const matchesSearch = session.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.therapistName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = !selectedDate || session.date === format(selectedDate, 'yyyy-MM-dd');
    
    const matchesTherapist = selectedTherapist === 'all' || 
      session.therapistId === selectedTherapist;
    
    const matchesTherapyType = selectedTherapyType === 'all' || 
      session.therapyType.toLowerCase() === selectedTherapyType.toLowerCase();
    
    const matchesStatus = selectedStatus === 'all' || 
      session.status === selectedStatus;
    
    return matchesSearch && matchesDate && matchesTherapist && matchesTherapyType && matchesStatus;
  });

  const handleViewSession = (id: string) => {
    setSelectedSession(id);
  };

  const handleExportSession = (id: string) => {
    toast({
      title: "Export Started",
      description: "Session details are being exported to PDF.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'scheduled': return 'bg-blue-100 text-blue-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
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

  const selectedSessionData = sessionsData.find(session => session.id === selectedSession);

  return (
    <PageLayout title="Sessions">
      <p className="text-muted-foreground mb-6">
        This page will display all therapy sessions conducted by therapists under this supervisor.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search sessions by child or therapist name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
          <Button 
            variant={viewMode === 'calendar' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select
          value={selectedTherapist}
          onValueChange={setSelectedTherapist}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Therapists" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Therapists</SelectItem>
            <SelectItem value="1">Emma Thompson</SelectItem>
            <SelectItem value="2">Michael Chen</SelectItem>
            <SelectItem value="3">Sarah Williams</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedTherapyType}
          onValueChange={setSelectedTherapyType}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Therapy Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Therapy Types</SelectItem>
            <SelectItem value="speech">Speech</SelectItem>
            <SelectItem value="behavior">Behavior</SelectItem>
            <SelectItem value="sensory">Sensory</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedStatus}
          onValueChange={setSelectedStatus}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {selectedDate && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedDate(undefined)}
            className="w-full md:w-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {viewMode === 'list' ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Child</TableHead>
                <TableHead>Therapist</TableHead>
                <TableHead>Therapy Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.length > 0 ? (
                filteredSessions.map(session => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="font-medium">{format(new Date(session.date), 'MMM d, yyyy')}</div>
                      <div className="text-xs text-muted-foreground">{session.time}</div>
                    </TableCell>
                    <TableCell>{session.childName}</TableCell>
                    <TableCell>{session.therapistName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTherapyTypeColor(session.therapyType)}>
                        {session.therapyType}
                      </Badge>
                    </TableCell>
                    <TableCell>{session.duration} min</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog open={selectedSession === session.id} onOpenChange={(open) => {
                        if (open) handleViewSession(session.id);
                        else setSelectedSession(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Session Details</DialogTitle>
                          </DialogHeader>
                          
                          {selectedSessionData && (
                            <div className="space-y-6">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-3">
                                    <h3 className="font-medium text-lg">{selectedSessionData.childName}</h3>
                                    <Badge className={getTherapyTypeColor(selectedSessionData.therapyType)}>
                                      {selectedSessionData.therapyType}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    with {selectedSessionData.therapistName}
                                  </p>
                                </div>
                                
                                <div className="flex flex-col items-start md:items-end">
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                      {format(new Date(selectedSessionData.date), 'MMMM d, yyyy')}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-muted-foreground">
                                      {selectedSessionData.time} · {selectedSessionData.duration} minutes
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <Tabs defaultValue="details">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="details">Session Details</TabsTrigger>
                                  <TabsTrigger value="goals">Goals & Achievements</TabsTrigger>
                                  <TabsTrigger value="notes">Notes & Next Steps</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="details" className="space-y-4 pt-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Session Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Date & Time</h4>
                                          <p>{format(new Date(selectedSessionData.date), 'MMMM d, yyyy')} at {selectedSessionData.time}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                                          <p>{selectedSessionData.duration} minutes</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Child</h4>
                                          <p>{selectedSessionData.childName}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Therapist</h4>
                                          <p>{selectedSessionData.therapistName}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Therapy Type</h4>
                                          <Badge className={getTherapyTypeColor(selectedSessionData.therapyType)}>
                                            {selectedSessionData.therapyType}
                                          </Badge>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                                          <Badge className={getStatusColor(selectedSessionData.status)}>
                                            {selectedSessionData.status.charAt(0).toUpperCase() + selectedSessionData.status.slice(1)}
                                          </Badge>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                                
                                <TabsContent value="goals" className="space-y-4 pt-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle>Session Goals</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <ul className="space-y-2">
                                        {selectedSessionData.goals.map((goal, index) => (
                                          <li key={index} className="flex items-start gap-2">
                                            <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{index + 1}</span>
                                            <span>{goal}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </CardContent>
                                  </Card>
                                  
                                  {selectedSessionData.status === 'completed' && (
                                    <Card>
                                      <CardHeader>
                                        <CardTitle>Achievements</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <ul className="space-y-2">
                                          {selectedSessionData.achievements.map((achievement, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                              <span className="text-green-600">✓</span>
                                              <span>{achievement}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </CardContent>
                                    </Card>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="notes" className="space-y-4 pt-4">
                                  {selectedSessionData.status === 'completed' ? (
                                    <>
                                      <Card>
                                        <CardHeader>
                                          <CardTitle>Session Notes</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <p>{selectedSessionData.notes}</p>
                                        </CardContent>
                                      </Card>
                                      
                                      <Card>
                                        <CardHeader>
                                          <CardTitle>Next Steps</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <p>{selectedSessionData.nextSteps}</p>
                                        </CardContent>
                                      </Card>
                                    </>
                                  ) : (
                                    <Card>
                                      <CardContent className="pt-6">
                                        <div className="text-center py-4">
                                          <p className="text-muted-foreground">
                                            Notes will be available after the session is completed.
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                </TabsContent>
                              </Tabs>
                              
                              {selectedSessionData.status === 'completed' && (
                                <div className="flex justify-end">
                                  <Button 
                                    onClick={() => handleExportSession(selectedSessionData.id)}
                                    className="gap-2"
                                  >
                                    <FileDown className="h-4 w-4" />
                                    Export Session Report
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <h3 className="text-lg font-medium">No sessions found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="text-center py-12">
            <CalendarFull className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-medium mt-4">Calendar View</h3>
            <p className="text-muted-foreground">
              Calendar view would display sessions in a monthly/weekly format.
            </p>
          </div>
        </Card>
      )}
    </PageLayout>
  );
};

export default SupervisorSessions;
