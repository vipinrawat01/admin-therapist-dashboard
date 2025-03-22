
import { useState } from 'react';
import { Search, Filter, Plus, UserPlus, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import UserCard from '@/components/cards/UserCard';
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
import { useToast } from '@/components/ui/use-toast';

// Sample user data
const initialUsers = [
  { 
    id: '1', 
    name: 'John Davidson', 
    email: 'john.davidson@therapyai.com',
    role: 'admin' as const,
    status: 'active' as const,
    lastActive: 'Today at 10:30 AM'
  },
  { 
    id: '2', 
    name: 'Sarah Williams', 
    email: 'sarah.williams@therapyai.com',
    role: 'admin' as const,
    status: 'active' as const,
    lastActive: 'Today at 9:15 AM'
  },
  { 
    id: '3', 
    name: 'Janet Miller', 
    email: 'janet.miller@therapyai.com',
    role: 'supervisor' as const,
    status: 'active' as const,
    lastActive: 'Yesterday at 4:20 PM'
  },
  { 
    id: '4', 
    name: 'Robert Wilson', 
    email: 'robert.wilson@therapyai.com',
    role: 'supervisor' as const,
    status: 'active' as const,
    lastActive: '2 days ago'
  },
  { 
    id: '5', 
    name: 'Emma Thompson', 
    email: 'emma.thompson@therapyai.com',
    role: 'therapist' as const,
    status: 'active' as const,
    lastActive: 'Today at 11:45 AM'
  },
  { 
    id: '6', 
    name: 'Michael Chen', 
    email: 'michael.chen@therapyai.com',
    role: 'therapist' as const,
    status: 'active' as const,
    lastActive: 'Today at 8:30 AM'
  },
  { 
    id: '7', 
    name: 'Sarah Chen', 
    email: 'sarah.chen@gmail.com',
    role: 'parent' as const,
    status: 'active' as const,
    lastActive: 'Yesterday at 7:15 PM'
  },
  { 
    id: '8', 
    name: 'David Rodriguez', 
    email: 'david.rodriguez@gmail.com',
    role: 'parent' as const,
    status: 'active' as const,
    lastActive: '3 days ago'
  },
  { 
    id: '9', 
    name: 'Lisa Brown', 
    email: 'lisa.brown@gmail.com',
    role: 'parent' as const,
    status: 'inactive' as const,
    lastActive: '2 weeks ago'
  },
  { 
    id: '10', 
    name: 'James Lee', 
    email: 'james.lee@therapyai.com',
    role: 'therapist' as const,
    status: 'pending' as const,
    lastActive: 'Never'
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilters, setRoleFilters] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    // Apply search filter
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply role filters
    if (roleFilters.length > 0 && !roleFilters.includes(user.role)) {
      return false;
    }
    
    // Apply status filters
    if (statusFilters.length > 0 && !statusFilters.includes(user.status)) {
      return false;
    }
    
    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilters([]);
    setStatusFilters([]);
  };

  const toggleRoleFilter = (role: string) => {
    setRoleFilters(current => 
      current.includes(role) 
        ? current.filter(r => r !== role) 
        : [...current, role]
    );
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilters(current => 
      current.includes(status) 
        ? current.filter(s => s !== status) 
        : [...current, status]
    );
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole as any } 
        : user
    ));

    toast({
      title: "Role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User removed",
      description: "The user has been successfully removed from the system.",
    });
  };

  return (
    <PageLayout title="User Management">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users by name or email..."
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
                {(roleFilters.length > 0 || statusFilters.length > 0) && (
                  <span className="ml-1 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {roleFilters.length + statusFilters.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={roleFilters.includes('admin')}
                onCheckedChange={() => toggleRoleFilter('admin')}
              >
                Admins
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={roleFilters.includes('supervisor')}
                onCheckedChange={() => toggleRoleFilter('supervisor')}
              >
                Supervisors
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={roleFilters.includes('therapist')}
                onCheckedChange={() => toggleRoleFilter('therapist')}
              >
                Therapists
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={roleFilters.includes('parent')}
                onCheckedChange={() => toggleRoleFilter('parent')}
              >
                Parents
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuLabel className="mt-4">Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes('active')}
                onCheckedChange={() => toggleStatusFilter('active')}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes('inactive')}
                onCheckedChange={() => toggleStatusFilter('inactive')}
              >
                Inactive
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes('pending')}
                onCheckedChange={() => toggleStatusFilter('pending')}
              >
                Pending
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
          
          <Button size="sm" className="gap-1">
            <UserPlus className="h-4 w-4" />
            <span className="hidden md:inline">Add User</span>
          </Button>
        </div>
      </div>
      
      {(roleFilters.length > 0 || statusFilters.length > 0) && (
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm text-muted-foreground">Filters:</p>
          <div className="flex flex-wrap gap-2">
            {roleFilters.map(filter => (
              <Button 
                key={filter} 
                variant="secondary" 
                size="sm" 
                className="h-7 text-xs gap-1"
                onClick={() => toggleRoleFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                <X className="h-3 w-3" />
              </Button>
            ))}
            {statusFilters.map(filter => (
              <Button 
                key={filter} 
                variant="secondary" 
                size="sm" 
                className="h-7 text-xs gap-1"
                onClick={() => toggleStatusFilter(filter)}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onRoleChange={handleRoleChange} 
              onRemove={handleRemoveUser}
              isCurrentUser={user.id === '1'} // Assuming the first user is the current admin
            />
          ))
        ) : (
          <div className="therapy-card col-span-full flex flex-col items-center py-8">
            <div className="bg-secondary rounded-full p-3 mb-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No users found</h3>
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
    </PageLayout>
  );
};

export default UserManagement;
