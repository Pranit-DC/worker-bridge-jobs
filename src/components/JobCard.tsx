import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  wage: number;
  duration: string;
  isUrgent?: boolean;
  distance?: string;
  onApply?: (jobId: string) => void;
  className?: string;
}

export function JobCard({
  id,
  title,
  location,
  wage,
  duration,
  isUrgent = false,
  distance,
  onApply,
  className
}: JobCardProps) {
  return (
    <Card className={cn("p-4 space-y-3", className)}>
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-heading-md font-semibold">{title}</h3>
            {isUrgent && (
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                Urgent
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-body text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            {distance && (
              <span className="text-primary font-medium">{distance}</span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-body">
            <div className="flex items-center gap-1 font-semibold text-primary">
              <IndianRupee className="w-4 h-4" />
              <span>{wage.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
      
      {onApply && (
        <Button
          variant="accent"
          size="default"
          className="w-full"
          onClick={() => onApply(id)}
        >
          Apply Now
        </Button>
      )}
    </Card>
  );
}