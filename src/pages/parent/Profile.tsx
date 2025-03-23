
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Home,
  Pencil,
  Shield,
  Building,
  Calendar,
  FileText,
  BookOpen,
  BarChart3
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Mock data for parent profile
const parentData = {
  name: 'Jessica Rodriguez',
  email: 'jessica.rodriguez@example.com',
  phone: '(555) 123-4567',
  address: '123 Maple Street, Springfield, IL 62701',
  children: [
    {
      id: 1,
      name: 'Alex Rodriguez',
      age: 7,
      therapies: ['Speech', 'Behavior', 'Occupational', 'Sensory'],
      nextSession: {
        date: 'Tomorrow',
        time: '3:30 PM',
        therapist: 'Dr. Emma Thompson',
        type: 'Speech Therapy'
      },
      progressReports: [
        {
          id: 1,
          date: '2023-09-01',
          title: 'Monthly Progress Report',
          therapist: 'Dr. Emma Thompson',
          description: 'Comprehensive assessment of speech and language development'
        },
        {
          id: 2,
          date: '2023-08-01',
          title: 'Monthly Progress Report',
          therapist: 'Dr. Emma Thompson',
          description: 'Evaluation of speech sound production and language comprehension'
        },
        {
          id: 3,
          date: '2023-07-15',
          title: 'Quarterly Assessment',
          therapist: 'Dr. Michael Chen',
          description: 'Detailed behavior analysis and intervention effectiveness'
        }
      ],
      goals: [
        {
          id: 1,
          area: 'Speech',
          description: 'Correctly produce "S" and "L" sounds in conversation',
          progress: 70,
          status: 'in-progress'
        },
        {
          id: 2,
          area: 'Behavior',
          description: 'Use calm-down strategies when frustrated',
          progress: 85,
          status: 'in-progress'
        },
        {
          id: 3,
          area: 'Sensory',
          description: 'Tolerate different textures during daily activities',
          progress: 65,
          status: 'in-progress'
        },
        {
          id: 4,
          area: 'Speech',
          description: 'Follow 2-step verbal directions',
          progress: 100,
          status: 'completed'
        }
      ],
      therapyHistory: [
        {
          date: '2023-09-20',
          type: 'Speech Therapy',
          therapist: 'Dr. Emma Thompson',
          notes: 'Worked on S-blends in beginning of words, showed improvement in accuracy'
        },
        {
          date: '2023-09-15',
          type: 'Behavior Therapy',
          therapist: 'Dr. Michael Chen',
          notes: 'Practiced self-regulation techniques, responded well to visual cues'
        },
        {
          date: '2023-09-10',
          type: 'Occupational Therapy',
          therapist: 'Dr. Sarah Williams',
          notes: 'Fine motor skills exercises, improved pencil grip and control'
        }
      ]
    }
  ],
  accountCreated: 'January 15, 2023',
  lastLogin: 'September 26, 2023',
  preferences: {
    notifications: true,
    reminderTime: '24 hours before',
    language: 'English'
  }
};

const ParentProfile = () => {
  const { toast } = useToast();
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile edit functionality would open here.",
    });
  };
  
  const handleDownloadReport = (reportId: number) => {
    toast({
      title: "Downloading Report",
      description: `Report #${reportId} is being prepared for download.`,
    });
  };
  
  return (
    <PageLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Card className="w-full md:w-64">
            <CardContent className="pt-6 text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarFallback className="text-2xl">{parentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{parentData.name}</h2>
              <p className="text-sm text-muted-foreground">Parent Account</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{parentData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{parentData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{parentData.address}</span>
                </div>
              </div>
              <Button className="mt-4 w-full" onClick={handleEditProfile}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Account Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Account Type</p>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Parent / Guardian</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Facility</p>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Springfield Therapy Center</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Account Created</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{parentData.accountCreated}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Last Login</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{parentData.lastLogin}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Notification Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Session Reminders</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>New Activity Alerts</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Progress Report Notifications</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Message Notifications</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleEditProfile} className="w-full">
                  Update Preferences
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Child Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Child Information</h2>
          
          <Tabs defaultValue="goals">
            <TabsList className="mb-4">
              <TabsTrigger value="goals">
                <BarChart3 className="h-4 w-4 mr-2" />
                Therapy Goals
              </TabsTrigger>
              <TabsTrigger value="reports">
                <FileText className="h-4 w-4 mr-2" />
                Progress Reports
              </TabsTrigger>
              <TabsTrigger value="history">
                <BookOpen className="h-4 w-4 mr-2" />
                Session History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="goals" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{parentData.children[0].name}'s Therapy Goals</CardTitle>
                      <CardDescription>Current therapeutic objectives and progress</CardDescription>
                    </div>
                    <Badge variant="outline">Age: {parentData.children[0].age}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <h3 className="font-medium text-lg">Active Goals</h3>
                    {parentData.children[0].goals
                      .filter(goal => goal.status === 'in-progress')
                      .map(goal => (
                        <div key={goal.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={
                              goal.area === 'Speech' ? 'bg-blue-500' :
                              goal.area === 'Behavior' ? 'bg-purple-500' :
                              goal.area === 'Occupational' ? 'bg-orange-500' :
                              'bg-amber-500'
                            }>
                              {goal.area}
                            </Badge>
                            <h4 className="font-medium">{goal.description}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={goal.progress} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{goal.progress}%</span>
                          </div>
                        </div>
                      ))}
                    
                    <Separator />
                    
                    <h3 className="font-medium text-lg">Completed Goals</h3>
                    {parentData.children[0].goals
                      .filter(goal => goal.status === 'completed')
                      .map(goal => (
                        <div key={goal.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={
                              goal.area === 'Speech' ? 'bg-blue-500' :
                              goal.area === 'Behavior' ? 'bg-purple-500' :
                              goal.area === 'Occupational' ? 'bg-orange-500' :
                              'bg-amber-500'
                            }>
                              {goal.area}
                            </Badge>
                            <h4 className="font-medium">{goal.description}</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Completed
                            </Badge>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Reports</CardTitle>
                  <CardDescription>Assessment reports from therapy sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {parentData.children[0].progressReports.map(report => (
                      <div key={report.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{report.title}</h4>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{new Date(report.date).toLocaleDateString()}</Badge>
                              <p className="text-sm text-muted-foreground">By {report.therapist}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Recent therapy sessions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {parentData.children[0].therapyHistory.map((session, index) => (
                      <div key={index} className="relative pl-6 pb-8 last:pb-0">
                        {/* Timeline dot and line */}
                        <div className="absolute top-1.5 left-0 h-3 w-3 rounded-full bg-primary"></div>
                        {index < parentData.children[0].therapyHistory.length - 1 && (
                          <div className="absolute top-4 left-1.5 h-full w-0.5 -ml-px bg-border"></div>
                        )}
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{session.type}</h4>
                            <Badge variant="outline">
                              {new Date(session.date).toLocaleDateString([], {month: 'short', day: 'numeric', year: 'numeric'})}
                            </Badge>
                          </div>
                          <p className="text-sm">Therapist: {session.therapist}</p>
                          <p className="text-sm text-muted-foreground mt-1">{session.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default ParentProfile;
