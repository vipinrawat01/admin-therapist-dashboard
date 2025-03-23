
import React, { useState } from 'react';
import { SearchIcon, FileDown, FileText, BarChart3, PieChart } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

const SupervisorReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const { toast } = useToast();

  // Sample children data
  const childrenData = [
    { id: "1", name: "Noah Williams" },
    { id: "2", name: "Mia Rodriguez" },
    { id: "3", name: "Alex Johnson" },
    { id: "4", name: "Lily Carter" },
    { id: "5", name: "Ethan Patel" },
  ];

  const handleGenerateReport = () => {
    if (!selectedChild) {
      toast({
        title: "Selection Required",
        description: "Please select a child to generate a report.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report Generated",
      description: `Report for ${childrenData.find(c => c.id === selectedChild)?.name} has been generated.`,
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your report is being downloaded as a PDF.",
    });
  };

  const handleReportCardClick = (reportType: string) => {
    setSelectedReport(reportType);
  };

  return (
    <PageLayout title="Reports">
      <p className="text-muted-foreground mb-6">
        This page will allow generation of detailed reports for children and therapists.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleReportCardClick("childProgress")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Child Progress Reports
            </CardTitle>
            <CardDescription>
              Detailed tracking of individual therapy progress by domain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate comprehensive reports showing progress across speech, occupational, sensory, behavioral, and ADL therapy domains.
            </p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">View Reports</Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleReportCardClick("therapistEffectiveness")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Therapist Effectiveness Reports
            </CardTitle>
            <CardDescription>
              Measures progress rates across different therapists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Compare effectiveness metrics, session outcomes, and child improvement rates across your therapy team.
            </p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">View Reports</Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleReportCardClick("parentalEngagement")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Parental Engagement Reports
            </CardTitle>
            <CardDescription>
              AI evaluation of home therapy involvement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analysis of parental participation in therapy programs with strategies to increase engagement and improve outcomes.
            </p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">View Reports</Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleReportCardClick("comparisonReports")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileDown className="h-5 w-5 text-amber-600" />
              Comparison Reports
            </CardTitle>
            <CardDescription>
              Compare child progress against expected milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Benchmark progress against established developmental milestones and personalized therapy goals.
            </p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">View Reports</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>
            Create a comprehensive report for a specific child
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search children by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedChild}
              onValueChange={setSelectedChild}
            >
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Select Child" />
              </SelectTrigger>
              <SelectContent>
                {childrenData
                  .filter(child => 
                    !searchQuery || 
                    child.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(child => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium block mb-2">Report Type</label>
              <Select defaultValue="progress">
                <SelectTrigger>
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Progress Report</SelectItem>
                  <SelectItem value="summary">Therapy Summary</SelectItem>
                  <SelectItem value="assessment">Assessment Report</SelectItem>
                  <SelectItem value="milestone">Milestone Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium block mb-2">Date Range</label>
              <Select defaultValue="lastMonth">
                <SelectTrigger>
                  <SelectValue placeholder="Select Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium block mb-2">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button onClick={handleGenerateReport} className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </CardFooter>
      </Card>

      {/* Child Progress Report Dialog */}
      <Dialog 
        open={selectedReport === 'childProgress'} 
        onOpenChange={(open) => !open && setSelectedReport(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Child Progress Reports</DialogTitle>
            <DialogDescription>
              Generate detailed progress reports for individual children across therapy domains
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">Select Child</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a child" />
                  </SelectTrigger>
                  <SelectContent>
                    {childrenData.map(child => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">Therapy Type</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select therapy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Therapies</SelectItem>
                    <SelectItem value="speech">Speech Therapy</SelectItem>
                    <SelectItem value="behavior">Behavior Therapy</SelectItem>
                    <SelectItem value="sensory">Sensory Therapy</SelectItem>
                    <SelectItem value="occupational">Occupational Therapy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">Time Period</label>
                <Select defaultValue="last3Months">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="last3Months">Last 3 Months</SelectItem>
                    <SelectItem value="last6Months">Last 6 Months</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                    <SelectItem value="allTime">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="preview">
              <TabsList className="w-full">
                <TabsTrigger value="preview">Report Preview</TabsTrigger>
                <TabsTrigger value="data">Raw Data</TabsTrigger>
                <TabsTrigger value="visuals">Visualizations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="p-4 border rounded-md min-h-[300px] bg-muted/20">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-4">Report Preview</h3>
                  <p className="text-muted-foreground">
                    Select a child and parameters to generate a report preview.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="p-4 border rounded-md min-h-[300px] bg-muted/20">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-4">Raw Data</h3>
                  <p className="text-muted-foreground">
                    Detailed metrics and assessment data will appear here.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="visuals" className="p-4 border rounded-md min-h-[300px] bg-muted/20">
                <div className="text-center py-12">
                  <PieChart className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium mt-4">Visual Representations</h3>
                  <p className="text-muted-foreground">
                    Charts and graphs visualizing progress data will appear here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Cancel
              </Button>
              <Button onClick={handleDownloadReport} className="gap-2">
                <FileDown className="h-4 w-4" />
                Save Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Therapist Effectiveness Report Dialog */}
      <Dialog 
        open={selectedReport === 'therapistEffectiveness'} 
        onOpenChange={(open) => !open && setSelectedReport(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Therapist Effectiveness Reports</DialogTitle>
            <DialogDescription>
              Compare effectiveness metrics and outcomes across therapists
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 mx-auto text-purple-600" />
              <h3 className="text-lg font-medium mt-4">Therapist Effectiveness</h3>
              <p className="text-muted-foreground">
                This report would show performance metrics, progress rates, and outcome 
                statistics for each therapist.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Parental Engagement Report Dialog */}
      <Dialog 
        open={selectedReport === 'parentalEngagement'} 
        onOpenChange={(open) => !open && setSelectedReport(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Parental Engagement Reports</DialogTitle>
            <DialogDescription>
              AI evaluation of home therapy participation with strategies to increase engagement
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center py-12">
              <PieChart className="h-16 w-16 mx-auto text-green-600" />
              <h3 className="text-lg font-medium mt-4">Parental Engagement Analysis</h3>
              <p className="text-muted-foreground">
                This report would show metrics on parental involvement, home practice completion,
                and AI-generated strategies to improve participation.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Comparison Reports Dialog */}
      <Dialog 
        open={selectedReport === 'comparisonReports'} 
        onOpenChange={(open) => !open && setSelectedReport(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Milestone Comparison Reports</DialogTitle>
            <DialogDescription>
              Compare progress against expected developmental milestones
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center py-12">
              <FileDown className="h-16 w-16 mx-auto text-amber-600" />
              <h3 className="text-lg font-medium mt-4">Comparative Analysis</h3>
              <p className="text-muted-foreground">
                This report would compare a child's progress against standard developmental
                milestones and therapy goals, highlighting areas of strength and opportunity.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default SupervisorReports;
