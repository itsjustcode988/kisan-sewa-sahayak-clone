import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { NavHeader } from '@/components/NavHeader';
import { TrendingUp, TrendingDown, Search, MapPin } from 'lucide-react';

const MarketPage = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('market.all_categories'));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const categories = [
    t('market.all_categories'), 
    t('market.grains'), 
    t('market.pulses'), 
    t('market.oilseeds'), 
    t('market.vegetables'), 
    t('market.fruits'), 
    t('market.spices')
  ];

  const marketData = [
    { 
      name: 'गेहूं', 
      category: 'अनाज',
      currentPrice: 2150, 
      previousPrice: 2100, 
      unit: 'क्विंटल',
      market: 'दिल्ली मंडी',
      quality: 'A ग्रेड'
    },
    { 
      name: 'चावल (बासमती)', 
      category: 'अनाज',
      currentPrice: 3200, 
      previousPrice: 3180, 
      unit: 'क्विंटल',
      market: 'करनाल मंडी',
      quality: 'सुपर'
    },
    { 
      name: 'मक्का', 
      category: 'अनाज',
      currentPrice: 1680, 
      previousPrice: 1695, 
      unit: 'क्विंटल',
      market: 'बिहार मंडी',
      quality: 'स्टैंडर्ड'
    },
    { 
      name: 'अरहर दाल', 
      category: 'दालें',
      currentPrice: 5500, 
      previousPrice: 5450, 
      unit: 'क्विंटल',
      market: 'महाराष्ट्र मंडी',
      quality: 'A ग्रेड'
    },
    { 
      name: 'चना दाल', 
      category: 'दालें',
      currentPrice: 4200, 
      previousPrice: 4180, 
      unit: 'क्विंटल',
      market: 'राजस्थान मंडी',
      quality: 'स्टैंडर्ड'
    },
    { 
      name: 'सरसों', 
      category: 'तिलहन',
      currentPrice: 4800, 
      previousPrice: 4750, 
      unit: 'क्विंटल',
      market: 'हरियाणा मंडी',
      quality: 'A ग्रेड'
    },
    { 
      name: 'सोयाबीन', 
      category: 'तिलहन',
      currentPrice: 3900, 
      previousPrice: 3920, 
      unit: 'क्विंटल',
      market: 'मध्यप्रदेश मंडी',
      quality: 'स्टैंडर्ड'
    },
    { 
      name: 'प्याज', 
      category: 'सब्जियां',
      currentPrice: 1200, 
      previousPrice: 1150, 
      unit: 'क्विंटल',
      market: 'नासिक मंडी',
      quality: 'A ग्रेड'
    },
    { 
      name: 'आलू', 
      category: 'सब्जियां',
      currentPrice: 800, 
      previousPrice: 820, 
      unit: 'क्विंटल',
      market: 'आगरा मंडी',
      quality: 'स्टैंडर्ड'
    },
    { 
      name: 'टमाटर', 
      category: 'सब्जियां',
      currentPrice: 1500, 
      previousPrice: 1400, 
      unit: 'क्विंटल',
      market: 'बैंगलोर मंडी',
      quality: 'A ग्रेड'
    }
  ];

  const filteredData = marketData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === t('market.all_categories') || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('market.title')}</h1>
          <p className="text-gray-600">{t('market.description')}</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t('market.search_placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">{t('market.total_crops')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{filteredData.length}</div>
              <p className="text-xs text-green-600">{t('market.available_prices')}</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">{t('market.average_growth')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">+2.3%</div>
              <p className="text-xs text-blue-600">पिछले सप्ताह से</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">{t('market.highest_price')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">₹5,500</div>
              <p className="text-xs text-orange-600">अरहर दाल</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">{t('market.active_markets')}</CardTitle>
              <MapPin className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">8</div>
              <p className="text-xs text-purple-600">राज्यों में</p>
            </CardContent>
          </Card>
        </div>

        {/* Market Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t('market.today_prices')}</CardTitle>
            <CardDescription>{t('market.fresh_prices')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.map((item, index) => {
                const { change, percentage } = calculateChange(item.currentPrice, item.previousPrice);
                const isPositive = change >= 0;
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.quality} • {item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{item.market}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800">
                        ₹{item.currentPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">प्रति {item.unit}</div>
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isPositive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium">
                          {isPositive ? '+' : ''}₹{Math.abs(change)} ({isPositive ? '+' : ''}{percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Market Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>बाजार सुझाव</CardTitle>
            <CardDescription>बेहतर मूल्य के लिए सलाह</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">{t('market.selling_advice')}</h4>
                <p className="text-sm text-green-700">गेहूं और सरसों की कीमतें बढ़ रही हैं। अगले 2-3 दिन में बेचना फायदेमंद होगा।</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">{t('market.quality_focus')}</h4>
                <p className="text-sm text-blue-700">A ग्रेड की फसल का मूल्य अधिक मिल रहा है। फसल की सफाई और ग्रेडिंग पर ध्यान दें।</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-2">{t('market.market_selection')}</h4>
                <p className="text-sm text-orange-700">नजदीकी मंडी में भाव कम है तो दूसरी मंडी का भाव भी जांचें। परिवहन खर्च जोड़कर तुलना करें।</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">{t('market.storage_advice')}</h4>
                <p className="text-sm text-purple-700">दाल की कीमतें स्थिर हैं। उचित भंडारण कर 2-3 महीने बाद बेचना बेहतर हो सकता है।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPage;
