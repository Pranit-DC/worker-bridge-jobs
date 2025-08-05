import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
];

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  onSkip: () => void;
}

export function LanguageSelector({ onLanguageSelect, onSkip }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageSelect(languageCode);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Globe className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-heading-lg">Choose Your Language</h1>
          <p className="text-body text-muted-foreground">
            Select your preferred language to continue
          </p>
        </div>

        {/* Language Options */}
        <div className="space-y-4">
          {languages.map((language) => (
            <Card
              key={language.code}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedLanguage === language.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelect(language.code)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{language.flag}</span>
                <div className="flex-1">
                  <div className="text-body-lg font-medium">{language.native}</div>
                  <div className="text-body text-muted-foreground">{language.name}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full"
            disabled={!selectedLanguage}
            onClick={() => selectedLanguage && onLanguageSelect(selectedLanguage)}
          >
            Continue
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={onSkip}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}