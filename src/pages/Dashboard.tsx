
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { NavHeader } from '@/components/NavHeader';
import { 
  Cloud, 
  TrendingUp, 
  Award, 
  Users, 
  Thermometer, 
  Droplets, 
  Wind,
  Sun
} from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const services = [
    {
      title: 'मौसम की जानकारी',
      description: 'आज का मौसम और अगले 7 दिनों का पूर्वानुमान',
      icon: Cloud,
      link: '/weather',
      color: 'bg-blue-500'
    },
    {
      title: 'बाजार भाव',
      description: 'सभी फसलों के आज के बाजार भाव देखें',
      icon: TrendingUp,
      link: '/market',
      color: 'bg-green-500'
    },
    {
      title: 'सरकारी योजनाएं',
      description: 'किसानों के लिए नवीनतम सरकारी योजनाएं',
      icon: Award,
      link: '/schemes',
      color: 'bg-orange-500'
    },
    {
      title: 'विशेषज्ञ सलाह',
      description: 'कृषि विशेषज्ञों से सीधी बातचीत',
      icon: Users,
      link: '/expert',
      color: 'bg-purple-500'
    }
  ];

  const todayWeather = {
    temp: '28°C',
    condition: 'धूप',
    humidity: '65%',
    wind: '12 km/h'
  };

  const marketHighlights = [
    { crop: 'गेहूं', price: '₹2,150/क्विंटल', change: '+2.5%' },
    { crop: 'चावल', price: '₹1,850/क्विंटल', change: '+1.2%' },
    { crop: 'मक्का', price: '₹1,680/क्विंटल', change: '-0.8%' }
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            नमस्कार, {user?.name}! 🌾
          </h1>
          <p className="text-gray-600">
            आज आपकी खेती के लिए क्या नया है, देखते हैं
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">आज का तापमान</CardTitle>
              <Thermometer className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{todayWeather.temp}</div>
              <p className="text-xs text-blue-600">{todayWeather.condition}</p>
            </CardContent>
          </Card>

          <Card className="border-cyan-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-600">नमी</CardTitle>
              <Droplets className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-700">{todayWeather.humidity}</div>
              <p className="text-xs text-cyan-600">सामान्य स्तर</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">हवा की गति</CardTitle>
              <Wind className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{todayWeather.wind}</div>
              <p className="text-xs text-green-600">मध्यम</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">यूवी इंडेक्स</CardTitle>
              <Sun className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">6</div>
              <p className="text-xs text-orange-600">मध्यम</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to={service.link}>
                  <CardHeader className="text-center">
                    <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-gray-800">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Market Highlights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>आज के बाजार भाव</span>
            </CardTitle>
            <CardDescription>प्रमुख फसलों की वर्तमान कीमतें</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {marketHighlights.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.crop}</p>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/market">सभी भाव देखें</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>आज की सलाह</CardTitle>
            <CardDescription>आज के मौसम के अनुसार खेती की सलाह</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-gray-700">आज धूप अच्छी है, फसल की सिंचाई के लिए उपयुक्त समय है।</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700">नमी का स्तर अच्छा है, कीटनाशक का छिड़काव न करें।</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-gray-700">गेहूं की कीमत बढ़ रही है, बेचने का अच्छा समय है।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
