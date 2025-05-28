import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { NavHeader } from '@/components/NavHeader';
import { Award, Calendar, Users, DollarSign, FileText, ExternalLink } from 'lucide-react';

const SchemesPage = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(t('schemes.all_categories'));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const categories = [
    t('schemes.all_categories'), 
    t('schemes.crop_insurance'), 
    t('schemes.subsidy'), 
    t('schemes.loan'), 
    t('schemes.farmer_welfare'), 
    t('schemes.technical_support')
  ];

  const schemes = [
    {
      title: 'प्रधानमंत्री फसल बीमा योजना',
      category: 'फसल बीमा',
      description: 'फसल के नुकसान की स्थिति में किसानों को बीमा कवर प्रदान करना',
      benefits: ['प्राकृतिक आपदा से सुरक्षा', 'कम प्रीमियम दर', 'तुरंत क्लेम सेटलमेंट'],
      eligibility: 'सभी किसान (भूमिधारक और गैर-भूमिधारक)',
      amount: '₹2 लाख तक',
      deadline: '31 दिसंबर 2024',
      status: 'सक्रिय',
      documents: ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज', 'बुआई प्रमाण पत्र']
    },
    {
      title: 'किसान सम्मान निधि योजना',
      category: 'किसान कल्याण',
      description: 'छोटे और सीमांत किसानों को प्रतिवर्ष आर्थिक सहायता',
      benefits: ['₹6000 प्रति वर्ष', 'सीधे बैंक खाते में', 'तीन किस्तों में भुगतान'],
      eligibility: '2 हेक्टेयर तक भूमि वाले किसान',
      amount: '₹6,000/वर्ष',
      deadline: 'चालू',
      status: 'सक्रिय',
      documents: ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज']
    },
    {
      title: 'कृषि यंत्र अनुदान योजना',
      category: 'सब्सिडी',
      description: 'आधुनिक कृषि यंत्रों की खरीद पर सब्सिडी',
      benefits: ['50% तक सब्सिडी', 'आधुनिक यंत्र', 'उत्पादकता वृद्धि'],
      eligibility: 'सभी श्रेणी के किसान',
      amount: '₹1 लाख तक',
      deadline: '15 जनवरी 2025',
      status: 'सक्रिय',
      documents: ['आधार कार्ड', 'बैंक पासबुक', 'कृषि भूमि दस्तावेज', 'आय प्रमाण पत्र']
    },
    {
      title: 'किसान क्रेडिट कार्ड योजना',
      category: 'ऋण',
      description: 'किसानों को कम ब्याज दर पर ऋण सुविधा',
      benefits: ['4% ब्याज दर', 'आसान किस्तें', 'कोई गारंटी नहीं'],
      eligibility: 'खेती करने वाले सभी किसान',
      amount: '₹3 लाख तक',
      deadline: 'चालू',
      status: 'सक्रिय',
      documents: ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज', 'आय प्रमाण']
    },
    {
      title: 'सॉयल हेल्थ कार्ड स्कीम',
      category: 'तकनीकी सहायता',
      description: 'मिट्टी की जांच और उर्वरक की सलाह',
      benefits: ['निःशुल्क मिट्टी जांच', 'उर्वरक सुझाव', 'उत्पादकता बढ़ाने की सलाह'],
      eligibility: 'सभी किसान',
      amount: 'निःशुल्क',
      deadline: 'चालू',
      status: 'सक्रिय',
      documents: ['आधार कार्ड', 'भूमि दस्तावेज']
    },
    {
      title: 'ऑर्गेनिक फार्मिंग प्रमोशन स्कीम',
      category: 'सब्सिडी',
      description: 'जैविक खेती को बढ़ावा देने के लिए सहायता',
      benefits: ['जैविक खाद पर सब्सिडी', 'सर्टिफिकेशन सहायता', 'बेहतर मूल्य'],
      eligibility: 'जैविक खेती करने वाले किसान',
      amount: '₹50,000/हेक्टेयर',
      deadline: '28 फरवरी 2025',
      status: 'सक्रिय',
      documents: ['आधार कार्ड', 'भूमि दस्तावेज', 'जैविक खेती प्रमाण पत्र']
    }
  ];

  const filteredSchemes = schemes.filter(scheme => 
    selectedCategory === t('schemes.all_categories') || scheme.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    return status === 'सक्रिय' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('schemes.title')}</h1>
          <p className="text-gray-600">{t('schemes.description')}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">{t('schemes.total_schemes')}</CardTitle>
              <Award className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{schemes.length}</div>
              <p className="text-xs text-green-600">{t('schemes.available_schemes')}</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">{t('schemes.active_schemes')}</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{schemes.filter(s => s.status === 'सक्रिय').length}</div>
              <p className="text-xs text-blue-600">{t('schemes.open_applications')}</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">{t('schemes.total_benefit')}</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">₹12.5L+</div>
              <p className="text-xs text-orange-600">{t('schemes.max_benefit')}</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">{t('schemes.application_time')}</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">7-15</div>
              <p className="text-xs text-purple-600">{t('schemes.processing_days')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="mb-8">
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>

        {/* Schemes List */}
        <div className="grid gap-6">
          {filteredSchemes.map((scheme, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-800 mb-2">{scheme.title}</CardTitle>
                    <CardDescription className="text-gray-600">{scheme.description}</CardDescription>
                    <div className="flex items-center space-x-3 mt-3">
                      <Badge variant="secondary">{scheme.category}</Badge>
                      <Badge className={getStatusColor(scheme.status)}>{scheme.status}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{scheme.amount}</div>
                    <div className="text-sm text-gray-500">{t('schemes.max_benefit')}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{t('schemes.main_benefits')}:</h4>
                    <ul className="space-y-1">
                      {scheme.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{t('schemes.required_documents')}:</h4>
                    <ul className="space-y-1">
                      {scheme.documents.map((doc, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <FileText className="w-3 h-3 text-blue-500 mr-2" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">{t('schemes.eligibility')}: </span>
                      <span className="text-gray-600">{scheme.eligibility}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{t('schemes.deadline')}: </span>
                      <span className="text-gray-600">{scheme.deadline}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('schemes.apply_now')}
                  </Button>
                  <Button variant="outline">
                    {t('schemes.read_more')}
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    {t('schemes.download_guide')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">{t('schemes.need_help')}</CardTitle>
            <CardDescription className="text-blue-600">
              {t('schemes.help_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="outline" className="border-blue-300 text-blue-700">
                {t('schemes.helpline')}
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700">
                {t('schemes.chat_support')}
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700">
                {t('schemes.find_office')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchemesPage;
