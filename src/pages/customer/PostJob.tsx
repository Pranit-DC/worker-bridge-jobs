import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ArrowLeft, MapPin, IndianRupee, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const jobCategories = [
  'Plumbing',
  'Electrical',
  'Driving',
  'Cleaning',
  'Painting',
  'Carpentry',
  'Other'
];

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    budget: '',
    duration: '',
    date: '',
    urgency: 'normal'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job has been posted and workers can now apply",
    });
    
    navigate('/customer/jobs');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 bg-card border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/customer')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-heading-lg font-bold">Post a Job</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Job Category */}
        <Card className="p-4">
          <Label className="text-heading-md font-medium mb-4 block">What type of work do you need?</Label>
          <div className="grid grid-cols-2 gap-3">
            {jobCategories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={formData.category === category ? "default" : "outline"}
                className="h-auto p-3 text-left"
                onClick={() => updateFormData('category', category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </Card>

        {/* Job Details */}
        <Card className="p-4 space-y-4">
          <h2 className="text-heading-md font-medium">Job Details</h2>
          
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="e.g., Plumber needed for bathroom repair"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the work you need done..."
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={4}
              required
            />
          </div>
        </Card>

        {/* Location & Budget */}
        <Card className="p-4 space-y-4">
          <h2 className="text-heading-md font-medium">Location & Budget</h2>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="budget"
                type="number"
                placeholder="Enter amount"
                value={formData.budget}
                onChange={(e) => updateFormData('budget', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-4 space-y-4">
          <h2 className="text-heading-md font-medium">When do you need this done?</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateFormData('date', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 1 day, 2 hours"
                value={formData.duration}
                onChange={(e) => updateFormData('duration', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Urgency</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={formData.urgency === 'normal' ? "default" : "outline"}
                onClick={() => updateFormData('urgency', 'normal')}
                className="flex-1"
              >
                Normal
              </Button>
              <Button
                type="button"
                variant={formData.urgency === 'urgent' ? "warning" : "outline"}
                onClick={() => updateFormData('urgency', 'urgent')}
                className="flex-1"
              >
                Urgent
              </Button>
            </div>
          </div>
        </Card>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isLoading || !formData.title || !formData.category || !formData.location || !formData.budget}
        >
          {isLoading ? 'Posting Job...' : 'Post Job'}
        </Button>
      </form>

      <BottomNavigation userType="customer" />
    </div>
  );
}