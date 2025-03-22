
import { useState } from 'react';
import { Search, Filter, Plus, X, ChevronDown, ArrowUpDown } from 'lucide-react';
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
    children: 5,
    sessions: 24,
    specialties: ['speech', 'occupational'],
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
    specialty: 'ASD Specialist',
    rating: 4.6,
    children: 7,
    sessions: 21,
    specialties: ['ASD', 'behavior'],
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
  const [sortOption, setSortOption] = useState<'rating' | 'children' | 'sessions'>('rating');
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);

  const therapistDetails = selectedTherapist 
    ? therapists.find(t => t.id === selectedTherapist) 
    : null;

  const filteredTherapists = therapists.filter(therapist => {
    // Apply search filter
    if (searchQuery && !therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !therapist.specialty.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply specialty filters
    if (specialtyFilters.length > 0) {
      const hasMatchingSpecialty = therapist.specialties.some(specialty => 
        specialtyFilters.includes(specialty.toLowerCase())
      );
      if (!hasMatchingSpecialty) return false;
    }
    
    return true;
  });

  // Sort therapists
  const sortedTherapists = [...filteredTherapists].sort((a, b) => {
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'children') return b.children - a.children;
    return b.sessions - a.sessions;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSpecialtyFilters([]);
  };

  const toggleSpecialtyFilter = (specialty: string) => {
    setSpecialtyFilters(current => 
      current.includes(specialty) 
        ? current.filter(s => s !== specialty) 
        : [...current, specialty]
    );
  };

  return (
    <PageLayout title="Therapists" containerClassName="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        <div className={cn(
          "lg:w-1/3 transition-all duration-300 animate-fade-in", 
          selectedTherapist ? "lg:pr-6" : "w-full"
        )}>
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
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
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    {specialtyFilters.length > 0 && (
                      <span className="ml-1 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                        {specialtyFilters.length}
                      </span>
                    )}
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
                    checked={specialtyFilters.includes('asd')}
                    onCheckedChange={() => toggleSpecialtyFilter('asd')}
                  >
                    ASD Specialist
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-xs text-muted-foreground"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={sortOption === 'rating'}
                    onCheckedChange={() => setSortOption('rating')}
                  >
                    By Rating
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortOption === 'children'}
                    onCheckedChange={() => setSortOption('children')}
                  >
                    By Number of Children
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortOption === 'sessions'}
                    onCheckedChange={() => setSortOption('sessions')}
                  >
                    By Session Count
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                <span className="hidden md:inline">Add Therapist</span>
              </Button>
            </div>
          </div>
          
          {specialtyFilters.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <p className="text-sm text-muted-foreground">Filters:</p>
              <div className="flex flex-wrap gap-2">
                {specialtyFilters.map(filter => (
                  <Button 
                    key={filter} 
                    variant="secondary" 
                    size="sm" 
                    className="h-7 text-xs gap-1"
                    onClick={() => toggleSpecialtyFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    <X className="h-3 w-3" />
                  </Button>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs px-2"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {sortedTherapists.length > 0 ? (
              sortedTherapists.map(therapist => (
                <TherapistCard 
                  key={therapist.id} 
                  therapist={therapist} 
                  onSelect={setSelectedTherapist} 
                  selected={selectedTherapist === therapist.id}
                />
              ))
            ) : (
              <div className="therapy-card flex flex-col items-center py-8">
                <div className="bg-secondary rounded-full p-3 mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No therapists found</h3>
                <p className="text-muted-foreground text-center mt-1">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {selectedTherapist && (
          <div className="lg:w-2/3 mt-6 lg:mt-0 lg:pl-6 lg:border-l animate-fade-in">
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
        )}
        
        {!selectedTherapist && (
          <div className="hidden lg:block lg:w-2/3 lg:pl-6 lg:border-l">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-secondary mb-3">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M10 12L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-primary">Select a Therapist</h3>
                <p className="text-muted-foreground mt-1 max-w-sm">
                  Click on a therapist from the list to view their detailed profile and children assignments
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Therapists;
