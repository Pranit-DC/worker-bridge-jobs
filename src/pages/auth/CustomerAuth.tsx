import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type AuthMethod = 'email' | 'phone';
type Step = 'method' | 'credentials' | 'otp';

export default function CustomerAuth() {
  const [step, setStep] = useState<Step>('method');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMethodSelect = (method: AuthMethod) => {
    setAuthMethod(method);
    setStep('credentials');
  };

  const handleAuthSubmit = async () => {
    setIsLoading(true);
    
    if (authMethod === 'email') {
      // Simulate API call for email auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Store user type in localStorage for demo
      localStorage.setItem('userType', 'customer');
      navigate('/customer');
    } else {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `Verification code sent to +91 ${phone}`,
      });
    }
    
    setIsLoading(false);
  };

  const handleOTPVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Store user type in localStorage for demo
    localStorage.setItem('userType', 'customer');
    navigate('/customer');
  };

  const goBack = () => {
    if (step === 'otp') setStep('credentials');
    else if (step === 'credentials') setStep('method');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-heading-md font-semibold">Customer {isLogin ? 'Login' : 'Signup'}</h1>
      </header>

      <div className="flex flex-col justify-center items-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md space-y-8">
          {step === 'method' && (
            <>
              <div className="text-center space-y-4">
                <h2 className="text-heading-lg">Choose Login Method</h2>
                <p className="text-body text-muted-foreground">
                  How would you like to sign in?
                </p>
              </div>

              <div className="space-y-4">
                <Card
                  className="p-6 cursor-pointer hover:border-primary transition-colors border-2"
                  onClick={() => handleMethodSelect('email')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-heading-md font-medium">Email & Password</h3>
                      <p className="text-body text-muted-foreground">
                        Sign in with your email address
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-6 cursor-pointer hover:border-primary transition-colors border-2"
                  onClick={() => handleMethodSelect('phone')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-heading-md font-medium">Phone Number</h3>
                      <p className="text-body text-muted-foreground">
                        Sign in with OTP verification
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {step === 'credentials' && (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-heading-lg">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-body text-muted-foreground">
                  {authMethod === 'email' 
                    ? 'Enter your email and password'
                    : 'Enter your phone number'
                  }
                </p>
              </div>

              <div className="space-y-4">
                {authMethod === 'email' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-lg bg-muted">
                        <span className="text-body">+91</span>
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="rounded-l-none"
                        maxLength={10}
                      />
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAuthSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Please wait...' : (authMethod === 'email' ? 'Continue' : 'Send OTP')}
                </Button>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {step === 'otp' && (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-heading-lg">Enter Verification Code</h2>
                <p className="text-body text-muted-foreground">
                  We sent a 6-digit code to +91 {phone}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleOTPVerify}
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}