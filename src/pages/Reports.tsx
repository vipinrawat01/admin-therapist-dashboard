
import { useState } from 'react';
import { BarChart, LineChart, PieChart, Calendar, Users, TrendingUp, Download, Filter, ChevronDown, Search, Save } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ReportCard from '@/components/cards/ReportCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

const Reports = () => {
  const [reportTypeFilter, setReportTypeFilter] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [childSearch, setChildSearch] = useState('');
  const [therapyTypeFilter, setTherapyTypeFilter] = useState('all');
  const { toast } = useToast();

  // Sample data
  const children = [
    { id: 'c1', name: 'Emma Thompson', age: 6, therapy: 'Speech' },
    { id: 'c2', name: 'Noah Garcia', age: 8, therapy: 'OT' },
    { id: 'c3', name: 'Olivia Wilson', age: 5, therapy: 'Sensory' },
    { id: 'c4', name: 'Liam Johnson', age: 7, therapy: 'ADL' },
    { id: 'c5', name: 'Sophia Martinez', age: 9, therapy: 'Behavior' },
    { id: 'c6', name: 'Mason Brown', age: 4, therapy: 'Speech' },
  ];

  const therapists = [
    { id: 't1', name: 'Dr. James Wilson', specialty: 'Speech', effectiveness: 92 },
    { id: 't2', name: 'Dr. Sarah Miller', specialty: 'OT', effectiveness: 88 },
    { id: 't3', name: 'Dr. Robert Davis', specialty: 'Behavioral', effectiveness: 95 },
    { id: 't4', name: 'Dr. Jennifer Lee', specialty: 'Sensory', effectiveness: 91 },
  ];

  const parentalEngagement = [
    { id: 'p1', childName: 'Emma Thompson', parentName: 'David & Lisa Thompson', engagement: 'High', completionRate: 92 },
    { id: 'p2', childName: 'Noah Garcia', parentName: 'Maria Garcia', engagement: 'Medium', completionRate: 76 },
    { id: 'p3', childName: 'Olivia Wilson', parentName: 'Michael & Kate Wilson', engagement: 'Low', completionRate: 45 },
  ];

  const reports = [
    {
      id: '1',
      type: 'progress',
      title: 'Child Progress Reports',
      description: 'Tracks individual therapy progress by domain (Speech, OT, ADL, Sensory, Behavior)',
      icon: <TrendingUp className="h-5 w-5 text-therapy-green" />,
      content: 'Detailed view of child progress across various therapy domains.'
    },
    {
      id: '2',
      type: 'effectiveness',
      title: 'Therapist Effectiveness Reports',
      description: 'Measures progress rate per therapist',
      icon: <BarChart className="h-5 w-5 text-therapy-blue" />,
      content: 'Analytics on therapist performance metrics and client outcomes.'
    },
    {
      id: '3',
      type: 'engagement',
      title: 'Parental Engagement Reports',
      description: 'AI evaluates home therapy involvement & provides strategies to increase engagement',
      icon: <Users className="h-5 w-5 text-therapy-purple" />,
      content: 'AI-driven analysis of parental involvement in home therapy activities with actionable recommendations.'
    },
    {
      id: '4',
      type: 'comparison',
      title: 'Comparison Reports',
      description: 'Compares child progress vs expected milestones based on therapy data',
      icon: <LineChart className="h-5 w-5 text-therapy-orange" />,
      content: 'Benchmark analysis comparing child progress against developmental milestones.'
    }
  ];

  const filteredReports = reportTypeFilter.length > 0
    ? reports.filter(report => reportTypeFilter.includes(report.type))
    : reports;

  const toggleReportTypeFilter = (type: string) => {
    setReportTypeFilter(current => 
      current.includes(type) 
        ? current.filter(t => t !== type) 
        : [...current, type]
    );
  };

  const clearFilters = () => {
    setReportTypeFilter([]);
  };

  const handleOpenReport = (reportId: string) => {
    // Find report details
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    
    setSelectedReport(reportId);
    setOpenDialog(true);
    
    // Reset search and filter when opening a new report
    setChildSearch('');
    setTherapyTypeFilter('all');
  };

  const handleSaveReport = () => {
    toast({
      title: "Report saved",
      description: "Report has been saved successfully.",
    });
  };

  // Filter children based on search and therapy type
  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(childSearch.toLowerCase());
    const matchesTherapy = therapyTypeFilter === 'all' || child.therapy === therapyTypeFilter;
    return matchesSearch && matchesTherapy;
  });

  // Render different dialog content based on selected report
  const renderDialogContent = () => {
    if (!selectedReport) return null;
    
    switch (selectedReport) {
      case '1': // Child Progress Reports
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by child name..." 
                  className="pl-8"
                  value={childSearch}
                  onChange={(e) => setChildSearch(e.target.value)}
                />
              </div>
              <Select
                value={therapyTypeFilter}
                onValueChange={setTherapyTypeFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by therapy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Therapies</SelectItem>
                  <SelectItem value="Speech">Speech</SelectItem>
                  <SelectItem value="OT">Occupational</SelectItem>
                  <SelectItem value="ADL">ADL</SelectItem>
                  <SelectItem value="Sensory">Sensory</SelectItem>
                  <SelectItem value="Behavior">Behavioral</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleSaveReport}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
            
            {filteredChildren.length > 0 ? (
              <div className="space-y-4">
                {filteredChildren.map(child => (
                  <div key={child.id} className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">Age: {child.age} | Therapy: {child.therapy}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={handleSaveReport}>
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm">
                        Progress summary: <span className="font-medium text-green-600">72% complete</span> with therapy goals in {child.therapy}. 
                        Last session on <span className="font-medium">June 12, 2023</span>.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No children found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        );
        
      case '2': // Therapist Effectiveness Reports
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p>Showing effectiveness metrics across all therapists</p>
              <Button size="sm" variant="outline" onClick={handleSaveReport}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
            
            <div className="space-y-3">
              {therapists.map(therapist => (
                <div key={therapist.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{therapist.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      therapist.effectiveness > 90 ? 'bg-green-100 text-green-800' : 
                      therapist.effectiveness > 80 ? 'bg-blue-100 text-blue-800' : 
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {therapist.effectiveness}% effective
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Specialty: {therapist.specialty}</p>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm">
                      Average session progress: <span className="font-medium">+3.2 points</span> <br />
                      Client retention rate: <span className="font-medium">94%</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case '3': // Parental Engagement Reports
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p>Home therapy engagement analysis by our AI</p>
              <Button size="sm" variant="outline" onClick={handleSaveReport}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
            
            <div className="space-y-3">
              {parentalEngagement.map(item => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.childName}</h3>
                      <p className="text-sm text-muted-foreground">Parent(s): {item.parentName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.engagement === 'High' ? 'bg-green-100 text-green-800' : 
                      item.engagement === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.engagement} engagement
                    </span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm">
                      Home activity completion rate: <span className="font-medium">{item.completionRate}%</span> <br />
                      {item.engagement === 'Low' && (
                        <span className="text-sm text-red-600 font-medium">
                          AI recommendation: Schedule a parent coaching session
                        </span>
                      )}
                      {item.engagement === 'Medium' && (
                        <span className="text-sm text-blue-600 font-medium">
                          AI recommendation: Provide simplified activity instructions
                        </span>
                      )}
                      {item.engagement === 'High' && (
                        <span className="text-sm text-green-600 font-medium">
                          AI recommendation: Increase challenge level for home activities
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case '4': // Comparison Reports
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by child name..." className="pl-8" />
              </div>
              <Button size="sm" variant="outline" onClick={handleSaveReport}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
            
            <div className="space-y-3">
              {children.slice(0, 3).map(child => (
                <div key={child.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{child.name}</h3>
                  <p className="text-sm text-muted-foreground">Age: {child.age} | Therapy: {child.therapy}</p>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Current development level</span>
                      <span className="text-xs text-muted-foreground">vs. expected milestones</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Communication</span>
                          <span className={child.id === 'c1' ? "text-green-600" : "text-amber-600"}>
                            {child.id === 'c1' ? "+2 months ahead" : "-1 month behind"}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${child.id === 'c1' ? "bg-green-500" : "bg-amber-500"}`} 
                              style={{ width: child.id === 'c1' ? "85%" : "65%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Motor Skills</span>
                          <span className={child.id === 'c1' ? "text-blue-600" : "text-green-600"}>
                            {child.id === 'c1' ? "On target" : "+1 month ahead"}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${child.id === 'c1' ? "bg-blue-500" : "bg-green-500"}`} 
                              style={{ width: child.id === 'c1' ? "75%" : "80%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <p className="text-muted-foreground">Select a report to view details</p>
        );
    }
  };

  return (
    <PageLayout title="Reports">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground max-w-2xl">
          Access detailed reports on child progress, therapist effectiveness, parental engagement, and milestone comparisons.
        </p>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {reportTypeFilter.length > 0 && (
                  <span className="ml-1 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {reportTypeFilter.length}
                  </span>
                )}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Report Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={reportTypeFilter.includes('progress')}
                onCheckedChange={() => toggleReportTypeFilter('progress')}
              >
                Progress Reports
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={reportTypeFilter.includes('effectiveness')}
                onCheckedChange={() => toggleReportTypeFilter('effectiveness')}
              >
                Effectiveness Reports
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={reportTypeFilter.includes('engagement')}
                onCheckedChange={() => toggleReportTypeFilter('engagement')}
              >
                Engagement Reports
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={reportTypeFilter.includes('comparison')}
                onCheckedChange={() => toggleReportTypeFilter('comparison')}
              >
                Comparison Reports
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
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export Data</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
        {filteredReports.map(report => (
          <ReportCard
            key={report.id}
            type={report.type as any}
            title={report.title}
            description={report.description}
            icon={report.icon}
            onClick={() => handleOpenReport(report.id)}
          />
        ))}
      </div>
      
      {filteredReports.length === 0 && (
        <div className="therapy-card py-12 text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center mb-4">
            <Filter className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No reports match your filters</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Try adjusting your filter criteria or clear all filters to see all available reports.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={clearFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Report Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {selectedReport && reports.find(r => r.id === selectedReport)?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedReport && reports.find(r => r.id === selectedReport)?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="rounded-md bg-muted p-6">
              {renderDialogContent()}
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => setOpenDialog(false)}
              variant="outline" 
              className="mr-2"
            >
              Close
            </Button>
            <Button onClick={handleSaveReport}>Generate Full Report</Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Reports;
