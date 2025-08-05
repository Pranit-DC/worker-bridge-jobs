import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function WorkerAuth() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep('otp');
    
    toast({
      title: "OTP Sent",
      description: `Verification code sent to +91 ${phone}`,
    });
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Store user type in localStorage for demo
    localStorage.setItem('userType', 'worker');
    navigate('/worker');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => step === 'otp' ? setStep('phone') : navigate('/')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-heading-md font-semibold">Worker Login</h1>
      </header>

      <div className="flex flex-col justify-center items-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md space-y-8">
          {/* Icon */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
              <Phone className="w-8 h-8 text-accent" />
            </div>
          </div>

          {step === 'phone' ? (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-heading-lg">Enter Your Phone Number</h2>
                <p className="text-body text-muted-foreground">
                  We'll send you a verification code to sign in
                </p>
              </div>

              <div className="space-y-4">
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
                      className="rounded-l-none text-lg"
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleSendOTP}
                  disabled={isLoading || phone.length !== 10}
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </div>
            </Card>
          ) : (
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
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full"
                  onClick={() => setStep('phone')}
                >
                  Change Phone Number
                </Button>
              </div>
            </Card>
          )}

          <div className="text-center">
            <p className="text-body text-muted-foreground">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}