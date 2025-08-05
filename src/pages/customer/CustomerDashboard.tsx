import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Plus, Users, Briefcase, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Jobs', value: '3', color: 'text-primary' },
    { label: 'Applications', value: '24', color: 'text-accent' },
    { label: 'Completed Jobs', value: '12', color: 'text-warning' },
  ];

  const quickActions = [
    {
      icon: Plus,
      label: 'Post New Job',
      description: 'Hire workers for your needs',
      href: '/customer/post-job',
      color: 'bg-primary text-primary-foreground',
      isPrimary: true
    },
    {
      icon: Users,
      label: 'Browse Workers',
      description: 'Find verified professionals',
      href: '/customer/workers',
      color: 'bg-accent/10 text-accent'
    },
    {
      icon: Briefcase,
      label: 'My Posted Jobs',
      description: 'Manage your job posts',
      href: '/customer/jobs',
      color: 'bg-secondary text-secondary-foreground'
    }
  ];

  const recentActivity = [
    {
      title: 'New Application Received',
      description: 'Plumber for bathroom repair',
      time: '30 min ago',
      type: 'application'
    },
    {
      title: 'Job Completed',
      description: 'Electrical work - Rated 5 stars',
      time: '2 hours ago',
      type: 'completed'
    },
    {
      title: 'Payment Processed',
      description: 'House cleaning - ₹1,200',
      time: '1 day ago',
      type: 'payment'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 bg-card border-b border-border">
        <div className="space-y-2">
          <h1 className="text-heading-lg font-bold">Welcome back!</h1>
          <p className="text-body text-muted-foreground">Manage your jobs and find workers</p>
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
                className={`p-4 cursor-pointer transition-colors ${
                  action.isPrimary 
                    ? 'bg-primary text-primary-foreground hover:bg-primary-hover' 
                    : 'hover:border-primary'
                }`}
                onClick={() => navigate(action.href)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    action.isPrimary ? 'bg-white/20' : action.color
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-md font-medium">{action.label}</h3>
                    <p className={`text-body ${
                      action.isPrimary ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {action.description}
                    </p>
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
        <Card className="p-4 space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-body font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </Card>
      </section>

      <BottomNavigation userType="customer" />
    </div>
  );
}