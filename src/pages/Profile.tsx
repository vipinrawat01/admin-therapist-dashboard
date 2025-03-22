
import { useState } from 'react';
import { Edit, LockKeyhole, UserCog, Key, Mail, Phone, Calendar, Shield, KeyRound, LogOut } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const [user] = useState({
    name: 'John Davidson',
    email: 'john.davidson@therapyai.com',
    phone: '+1 (555) 123-4567',
    role: 'System Administrator',
    joinDate: 'March 15, 2023',
  });
  
  const [securitySettings] = useState({
    twoFactor: true,
    activeSessions: false,
    passwordManagement: true,
    loginNotifications: true,
  });
  
  const recentActivities = [
    { id: 1, action: 'Updated system settings', time: 'Today at 10:30 AM' },
    { id: 2, action: 'Added new supervisor', time: 'Yesterday at 5:15 PM' },
    { id: 3, action: 'Modified user roles', time: 'May 18, 2023 at 11:25 AM' },
    { id: 4, action: 'Generated system report', time: 'May 15, 2023 at 9:45 AM' },
  ];
  
  const permissions = [
    { id: 1, name: 'User Management', enabled: true },
    { id: 2, name: 'System Configuration', enabled: true },
    { id: 3, name: 'Role Assignment', enabled: true },
    { id: 4, name: 'Data Management', enabled: true },
    { id: 5, name: 'Reports Access', enabled: true },
    { id: 6, name: 'Audit Logs', enabled: true },
  ];
  
  const { toast } = useToast();
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing functionality would open here.",
    });
  };
  
  const handleManageSecurity = (setting: string) => {
    toast({
      title: `Manage ${setting}`,
      description: `${setting} management interface would open here.`,
    });
  };
  
  const handleSignOut = () => {
    toast({
      title: "Sign Out",
      description: "You would be signed out of the application here.",
    });
  };

  return (
    <PageLayout title="Admin Profile">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="animate-fade-in">
            <CardHeader className="pb-4">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-3">
                  J
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs gap-1" 
                  onClick={handleEditProfile}
                >
                  <Edit className="h-3 w-3" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <UserCog className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium">{user.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{user.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <Button 
                  variant="destructive" 
                  className="w-full gap-2" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader className="pb-4">
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <LockKeyhole className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${securitySettings.twoFactor ? 'bg-green-100 text-therapy-green' : 'bg-yellow-100 text-yellow-700'}`}>
                      {securitySettings.twoFactor ? 'Enabled' : 'Disabled'}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleManageSecurity('Two-Factor Authentication')}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <KeyRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">Manage devices where you're currently logged in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${securitySettings.activeSessions ? 'bg-blue-100 text-therapy-blue' : 'bg-gray-100 text-gray-700'}`}>
                      {securitySettings.activeSessions ? 'Multiple' : 'Single'}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleManageSecurity('Active Sessions')}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Password Management</p>
                      <p className="text-sm text-muted-foreground">Change your password or set up password requirements</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleManageSecurity('Password Management')}
                  >
                    Manage
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified of new logins to your account</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${securitySettings.loginNotifications ? 'bg-green-100 text-therapy-green' : 'bg-yellow-100 text-yellow-700'}`}>
                      {securitySettings.loginNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleManageSecurity('Login Notifications')}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="animate-fade-in">
              <CardHeader className="pb-4">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and login activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="pb-3 border-b last:border-0 last:pb-0">
                      <p>{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Activity Log
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="pb-4">
                <CardTitle>System Permissions</CardTitle>
                <CardDescription>Your access rights in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {permissions.map(permission => (
                    <div 
                      key={permission.id} 
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <p>{permission.name}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${permission.enabled ? 'bg-green-100 text-therapy-green' : 'bg-red-100 text-therapy-red'}`}>
                        {permission.enabled ? 'Allowed' : 'Denied'}
                      </span>
                    </div>
                  ))}
                  
                  <div className="pt-2 text-center text-sm text-muted-foreground">
                    <p>As an administrator, you have full access to all system features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
