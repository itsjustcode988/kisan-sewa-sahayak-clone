
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sprout, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
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
          title: mode === 'login' ? 'सफलतापूर्वक लॉगिन' : 'खाता बना दिया गया',
          description: mode === 'login' ? 'आपका स्वागत है!' : 'आपका खाता सफलतापूर्वक बन गया है',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'त्रुटि',
          description: 'कृपया अपनी जानकारी जांचें और पुनः प्रयास करें',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'त्रुटि',
        description: 'कुछ गलत हुआ है। कृपया पुनः प्रयास करें।',
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
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-green-600 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <Sprout className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-800">सार्थी किसान सहायक</h1>
          <p className="text-green-600">आपका डिजिटल कृषि साथी</p>
        </div>

        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800">
              {mode === 'login' ? 'लॉगिन करें' : 'नया खाता बनाएं'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? 'अपने खाते में प्रवेश करें' 
                : 'सार्थी परिवार में शामिल हों'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">पूरा नाम *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="राम प्रसाद"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">ईमेल पता *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ram@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="phone">मोबाइल नंबर</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">पासवर्ड *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="आपका पासवर्ड"
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
                {isLoading ? 'कृपया प्रतीक्षा करें...' : mode === 'login' ? 'लॉगिन करें' : 'खाता बनाएं'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? 'नया उपयोगकर्ता हैं?' : 'पहले से खाता है?'}
                {' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  {mode === 'login' ? 'यहाँ रजिस्टर करें' : 'यहाँ लॉगिन करें'}
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
