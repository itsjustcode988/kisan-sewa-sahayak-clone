
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { NavHeader } from '@/components/NavHeader';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  Sunrise,
  Sunset
} from 'lucide-react';

const WeatherPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const currentWeather = {
    location: 'नई दिल्ली, भारत',
    temp: 28,
    condition: 'धूप',
    icon: Sun,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    sunrise: '06:15',
    sunset: '18:45'
  };

  const weeklyForecast = [
    { day: 'आज', temp: { high: 32, low: 22 }, condition: 'धूप', icon: Sun, rain: 0 },
    { day: 'कल', temp: { high: 30, low: 20 }, condition: 'आंशिक बादल', icon: Cloud, rain: 10 },
    { day: 'परसों', temp: { high: 28, low: 18 }, condition: 'बारिश', icon: CloudRain, rain: 80 },
    { day: 'गुरुवार', temp: { high: 26, low: 17 }, condition: 'भारी बारिश', icon: CloudRain, rain: 90 },
    { day: 'शुक्रवार', temp: { high: 29, low: 19 }, condition: 'बादल', icon: Cloud, rain: 20 },
    { day: 'शनिवार', temp: { high: 31, low: 21 }, condition: 'धूप', icon: Sun, rain: 0 },
    { day: 'रविवार', temp: { high: 33, low: 23 }, condition: 'धूप', icon: Sun, rain: 0 }
  ];

  const farmingAdvice = [
    {
      title: 'सिंचाई सलाह',
      advice: 'आज धूप अच्छी है। सुबह या शाम को सिंचाई करें।',
      priority: 'high'
    },
    {
      title: 'कीटनाशक छिड़काव',
      advice: 'कल बारिश की संभावना है। आज छिड़काव न करें।',
      priority: 'medium'
    },
    {
      title: 'फसल कटाई',
      advice: 'अगले 2 दिन बारिश होगी। पकी फसल की कटाई जल्दी करें।',
      priority: 'urgent'
    }
  ];

  if (!isAuthenticated) {
    return null;
  }

  const CurrentIcon = currentWeather.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">मौसम की जानकारी</h1>
          <p className="text-gray-600">आज का मौसम और साप्ताहिक पूर्वानुमान</p>
        </div>

        {/* Current Weather */}
        <Card className="mb-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">{currentWeather.location}</CardTitle>
            <CardDescription className="text-blue-100">वर्तमान मौसम</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CurrentIcon className="h-16 w-16 text-yellow-300" />
                <div>
                  <div className="text-4xl font-bold">{currentWeather.temp}°C</div>
                  <div className="text-blue-100">{currentWeather.condition}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4" />
                  <span>{currentWeather.humidity}% नमी</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4" />
                  <span>{currentWeather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{currentWeather.visibility} km</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <span>UV {currentWeather.uvIndex}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-400">
              <div className="flex items-center space-x-2">
                <Sunrise className="h-4 w-4" />
                <span>सूर्योदय: {currentWeather.sunrise}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sunset className="h-4 w-4" />
                <span>सूर्यास्त: {currentWeather.sunset}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Forecast */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>7 दिन का पूर्वानुमान</CardTitle>
                <CardDescription>आगामी सप्ताह का मौसम</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyForecast.map((day, index) => {
                    const DayIcon = day.icon;
                    return (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedDay === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedDay(index)}
                      >
                        <div className="flex items-center space-x-3">
                          <DayIcon className={`h-6 w-6 ${
                            day.condition.includes('बारिश') ? 'text-blue-600' : 
                            day.condition.includes('धूप') ? 'text-yellow-500' : 'text-gray-500'
                          }`} />
                          <div>
                            <div className="font-medium">{day.day}</div>
                            <div className="text-sm text-gray-600">{day.condition}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-blue-600">{day.rain}% बारिश</div>
                          <div className="text-right">
                            <div className="font-medium">{day.temp.high}°</div>
                            <div className="text-sm text-gray-500">{day.temp.low}°</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Farming Advice */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>कृषि सलाह</CardTitle>
                <CardDescription>मौसम के अनुसार खेती की सलाह</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmingAdvice.map((advice, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        advice.priority === 'urgent' ? 'border-red-500 bg-red-50' :
                        advice.priority === 'high' ? 'border-orange-500 bg-orange-50' :
                        'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className={`font-medium text-sm ${
                        advice.priority === 'urgent' ? 'text-red-700' :
                        advice.priority === 'high' ? 'text-orange-700' :
                        'text-blue-700'
                      }`}>
                        {advice.title}
                      </div>
                      <div className="text-sm text-gray-700 mt-1">
                        {advice.advice}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-orange-600">मौसम चेतावनी</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="font-medium text-yellow-800">तेज़ हवा चेतावनी</div>
                    <div className="text-sm text-yellow-700">कल शाम तेज़ हवा चलने की संभावना</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-800">भारी बारिश</div>
                    <div className="text-sm text-blue-700">परसों से लगातार बारिश हो सकती है</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
