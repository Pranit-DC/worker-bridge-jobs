import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkerCardProps {
  id: string;
  name: string;
  skill: string;
  location: string;
  rating: number;
  reviewCount: number;
  distance?: string;
  available?: boolean;
  avatar?: string;
  onHire?: (workerId: string) => void;
  onCall?: (workerId: string) => void;
  className?: string;
}

export function WorkerCard({
  id,
  name,
  skill,
  location,
  rating,
  reviewCount,
  distance,
  available = true,
  avatar,
  onHire,
  onCall,
  className
}: WorkerCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className={cn("p-4 space-y-4", className)}>
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-heading-md font-semibold">{name}</h3>
            {available && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Available
              </Badge>
            )}
          </div>
          
          <p className="text-body text-primary font-medium">{skill}</p>
          
          <div className="flex items-center gap-4 text-body text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            {distance && (
              <span className="text-primary font-medium">{distance}</span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-body font-medium">{rating.toFixed(1)}</span>
            <span className="text-body text-muted-foreground">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        {onCall && (
          <Button
            variant="outline"
            size="default"
            className="flex-1"
            onClick={() => onCall(id)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        )}
        {onHire && (
          <Button
            variant="accent"
            size="default"
            className="flex-1"
            onClick={() => onHire(id)}
            disabled={!available}
          >
            Hire Now
          </Button>
        )}
      </div>
    </Card>
  );
}