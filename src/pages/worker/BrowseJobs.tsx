import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobCard } from '@/components/JobCard';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Search, Filter, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BrowseJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { toast } = useToast();

  const filters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'plumber', label: 'Plumbing' },
    { id: 'electrician', label: 'Electrical' },
    { id: 'driver', label: 'Driving' },
    { id: 'cleaner', label: 'Cleaning' },
  ];

  const jobs = [
    {
      id: '1',
      title: 'Plumber needed for bathroom repair',
      location: 'Sector 15, Gurgaon',
      wage: 2500,
      duration: '1 day',
      isUrgent: true,
      distance: '2.1 km'
    },
    {
      id: '2',
      title: 'Electrician for wiring work',
      location: 'DLF Phase 2',
      wage: 3000,
      duration: '2 days',
      distance: '3.5 km'
    },
    {
      id: '3',
      title: 'Driver for daily office commute',
      location: 'Cyber City',
      wage: 15000,
      duration: 'Monthly',
      distance: '5.2 km'
    },
    {
      id: '4',
      title: 'House cleaning service',
      location: 'Golf Course Road',
      wage: 1200,
      duration: '4 hours',
      distance: '1.8 km'
    }
  ];

  const handleApply = (jobId: string) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been sent to the employer",
    });
  };

  const filteredJobs = jobs.filter(job => {
    if (selectedFilter !== 'all') {
      return job.title.toLowerCase().includes(selectedFilter);
    }
    if (searchQuery) {
      return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             job.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 bg-card border-b border-border">
        <h1 className="text-heading-lg font-bold mb-4">Browse Jobs</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search jobs or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="whitespace-nowrap"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </header>

      {/* Location Banner */}
      <section className="p-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-body font-medium">Jobs near you</p>
              <p className="text-sm text-muted-foreground">Gurgaon, Haryana</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Jobs List */}
      <section className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-md font-semibold">
            {filteredJobs.length} Jobs Available
          </h2>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onApply={handleApply}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="p-8 text-center">
            <div className="space-y-3">
              <Search className="w-12 h-12 text-muted-foreground mx-auto" />
              <h3 className="text-heading-md font-medium">No jobs found</h3>
              <p className="text-body text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          </Card>
        )}
      </section>

      <BottomNavigation userType="worker" />
    </div>
  );
}