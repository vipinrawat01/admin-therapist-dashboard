
import { useState } from 'react';
import { UserPlus, ShieldAlert, ShieldCheck, Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import UserCard from '@/components/cards/UserCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Sample user data for the role creation examples
const users = [
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
    id: '10', 
    name: 'James Lee', 
    email: 'james.lee@therapyai.com',
    role: 'therapist' as const,
    status: 'pending' as const,
    lastActive: 'Never'
  }
];

const RoleManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('new-role');
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    toast({
      title: "Role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleRemoveUser = (userId: string) => {
    toast({
      title: "User removed",
      description: "The user has been successfully removed from the system.",
    });
  };

  const handleCreateRole = (type: string) => {
    toast({
      title: `New ${type} created`,
      description: "An invitation has been sent to the provided email address.",
    });
  };

  return (
    <PageLayout title="Role Management">
      <div className="mb-8 animate-fade-in">
        <Tabs defaultValue="new-role" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="new-role">Create New Role</TabsTrigger>
            <TabsTrigger value="all-users">View All Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-role" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-hover-effect">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-therapy-red" />
                    Create Admin
                  </CardTitle>
                  <CardDescription>
                    Admins have full access to all system features and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-name">Full Name</Label>
                      <Input id="admin-name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input id="admin-email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <Button 
                      className="w-full gap-2" 
                      onClick={() => handleCreateRole('admin')}
                    >
                      <UserPlus className="h-4 w-4" />
                      Create Admin
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="card-hover-effect">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-therapy-blue" />
                    Create Supervisor
                  </CardTitle>
                  <CardDescription>
                    Supervisors can manage therapists and review treatment plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="supervisor-name">Full Name</Label>
                      <Input id="supervisor-name" placeholder="Jane Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supervisor-email">Email</Label>
                      <Input id="supervisor-email" type="email" placeholder="jane.smith@example.com" />
                    </div>
                    <Button 
                      className="w-full gap-2" 
                      onClick={() => handleCreateRole('supervisor')}
                    >
                      <UserPlus className="h-4 w-4" />
                      Create Supervisor
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="all-users" className="space-y-6 mt-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onRoleChange={handleRoleChange} 
                  onRemove={handleRemoveUser}
                  isCurrentUser={user.id === '1'} // Assuming the first user is the current admin
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default RoleManagement;
