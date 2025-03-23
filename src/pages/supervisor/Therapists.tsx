
import React, { useState } from 'react';
import { SearchIcon, Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import TherapistCard from '@/components/cards/TherapistCard';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

// Sample therapist data
const therapistsData = [
  {
    id: "1",
    name: "Emma Thompson",
    specialty: "Speech Therapy",
    rating: 4.8,
    children: 8,
    sessions: 120,
    specialties: ["Speech", "Language", "Communication"]
  },
  {
    id: "2",
    name: "Michael Chen",
    specialty: "Behavior Therapy",
    rating: 4.5,
    children: 6,
    sessions: 95,
    specialties: ["Behavior", "ABA", "Special Education"]
  },
  {
    id: "3",
    name: "Sarah Williams",
    specialty: "Occupational Therapy",
    rating: 4.7,
    children: 5,
    sessions: 85,
    specialties: ["Sensory", "Motor Skills", "ADL"]
  }
];

const SupervisorTherapists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter therapists based on search query
  const filteredTherapists = therapistsData.filter(therapist => 
    therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    therapist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTherapistSelect = (id: string) => {
    setSelectedTherapist(id);
    toast({
      title: "Therapist Selected",
      description: `Viewing details for ${therapistsData.find(t => t.id === id)?.name}`,
    });
  };

  return (
    <PageLayout title="Therapists">
      <p className="text-muted-foreground mb-6">
        This page will display all therapists managed by this supervisor.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search therapists by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map(therapist => (
            <TherapistCard
              key={therapist.id}
              therapist={therapist}
              onSelect={handleTherapistSelect}
              selected={selectedTherapist === therapist.id}
            />
          ))
        ) : (
          <div className="col-span-full p-8 text-center">
            <h3 className="text-lg font-medium">No therapists found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default SupervisorTherapists;
