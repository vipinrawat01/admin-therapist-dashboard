
import { useState } from 'react';
import { BarChart, LineChart, PieChart, Calendar, Users, TrendingUp, Download, Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ReportCard from '@/components/cards/ReportCard';
import { Button } from '@/components/ui/button';
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
  const { toast } = useToast();

  const reports = [
    {
      id: '1',
      type: 'progress',
      title: 'Child Progress Reports',
      description: 'Track individual children\'s progress toward therapy goals',
      icon: <TrendingUp className="h-5 w-5 text-therapy-green" />,
    },
    {
      id: '2',
      type: 'effectiveness',
      title: 'Therapist Effectiveness',
      description: 'Analyze therapist performance and client outcomes',
      icon: <BarChart className="h-5 w-5 text-therapy-blue" />,
    },
    {
      id: '3',
      type: 'engagement',
      title: 'Parent Engagement',
      description: 'Measure parent participation and home exercise completion',
      icon: <Users className="h-5 w-5 text-therapy-purple" />,
    },
    {
      id: '4',
      type: 'session',
      title: 'Session Analytics',
      description: 'Review session frequency, duration, and goal achievement',
      icon: <LineChart className="h-5 w-5 text-therapy-orange" />,
    },
    {
      id: '5',
      type: 'attendance',
      title: 'Attendance Reports',
      description: 'Track session attendance, cancellations, and reschedules',
      icon: <Calendar className="h-5 w-5 text-therapy-yellow" />,
    },
    {
      id: '6',
      type: 'custom',
      title: 'Custom Reports',
      description: 'Create tailored reports with your own parameters',
      icon: <PieChart className="h-5 w-5 text-therapy-red" />,
    },
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
    
    toast({
      title: `${report?.title}`,
      description: "Loading report data...",
    });
    
    // In a real application, this would navigate to the specific report view
  };

  return (
    <PageLayout title="Reports">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground max-w-2xl">
          This page will display various reporting options including child progress, therapist effectiveness, parental engagement, and compilation reports.
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
                checked={reportTypeFilter.includes('session')}
                onCheckedChange={() => toggleReportTypeFilter('session')}
              >
                Session Reports
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={reportTypeFilter.includes('attendance')}
                onCheckedChange={() => toggleReportTypeFilter('attendance')}
              >
                Attendance Reports
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={reportTypeFilter.includes('custom')}
                onCheckedChange={() => toggleReportTypeFilter('custom')}
              >
                Custom Reports
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
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
    </PageLayout>
  );
};

export default Reports;
