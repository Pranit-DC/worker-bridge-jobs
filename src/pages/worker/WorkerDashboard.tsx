import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Search, Briefcase, IndianRupee, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WorkerDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Jobs Applied', value: '12', color: 'text-primary' },
    { label: 'Jobs Completed', value: '8', color: 'text-accent' },
    { label: 'This Month Earnings', value: '₹15,200', color: 'text-warning' },
  ];

  const quickActions = [
    {
      icon: Search,
      label: 'Browse Jobs',
      description: 'Find new opportunities',
      href: '/worker/browse',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Briefcase,
      label: 'My Jobs',
      description: 'View your applications',
      href: '/worker/jobs',
      color: 'bg-accent/10 text-accent'
    },
    {
      icon: IndianRupee,
      label: 'Earnings',
      description: 'Track your income',
      href: '/worker/earnings',
      color: 'bg-warning/10 text-warning'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 bg-card border-b border-border">
        <div className="space-y-2">
          <h1 className="text-heading-lg font-bold">Welcome back!</h1>
          <p className="text-body text-muted-foreground">Ready to find your next job?</p>
        </div>
      </header>

      {/* Stats */}
      <section className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="p-3 text-center">
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="p-4">
        <h2 className="text-heading-md font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:border-primary transition-colors"
                onClick={() => navigate(action.href)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-md font-medium">{action.label}</h3>
                    <p className="text-body text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="p-4">
        <h2 className="text-heading-md font-semibold mb-4">Recent Activity</h2>
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-body font-medium">Application Submitted</p>
              <p className="text-sm text-muted-foreground">Plumber needed - Sector 15</p>
            </div>
            <span className="text-sm text-muted-foreground">2h ago</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-body font-medium">Payment Received</p>
              <p className="text-sm text-muted-foreground">Electrical work - ₹2,500</p>
            </div>
            <span className="text-sm text-muted-foreground">1d ago</span>
          </div>
        </Card>
      </section>

      <BottomNavigation userType="worker" />
    </div>
  );
}