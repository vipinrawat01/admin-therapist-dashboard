
import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Calendar, Clock, Settings, Save, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/components/ui/use-toast';

const SupervisorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Sample profile data
  const [profileData, setProfileData] = useState({
    name: "Daniel Thompson",
    email: "daniel.thompson@therapyai.com",
    phone: "(555) 123-4567",
    role: "Supervisor",
    department: "Speech & Behavioral",
    joinDate: "January 15, 2022",
    lastActive: "Today, 10:30 AM",
    bio: "Senior therapy supervisor with over 10 years of experience in speech and behavioral therapy. Specialized in early intervention strategies and team management.",
    notifications: {
      email: true,
      push: true,
      sessionReminders: true,
      reportAlerts: true,
      therapistUpdates: true
    }
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset form to original data
    setIsEditing(false);
    toast({
      title: "Editing Cancelled",
      description: "Your changes have been discarded.",
    });
  };

  const handleChangeNotification = (key: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  return (
    <PageLayout title="Profile">
      <p className="text-muted-foreground mb-6">
        This page will display and allow editing of the supervisor's profile information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" alt={profileData.name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-medium text-center">{profileData.name}</h2>
              <p className="text-muted-foreground text-center">{profileData.role}</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.department}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last active: {profileData.lastActive}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-6 w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and update your personal information and biography
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={profileData.department}
                            onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biography</Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[120px] p-3 border rounded-md"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                          <p>{profileData.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                          <p>{profileData.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                          <p>{profileData.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                          <p>{profileData.department}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Biography</h3>
                        <p className="mt-1">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                {isEditing && (
                  <CardFooter className="flex justify-end gap-2 border-t pt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleCancelEdit}
                      className="gap-1"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="gap-1"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Overview Statistics</CardTitle>
                  <CardDescription>
                    Key numbers about your supervision activities
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-sm text-muted-foreground">Therapists Supervised</p>
                      <p className="text-2xl font-semibold mt-1">8</p>
                    </div>
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-sm text-muted-foreground">Reports Generated</p>
                      <p className="text-2xl font-semibold mt-1">32</p>
                    </div>
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-sm text-muted-foreground">Recommendations Reviewed</p>
                      <p className="text-2xl font-semibold mt-1">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification settings and preferences
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={profileData.notifications.email}
                        onCheckedChange={(value) => handleChangeNotification('email', value)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
                      </div>
                      <Switch 
                        checked={profileData.notifications.push}
                        onCheckedChange={(value) => handleChangeNotification('push', value)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Session Reminders</h3>
                        <p className="text-sm text-muted-foreground">Get notified about upcoming sessions</p>
                      </div>
                      <Switch 
                        checked={profileData.notifications.sessionReminders}
                        onCheckedChange={(value) => handleChangeNotification('sessionReminders', value)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Report Alerts</h3>
                        <p className="text-sm text-muted-foreground">Be notified when new reports are available</p>
                      </div>
                      <Switch 
                        checked={profileData.notifications.reportAlerts}
                        onCheckedChange={(value) => handleChangeNotification('reportAlerts', value)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Therapist Updates</h3>
                        <p className="text-sm text-muted-foreground">Receive notifications about therapist activities</p>
                      </div>
                      <Switch 
                        checked={profileData.notifications.therapistUpdates}
                        onCheckedChange={(value) => handleChangeNotification('therapistUpdates', value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>
                    Customize how information is displayed in your portal
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Compact View</h3>
                        <p className="text-sm text-muted-foreground">Display more information in less space</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Show Statistics</h3>
                        <p className="text-sm text-muted-foreground">Display numeric data in dashboards</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Progress Visualizations</h3>
                        <p className="text-sm text-muted-foreground">Show charts for progress tracking</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Secure your account with an authentication app
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>
                    Review recent account access
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start pb-2 border-b">
                      <div>
                        <p className="font-medium">Today, 10:30 AM</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows</p>
                      </div>
                      <Badge>Current Session</Badge>
                    </div>
                    <div className="flex justify-between items-start pb-2 border-b">
                      <div>
                        <p className="font-medium">Yesterday, 3:45 PM</p>
                        <p className="text-sm text-muted-foreground">Safari on iPhone</p>
                      </div>
                      <Badge variant="outline">Successful</Badge>
                    </div>
                    <div className="flex justify-between items-start pb-2 border-b">
                      <div>
                        <p className="font-medium">May 2, 2023, 9:15 AM</p>
                        <p className="text-sm text-muted-foreground">Chrome on Mac</p>
                      </div>
                      <Badge variant="outline">Successful</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button variant="outline">View Full History</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default SupervisorProfile;
