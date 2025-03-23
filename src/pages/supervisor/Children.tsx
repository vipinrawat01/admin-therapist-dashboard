
import React, { useState } from 'react';
import { SearchIcon, Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
    progress: 75
  },
  {
    id: "2",
    name: "Mia Rodriguez",
    age: 6,
    therapist: "Michael Chen",
    therapyType: "Behavior",
    sessionCount: 18,
    nextSession: "Today, 2:30 PM",
    progress: 65
  },
  {
    id: "3",
    name: "Alex Johnson",
    age: 4,
    therapist: "Sarah Williams",
    therapyType: "Sensory",
    sessionCount: 32,
    nextSession: "Wednesday, 11:15 AM",
    progress: 80
  },
  {
    id: "4",
    name: "Lily Carter",
    age: 7,
    therapist: "Emma Thompson",
    therapyType: "Speech",
    sessionCount: 16,
    nextSession: "Friday, 3:00 PM",
    progress: 60
  },
  {
    id: "5",
    name: "Ethan Patel",
    age: 8,
    therapist: "Michael Chen",
    therapyType: "Behavior",
    sessionCount: 28,
    nextSession: "Thursday, 1:45 PM",
    progress: 85
  }
];

const SupervisorChildren = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const { toast } = useToast();

  // Filter children based on search query
  const filteredChildren = childrenData.filter(child => 
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.therapist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.therapyType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChildSelect = (id: string) => {
    toast({
      title: "Child Selected",
      description: `Viewing details for ${childrenData.find(c => c.id === id)?.name}`,
    });
  };

  // Function to get therapy type badge color
  const getTherapyTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'speech': return 'bg-blue-100 text-blue-600';
      case 'behavior': return 'bg-purple-100 text-purple-600';
      case 'sensory': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Function to get progress color
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <PageLayout title="Children">
      <p className="text-muted-foreground mb-6">
        This page will display all children being treated by therapists under this supervisor.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search children by name, therapist, or therapy type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'card' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('card')}
          >
            Card View
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
        </div>
      </div>

      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChildren.length > 0 ? (
            filteredChildren.map(child => (
              <Card 
                key={child.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleChildSelect(child.id)}
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">{child.age} years old</p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getTherapyTypeColor(child.therapyType)}`}>
                      {child.therapyType}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Therapist:</span>
                      <span>{child.therapist}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sessions:</span>
                      <span>{child.sessionCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Session:</span>
                      <span>{child.nextSession}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{child.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(child.progress)}`}
                          style={{ width: `${child.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full p-8 text-center">
              <h3 className="text-lg font-medium">No children found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Therapist</TableHead>
                <TableHead>Therapy Type</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Next Session</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChildren.length > 0 ? (
                filteredChildren.map(child => (
                  <TableRow 
                    key={child.id}
                    className="cursor-pointer"
                    onClick={() => handleChildSelect(child.id)}
                  >
                    <TableCell className="font-medium">{child.name}</TableCell>
                    <TableCell>{child.age}</TableCell>
                    <TableCell>{child.therapist}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTherapyTypeColor(child.therapyType)}>
                        {child.therapyType}
                      </Badge>
                    </TableCell>
                    <TableCell>{child.sessionCount}</TableCell>
                    <TableCell>{child.nextSession}</TableCell>
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
      )}
    </PageLayout>
  );
};

export default SupervisorChildren;
