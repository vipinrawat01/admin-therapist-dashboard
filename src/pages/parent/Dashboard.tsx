
import React from 'react';
import { ArrowRight, Calendar, MessageSquare, BarChart3, Clock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

// Mock data for the parent dashboard
const childData = {
  name: 'Alex',
  nextSession: {
    date: 'Tomorrow',
    time: '3:30 PM',
    type: 'Speech Therapy'
  },
  completedActivities: {
    count: 8,
    total: 12,
    period: 'This week'
  },
  overallProgress: {
    percentage: 72,
    period: 'Last 30 days'
  },
  newRecommendations: {
    count: 3,
    source: 'AI Assistant'
  },
  therapyProgress: [
    { type: 'Speech Therapy', progress: 70, max: 100, color: 'blue' },
    { type: 'Behavior Therapy', progress: 85, max: 100, color: 'green' },
    { type: 'Occupational Therapy', progress: 60, max: 100, color: 'orange' },
    { type: 'Sensory Integration', progress: 75, max: 100, color: 'indigo' }
  ],
  recentActivities: [
    { 
      title: 'Sound Repetition Exercise', 
      type: 'speech',
      description: 'Practice 5 sound repetition with picture cards',
      date: 'Today, 2:30 PM',
      status: 'Completed'
    },
    { 
      title: 'Calm Down Routine', 
      type: 'behavior',
      description: 'Practice the 5-step calm down routine before bedtime',
      date: 'Yesterday',
      status: 'Pending'
    },
    { 
      title: 'Texture Exploration', 
      type: 'sensory',
      description: 'Explore different textures with hands and describe the feeling',
      date: '2 days ago',
      status: 'Completed'
    }
  ],
  messages: {
    unread: 2
  }
};

const ParentDashboard = () => {
  const { toast } = useToast();
  
  const handleViewActivity = () => {
    toast({
      title: "Opening activities",
      description: "Redirecting to home activities page",
    });
  };
  
  return (
    <PageLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome, Jessica!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your child's progress and recent home activities.
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Next Session Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 text-blue-500 mt-1 mr-2" />
                <div>
                  <div className="text-2xl font-bold">
                    {childData.nextSession.date}, {childData.nextSession.time}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {childData.nextSession.type}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Completed Activities Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <Clock className="h-4 w-4 text-purple-500 mt-1 mr-2" />
                <div>
                  <div className="text-2xl font-bold">
                    {childData.completedActivities.count} of {childData.completedActivities.total}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {childData.completedActivities.period}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Overall Progress Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <BarChart3 className="h-4 w-4 text-green-500 mt-1 mr-2" />
                <div>
                  <div className="text-2xl font-bold">
                    {childData.overallProgress.percentage}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {childData.overallProgress.period}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* New Recommendations Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="h-4 w-4 text-amber-500 mt-1 mr-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-lightbulb"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {childData.newRecommendations.count}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    From {childData.newRecommendations.source}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Child Progress Section and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Child Progress Card */}
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>{childData.name}'s Progress</CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href="/parent/profile">
                  Full Report <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {childData.therapyProgress.map((therapy) => (
                <div key={therapy.type} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{therapy.type}</span>
                    <span className="text-sm text-muted-foreground">
                      {therapy.progress}/{therapy.max} ({Math.round(therapy.progress / therapy.max * 100)}%)
                    </span>
                  </div>
                  <Progress value={therapy.progress} max={therapy.max} className={`h-2 ${therapy.color === 'blue' ? 'bg-blue-100' : therapy.color === 'green' ? 'bg-green-100' : therapy.color === 'orange' ? 'bg-orange-100' : 'bg-indigo-100'}`} />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Overall Progress</h4>
                    <p className="text-2xl font-bold">{childData.overallProgress.percentage}%</p>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    Last updated: Today, 9:30 AM
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activities Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle>Recent Activities</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/parent/home-activities">
                    View All Activities
                  </a>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {childData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{activity.title}</h4>
                        <Badge variant="outline" className={
                          activity.type === 'speech' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          activity.type === 'behavior' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }>
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                        <span className={`text-xs font-medium ${activity.status === 'Completed' ? 'text-green-600' : 'text-amber-600'}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Messages Overview Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  You have {childData.messages.unread} unread messages from your supervisor.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/parent/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View Messages
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ParentDashboard;
