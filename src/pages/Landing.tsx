import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Users, Briefcase, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import heroImage from '@/assets/workers-hero.png';

export default function Landing() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };

  const handleSkipLanguage = () => {
    setShowLanguageSelector(false);
  };

  const features = [
    {
      icon: Users,
      title: 'Verified Workers',
      description: 'All workers are background verified for your safety and peace of mind'
    },
    {
      icon: Briefcase,
      title: 'Find Work Easily',
      description: 'Simple job matching based on your skills and location'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and transparent payment system for all completed work'
    }
  ];

  if (showLanguageSelector) {
    return (
      <LanguageSelector
        onLanguageSelect={handleLanguageSelect}
        onSkip={handleSkipLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Rozgaar Setu" className="w-10 h-10" />
            <h1 className="text-heading-lg font-bold text-primary">Rozgaar Setu</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLanguageSelector(true)}
          >
            Language
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <img
            src={heroImage}
            alt="Workers"
            className="w-full max-w-sm mx-auto rounded-2xl"
          />
          
          <div className="space-y-4">
            <h2 className="text-heading-lg">
              Connect with <span className="text-primary">Trusted Workers</span>
            </h2>
            <p className="text-body text-muted-foreground">
              Find verified blue-collar professionals or get hired for jobs in your area
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="max-w-md mx-auto space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-4 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-heading-md font-medium mb-2">{feature.title}</h3>
                    <p className="text-body text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* User Type Selection */}
      <section className="px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <h3 className="text-heading-md text-center">How do you want to use Rozgaar Setu?</h3>
          
          <div className="space-y-4">
            <Card
              className="p-6 cursor-pointer hover:border-primary transition-colors border-2"
              onClick={() => navigate('/auth/worker')}
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h4 className="text-heading-md font-semibold">I'm a Worker</h4>
                  <p className="text-body text-muted-foreground">
                    Find jobs in your area and connect with customers
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:border-primary transition-colors border-2"
              onClick={() => navigate('/auth/customer')}
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-heading-md font-semibold">I need Workers</h4>
                  <p className="text-body text-muted-foreground">
                    Post jobs and hire verified professionals
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 text-center">
        <p className="text-body text-muted-foreground">
          Join thousands of satisfied users on Rozgaar Setu
        </p>
      </footer>
    </div>
  );
}