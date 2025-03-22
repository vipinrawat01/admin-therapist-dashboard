
import { useState } from 'react';
import { BarChart, LineChart, PieChart, Calendar, Users, TrendingUp, Download, Filter, ChevronDown } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ReportCard from '@/components/cards/ReportCard';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/components/ui/use-toast';

const Reports = () => {
  const [reportTypeFilter, setReportTypeFilter] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

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
              {selectedReport && (
                <div className="space-y-4">
                  <p>{reports.find(r => r.id === selectedReport)?.content}</p>
                  <p className="text-sm text-muted-foreground italic">
                    Detailed report data and visualizations will be displayed here.
                  </p>
                </div>
              )}
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
            <Button>Generate Full Report</Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Reports;
