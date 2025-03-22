
import { useState } from 'react';
import { 
  Users, 
  CalendarDays, 
  BrainCircuit, 
  Gauge, 
  Filter 
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import StatCard from '@/components/cards/StatCard';
import UserDistributionChart from '@/components/charts/UserDistributionChart';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const [userFilter, setUserFilter] = useState<string[]>(['all']);

  const userDistributionData = [
    { name: 'Therapists', value: 42, color: '#3B82F6' },
    { name: 'Supervisors', value: 8, color: '#8B5CF6' },
    { name: 'Parents', value: 74, color: '#22C55E' },
    { name: 'Admins', value: 2, color: '#F97316' },
  ];

  const recentActivities = [
    {
      id: 1,
      user: { name: 'Dr. Emma Thompson', role: 'Therapist' },
      action: 'Added new session log',
      description: 'Speech therapy session for Noah Williams',
      time: '10 minutes ago',
    },
    {
      id: 2,
      user: { name: 'Janet Miller', role: 'Supervisor' },
      action: 'Approved AI recommendation',
      description: 'Updated therapy plan for Mia Rodriguez',
      time: '42 minutes ago',
    },
    {
      id: 3,
      user: { name: 'System', role: 'AI' },
      action: 'Generated new recommendations',
      description: '3 new therapy suggestions for 2 children',
      time: '1 hour ago',
    },
    {
      id: 4,
      user: { name: 'John Davis', role: 'Admin' },
      action: 'Changed user role',
      description: 'Promoted Janet Miller to Supervisor',
      time: '3 hours ago',
    },
    {
      id: 5,
      user: { name: 'Sarah Chen', role: 'Parent' },
      action: 'Submitted feedback',
      description: 'Rated home activities as very helpful',
      time: 'Yesterday',
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'success',
      message: 'Daily backups completed successfully',
      time: '4:00 AM',
    },
    {
      id: 2,
      type: 'warning',
      message: 'High server load detected',
      time: '10:15 AM',
    },
    {
      id: 3,
      type: 'success',
      message: 'AI model training completed',
      time: 'Yesterday',
    },
    {
      id: 4,
      type: 'warning',
      message: 'Multiple failed login attempts',
      time: 'Yesterday',
    },
  ];

  const toggleUserFilter = (value: string) => {
    if (value === 'all') {
      setUserFilter(['all']);
      return;
    }

    setUserFilter(current => {
      // Remove 'all' if it exists
      const withoutAll = current.filter(item => item !== 'all');
      
      // Toggle the selected value
      const newValue = withoutAll.includes(value)
        ? withoutAll.filter(item => item !== value)
        : [...withoutAll, value];
      
      // If empty, reset to 'all'
      return newValue.length === 0 ? ['all'] : newValue;
    });
  };

  return (
    <PageLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-on-scroll">
        <StatCard
          value="124"
          label="Total Users"
          trend={{ value: 12, isPositive: true, label: "this month" }}
          icon={<Users className="h-5 w-5 text-therapy-blue" />}
          color="blue"
        />
        <StatCard
          value="278"
          label="Therapy Sessions"
          trend={{ value: 8, isPositive: true, label: "this month" }}
          icon={<CalendarDays className="h-5 w-5 text-therapy-purple" />}
          color="purple"
        />
        <StatCard
          value="156"
          label="AI Recommendations"
          trend={{ value: 15, isPositive: true, label: "for all children" }}
          icon={<BrainCircuit className="h-5 w-5 text-therapy-green" />}
          color="green"
        />
        <StatCard
          value="99.8%"
          label="System Performance"
          trend={{ value: 0.2, isPositive: true, label: "uptime over 30 days" }}
          icon={<Gauge className="h-5 w-5 text-therapy-orange" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 animate-on-scroll">
          <div className="therapy-card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">User Distribution</h2>
              <p className="text-sm text-muted-foreground">Breakdown of system users by role</p>
            </div>
            
            <UserDistributionChart data={userDistributionData} />
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {userDistributionData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium text-sm">{item.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline" size="sm" className="text-xs">
                Manage Users
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 animate-on-scroll">
          <div className="therapy-card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Latest actions across the platform</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by User Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={userFilter.includes('all')}
                      onCheckedChange={() => toggleUserFilter('all')}
                    >
                      All Users
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={userFilter.includes('therapist')}
                      onCheckedChange={() => toggleUserFilter('therapist')}
                    >
                      Therapists
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={userFilter.includes('supervisor')}
                      onCheckedChange={() => toggleUserFilter('supervisor')}
                    >
                      Supervisors
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={userFilter.includes('parent')}
                      onCheckedChange={() => toggleUserFilter('parent')}
                    >
                      Parents
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={userFilter.includes('admin')}
                      onCheckedChange={() => toggleUserFilter('admin')}
                    >
                      Admins
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={userFilter.includes('ai')}
                      onCheckedChange={() => toggleUserFilter('ai')}
                    >
                      System AI
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {recentActivities.map(activity => (
                <div key={activity.id} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="avatar-initial w-8 h-8 text-xs">
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="therapy-badge bg-gray-100 text-gray-700">
                          {activity.user.role}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-sm mt-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" className="text-xs">
                View All Activity
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 animate-on-scroll">
        <div className="therapy-card">
          <h2 className="text-lg font-semibold mb-4">System Alerts</h2>
          
          <div className="space-y-4">
            {systemAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border flex items-start justify-between ${
                  alert.type === 'success' ? 'bg-green-50 border-green-200' : 
                  alert.type === 'warning' ? 'bg-amber-50 border-amber-200' : 
                  alert.type === 'error' ? 'bg-red-50 border-red-200' : 
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    alert.type === 'success' ? 'bg-green-100 text-therapy-green' : 
                    alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                    alert.type === 'error' ? 'bg-red-100 text-therapy-red' : 
                    'bg-blue-100 text-therapy-blue'
                  }`}>
                    {alert.type === 'success' ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00008 5.33333V8M8.00008 10.6667H8.00675M14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00008 14.6667C4.31828 14.6667 1.33341 11.6819 1.33341 8C1.33341 4.3181 4.31828 1.33333 8.00008 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  
                  <div>
                    <p>{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="text-xs">
                  Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
