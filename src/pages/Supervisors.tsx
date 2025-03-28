
import { useState } from 'react';
import { Search, Filter, Plus, Users, ChevronDown, User, Star } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SupervisorCard from '@/components/cards/SupervisorCard';
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

// Mock data for supervisors
const supervisors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Lead Supervisor',
    rating: 4.9,
    therapists: 4,
    children: 18,
    experience: '8+ years',
    specialties: ['behavior', 'speech', 'occupational'],
    therapistsData: [
      { 
        id: '1', 
        name: 'Dr. Emma Thompson', 
        specialty: 'Speech & OT Therapist', 
        children: 6,
        rating: 4.8
      },
      { 
        id: '2', 
        name: 'Dr. Michael Chen', 
        specialty: 'Behavior Therapist', 
        children: 5,
        rating: 4.9
      },
      { 
        id: '3', 
        name: 'Dr. James Miller', 
        specialty: 'ADL Specialist', 
        children: 7,
        rating: 4.6
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Robert Williams',
    specialty: 'Senior Supervisor',
    rating: 4.7,
    therapists: 3,
    children: 14,
    experience: '6+ years',
    specialties: ['sensory', 'ADL', 'special'],
    therapistsData: [
      { 
        id: '3', 
        name: 'Dr. Sarah Williams', 
        specialty: 'Sensory Therapist', 
        children: 5,
        rating: 4.7
      },
      { 
        id: '4', 
        name: 'Dr. Lisa Anderson', 
        specialty: 'Speech Therapist', 
        children: 4,
        rating: 4.5
      },
      { 
        id: '5', 
        name: 'Dr. Peter Roberts', 
        specialty: 'Special Needs Therapist', 
        children: 5,
        rating: 4.8
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Jennifer Davis',
    specialty: 'Clinical Supervisor',
    rating: 4.8,
    therapists: 3,
    children: 12,
    experience: '7+ years',
    specialties: ['speech', 'behavior', 'developmental'],
    therapistsData: [
      { 
        id: '6', 
        name: 'Dr. Thomas Wilson', 
        specialty: 'Speech Therapist', 
        children: 4,
        rating: 4.6
      },
      { 
        id: '7', 
        name: 'Dr. Emily Garcia', 
        specialty: 'Developmental Therapist', 
        children: 5,
        rating: 4.9
      },
      { 
        id: '8', 
        name: 'Dr. David Taylor', 
        specialty: 'Behavior Specialist', 
        children: 3,
        rating: 4.7
      }
    ]
  }
];

const Supervisors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilters, setSpecialtyFilters] = useState<string[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<string | null>(null);

  const supervisorDetails = selectedSupervisor 
    ? supervisors.find(s => s.id === selectedSupervisor) 
    : null;

  const filteredSupervisors = supervisors.filter(supervisor => {
    if (searchQuery && !supervisor.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !supervisor.specialty.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (specialtyFilters.length > 0) {
      const hasMatchingSpecialty = supervisor.specialties.some(specialty => 
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
    <PageLayout title="Supervisors" containerClassName="max-w-7xl mx-auto">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold">Supervisors</h1>
        <p className="text-muted-foreground">Manage and monitor all supervisors in the system</p>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className={cn(
          "lg:w-1/2 transition-all duration-300", 
          selectedSupervisor ? "lg:pr-6" : "w-full"
        )}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search supervisors..."
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
                <span>Add Supervisor</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredSupervisors.length > 0 ? (
              filteredSupervisors.map(supervisor => (
                <SupervisorCard 
                  key={supervisor.id} 
                  supervisor={supervisor} 
                  onSelect={setSelectedSupervisor} 
                  selected={selectedSupervisor === supervisor.id}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg border p-8 flex flex-col items-center">
                <div className="bg-secondary rounded-full p-3 mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No supervisors found</h3>
                <p className="text-muted-foreground text-center mt-1">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {selectedSupervisor ? (
          <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-6 lg:border-l animate-fade-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">{supervisorDetails?.name}</h2>
                <p className="text-muted-foreground">Therapists under this supervisor</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 lg:hidden"
                onClick={() => setSelectedSupervisor(null)}
              >
                <ChevronDown className="h-4 w-4" />
                <span>Back to List</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              {supervisorDetails?.therapistsData.map((therapist, index) => (
                <div key={index} className="bg-white border rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xl">
                      {therapist.name.split(' ')[0][0]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{therapist.name}</h3>
                          <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">{therapist.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{therapist.children} children</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:w-1/2 lg:pl-6 lg:border-l items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center">
                <Users size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium">Select a Supervisor</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Click on a supervisor from the list to view their detailed profile and therapist assignments
              </p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Supervisors;
