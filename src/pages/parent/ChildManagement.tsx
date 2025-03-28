
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AddChildForm from '@/components/forms/AddChildForm';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ChildData {
  id: string;
  name: string;
  age: number;
  needsType: string;
  supervisor: string | null;
  therapist: string | null;
  sessionsLeft: number;
}

const mockChildren: ChildData[] = [
  {
    id: '101',
    name: 'Emma Thompson',
    age: 6,
    needsType: 'Speech Therapy',
    supervisor: 'Dr. Sarah Johnson',
    therapist: 'Dr. Michael Chen',
    sessionsLeft: 8,
  },
  {
    id: '102',
    name: 'Liam Wilson',
    age: 4,
    needsType: 'Behavioral Therapy',
    supervisor: 'Dr. Robert Williams',
    therapist: 'Dr. Lisa Anderson',
    sessionsLeft: 5,
  }
];

const ChildManagement = () => {
  const [children, setChildren] = useState<ChildData[]>(mockChildren);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddChild = (childData: ChildData) => {
    setChildren(prev => [...prev, childData]);
    setDialogOpen(false);
  };

  return (
    <PageLayout title="Child Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">My Children</h1>
            <p className="text-muted-foreground">Manage your children's therapy sessions</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Child
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add a Child</DialogTitle>
              </DialogHeader>
              <AddChildForm onSuccess={handleAddChild} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child) => (
            <div key={child.id} className="border rounded-lg bg-white overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h2 className="text-lg font-medium">{child.name}</h2>
                <p className="text-muted-foreground">Age: {child.age} • {child.needsType}</p>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Sessions Left</h3>
                      <p className={`text-lg font-semibold ${child.sessionsLeft <= 3 ? 'text-red-500' : 'text-green-600'}`}>
                        {child.sessionsLeft}
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Buy More
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">Therapy Assignment</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Supervisor:</span>
                      <span>{child.supervisor || 'Not assigned yet'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Therapist:</span>
                      <span>{child.therapist || 'Not assigned yet'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Next Session</h3>
                    <Button variant="link" size="sm" className="p-0 h-auto">View All</Button>
                  </div>
                  
                  {child.therapist ? (
                    <div className="mt-2 bg-blue-50 border border-blue-100 rounded-md p-3 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Wednesday, May 15</p>
                        <p className="text-sm text-muted-foreground">3:30 PM - 4:30 PM with {child.therapist}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">No upcoming sessions</p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 border-t flex justify-end">
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChildManagement;
