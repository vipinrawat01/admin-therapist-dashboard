import { useState } from 'react';
import { Search, Filter, Plus, Users, ChevronDown, Star, User } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import TherapistCard from '@/components/cards/TherapistCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const therapists = [
  {
    id: '1',
    name: 'Dr. Emma Thompson',
    specialty: 'Speech & OT Therapist',
    rating: 4.8,
    children: 8,
    sessions: 24,
    specialties: ['speech', 'occupational', 'ADL'],
    supervisor: {
      id: '1',
      name: 'Dr. Sarah Johnson'
    },
    childrenData: [
      { name: 'Emma Brown', age: 6, diagnosis: 'Autism Spectrum Disorder', progress: [60, 40] },
      { name: 'Liam Brown', age: 5, diagnosis: 'Speech Delay', progress: [75, 50] },
      { name: 'Noah Williams', age: 7, diagnosis: 'ADHD', progress: [55, 30] },
      { name: 'Olivia Martinez', age: 4, diagnosis: 'Developmental Delay', progress: [40, 20] },
      { name: 'Ethan Johnson', age: 8, diagnosis: 'Sensory Processing Disorder', progress: [65, 45] }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Behavior Therapist',
    rating: 4.9,
    children: 6,
    sessions: 18,
    specialties: ['behavior', 'special'],
    supervisor: {
      id: '1',
      name: 'Dr. Sarah Johnson'
    },
    childrenData: [
      { name: 'Ava Wilson', age: 5, diagnosis: 'Autism Spectrum Disorder', progress: [55, 35] },
      { name: 'Benjamin Lee', age: 7, diagnosis: 'ADHD', progress: [65, 50] },
      { name: 'Charlotte Davis', age: 4, diagnosis: 'Behavioral Issues', progress: [45, 30] },
      { name: 'Daniel Smith', age: 6, diagnosis: 'Developmental Delay', progress: [35, 25] },
      { name: 'Ella Thomas', age: 8, diagnosis: 'Anxiety', progress: [70, 60] },
      { name: 'Finn Rodriguez', age: 5, diagnosis: 'Oppositional Defiant Disorder', progress: [40, 20] }
    ]
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    specialty: 'Sensory Therapist',
    rating: 4.7,
    children: 5,
    sessions: 15,
    specialties: ['sensory', 'occupational'],
    supervisor: {
      id: '2',
      name: 'Dr. Robert Williams'
    },
    childrenData: [
      { name: 'Grace White', age: 4, diagnosis: 'Sensory Processing Disorder', progress: [50, 40] },
      { name: 'Henry Garcia', age: 6, diagnosis: 'Autism Spectrum Disorder', progress: [60, 45] },
      { name: 'Isabella Martin', age: 5, diagnosis: 'Developmental Coordination Disorder', progress: [55, 35] },
      { name: 'Jack Anderson', age: 7, diagnosis: 'ADHD', progress: [65, 50] },
      { name: 'Kate Thompson', age: 4, diagnosis: 'Sensory Integration Dysfunction', progress: [45, 30] }
    ]
  },
  {
    id: '4',
    name: 'Dr. James Miller',
    specialty: 'ADL Specialist',
    rating: 4.6,
    children: 7,
    sessions: 21,
    specialties: ['ADL', 'behavior'],
    supervisor: {
      id: '3',
      name: 'Dr. Jennifer Davis'
    },
    childrenData: [
      { name: 'Logan Clark', age: 6, diagnosis: 'Autism Spectrum Disorder', progress: [55, 40] },
      { name: 'Mia Rodriguez', age: 5, diagnosis: 'Autism Spectrum Disorder', progress: [50, 35] },
      { name: 'Nathan Lewis', age: 7, diagnosis: 'Asperger Syndrome', progress: [65, 50] },
      { name: 'Olivia Walker', age: 8, diagnosis: 'PDD-NOS', progress: [70, 55] },
      { name: 'Parker Hall', age: 4, diagnosis: 'Autism Spectrum Disorder', progress: [45, 30] },
      { name: 'Quinn Young', age: 6, diagnosis: 'Autism with ADHD', progress: [50, 40] },
      { name: 'Ryan Evans', age: 5, diagnosis: 'High-Functioning Autism', progress: [60, 45] }
    ]
  }
];

interface ChildCardProps {
  child: {
    name: string;
    age: number;
    diagnosis: string;
    progress: number[];
  };
}

const ChildCard = ({ child }: ChildCardProps) => {
  return (
    <div className="therapy-card card-hover-effect">
      <div className="flex items-start gap-3">
        <div className="avatar-initial w-9 h-9 text-sm">
          {child.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div>
              <h3 className="font-medium">{child.name}</h3>
              <p className="text-sm text-muted-foreground">{child.age} years old</p>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Diagnosis</p>
            <p className="text-sm">{child.diagnosis}</p>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Current Goals</p>
            
            <div className="mt-2 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Improve verbal communication skills</span>
                  <span className="text-muted-foreground">{child.progress[0]}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-value bg-therapy-blue"
                    style={{ width: `${child.progress[0]}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Develop social interaction skills</span>
                  <span className="text-muted-foreground">{child.progress[1]}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-value bg-therapy-purple"
                    style={{ width: `${child.progress[1]}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm">NEW SESSION</Button>
            <Button variant="secondary" size="sm">VIEW DETAILS</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Therapists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilters, setSpecialtyFilters] = useState<string[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);

  const therapistDetails = selectedTherapist 
    ? therapists.find(t => t.id === selectedTherapist) 
    : null;

  const filteredTherapists = therapists.filter(therapist => {
    if (searchQuery && !therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !therapist.specialty.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (specialtyFilters.length > 0) {
      const hasMatchingSpecialty = therapist.specialties.some(specialty => 
        specialtyFilters.includes(specialty.toLowerCase())
      );
      if (!hasMatchingSpecialty) return false;
    }
    
    return true;
  });

  const toggleSpecialtyFilter = (specialty: string) => {
    setSpecialtyFilters(current => 
      current.includes(specialty) 
        ? current.filter(s => s !== specialty) 
        : [...current, specialty]
    );
  };

  return (
    <PageLayout title="Therapists" containerClassName="max-w-7xl mx-auto">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold">Therapists</h1>
        <p className="text-muted-foreground">Manage and monitor all therapists in the system</p>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className={cn(
          "lg:w-1/2 transition-all duration-300", 
          selectedTherapist ? "lg:pr-6" : "w-full"
        )}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search therapists..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="px-3">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Specialty</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={specialtyFilters.includes('speech')}
                    onCheckedChange={() => toggleSpecialtyFilter('speech')}
                  >
                    Speech Therapy
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={specialtyFilters.includes('behavior')}
                    onCheckedChange={() => toggleSpecialtyFilter('behavior')}
                  >
                    Behavior Therapy
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={specialtyFilters.includes('occupational')}
                    onCheckedChange={() => toggleSpecialtyFilter('occupational')}
                  >
                    Occupational Therapy
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={specialtyFilters.includes('sensory')}
                    onCheckedChange={() => toggleSpecialtyFilter('sensory')}
                  >
                    Sensory Therapy
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={specialtyFilters.includes('adl')}
                    onCheckedChange={() => toggleSpecialtyFilter('adl')}
                  >
                    ADL Specialist
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button className="gap-1" size="sm">
                <Plus className="h-4 w-4" />
                <span>Add Therapist</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredTherapists.length > 0 ? (
              filteredTherapists.map(therapist => (
                <TherapistCard 
                  key={therapist.id} 
                  therapist={therapist} 
                  onSelect={setSelectedTherapist} 
                  selected={selectedTherapist === therapist.id}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg border p-8 flex flex-col items-center">
                <div className="bg-secondary rounded-full p-3 mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No therapists found</h3>
                <p className="text-muted-foreground text-center mt-1">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {selectedTherapist ? (
          <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-6 lg:border-l animate-fade-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">{therapistDetails?.name}</h2>
                <p className="text-muted-foreground">Children under this therapist</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 lg:hidden"
                onClick={() => setSelectedTherapist(null)}
              >
                <ChevronDown className="h-4 w-4" />
                <span>Back to List</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {therapistDetails?.childrenData.map((child, index) => (
                <ChildCard key={index} child={child} />
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:w-1/2 lg:pl-6 lg:border-l items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center">
                <Users size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium">Select a Therapist</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Click on a therapist from the list to view their detailed profile and children assignments
              </p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Therapists;
