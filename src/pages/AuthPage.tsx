
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Sprout, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [mode, setMode] = useState(searchParams.get('mode') || 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(formData.name, formData.email, formData.password, formData.phone);
      }

      if (success) {
        toast({
          title: mode === 'login' ? t('auth.login_success') : t('auth.signup_success'),
          description: mode === 'login' ? t('auth.welcome_message') : t('auth.account_created'),
        });
        navigate('/dashboard');
      } else {
        toast({
          title: t('auth.error'),
          description: t('auth.check_credentials'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.something_wrong'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-green-600 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <Sprout className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-800">{t('landing.title')}</h1>
          <p className="text-green-600">{t('landing.subtitle')}</p>
        </div>

        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800">
              {mode === 'login' ? t('auth.login_title') : t('auth.signup_title')}
            </CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? t('auth.login_description')
                : t('auth.signup_description')
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">{t('auth.full_name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('auth.name_placeholder')}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')} *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('auth.email_placeholder')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('auth.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t('auth.phone_placeholder')}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')} *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.password_placeholder')}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="border-green-200 focus:border-green-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? t('auth.please_wait') : mode === 'login' ? t('auth.login_button') : t('auth.signup_button')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? t('auth.new_user') : t('auth.existing_user')}
                {' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  {mode === 'login' ? t('auth.register_here') : t('auth.login_here')}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
