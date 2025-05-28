
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { NavHeader } from '@/components/NavHeader';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Star, 
  Phone, 
  Video, 
  MessageCircle, 
  Calendar,
  Clock,
  Award,
  BookOpen
} from 'lucide-react';

const ExpertPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [consultationType, setConsultationType] = useState('video');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const experts = [
    {
      id: 1,
      name: 'डॉ. राम प्रसाद शर्मा',
      specialty: 'फसल रोग विशेषज्ञ',
      experience: 15,
      rating: 4.8,
      consultations: 1200,
      languages: ['हिंदी', 'अंग्रेजी', 'पंजाबी'],
      nextAvailable: 'आज 2:00 PM',
      feeVideo: 300,
      feePhone: 200,
      feeMessage: 100,
      specializations: ['गेहूं', 'चावल', 'कीट नियंत्रण', 'जैविक खेती'],
      image: '👨‍🌾'
    },
    {
      id: 2,
      name: 'प्रो. सुनीता पटेल',
      specialty: 'मिट्टी एवं उर्वरक विशेषज्ञ',
      experience: 20,
      rating: 4.9,
      consultations: 950,
      languages: ['हिंदी', 'गुजराती', 'अंग्रेजी'],
      nextAvailable: 'कल 10:00 AM',
      feeVideo: 400,
      feePhone: 250,
      feeMessage: 150,
      specializations: ['मिट्टी परीक्षण', 'उर्वरक सलाह', 'जैविक खाद', 'पोषक तत्व'],
      image: '👩‍🔬'
    },
    {
      id: 3,
      name: 'डॉ. अमित कुमार',
      specialty: 'बागवानी विशेषज्ञ',
      experience: 12,
      rating: 4.7,
      consultations: 800,
      languages: ['हिंदी', 'अंग्रेजी'],
      nextAvailable: 'आज 4:30 PM',
      feeVideo: 350,
      feePhone: 200,
      feeMessage: 120,
      specializations: ['फल उत्पादन', 'सब्जी उत्पादन', 'फूलों की खेती', 'ग्रीनहाउस'],
      image: '👨‍🍳'
    },
    {
      id: 4,
      name: 'डॉ. प्रिया गुप्ता',
      specialty: 'पशुपालन विशेषज्ञ',
      experience: 18,
      rating: 4.8,
      consultations: 1100,
      languages: ['हिंदी', 'अंग्रेजी', 'बंगाली'],
      nextAvailable: 'कल 11:30 AM',
      feeVideo: 300,
      feePhone: 200,
      feeMessage: 100,
      specializations: ['गाय-भैंस', 'पोल्ट्री', 'बकरी पालन', 'चारा उत्पादन'],
      image: '👩‍⚕️'
    }
  ];

  const recentConsultations = [
    {
      expert: 'डॉ. राम प्रसाद शर्मा',
      topic: 'गेहूं में पीले धब्बे की समस्या',
      date: '2 दिन पहले',
      rating: 5,
      status: 'पूर्ण'
    },
    {
      expert: 'प्रो. सुनीता पटेल',
      topic: 'मिट्टी में नाइट्रोजन की कमी',
      date: '1 सप्ताह पहले',
      rating: 4,
      status: 'पूर्ण'
    }
  ];

  const handleBookConsultation = () => {
    if (!selectedExpert) {
      toast({
        title: 'कृपया विशेषज्ञ चुनें',
        description: 'पहले किसी विशेषज्ञ को चुनें',
        variant: 'destructive'
      });
      return;
    }

    if (!query.trim()) {
      toast({
        title: 'कृपया अपनी समस्या बताएं',
        description: 'सलाह के लिए अपनी समस्या या प्रश्न लिखें',
        variant: 'destructive'
      });
      return;
    }

    const expert = experts.find(e => e.id === selectedExpert);
    toast({
      title: 'बुकिंग सफल',
      description: `${expert?.name} के साथ ${consultationType === 'video' ? 'वीडियो' : consultationType === 'phone' ? 'फोन' : 'मैसेज'} परामर्श बुक हो गया`,
    });

    setSelectedExpert(null);
    setQuery('');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">विशेषज्ञ सलाह</h1>
          <p className="text-gray-600">कृषि विशेषज्ञों से सीधी सलाह प्राप्त करें</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">कुल विशेषज्ञ</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{experts.length}</div>
              <p className="text-xs text-green-600">उपलब्ध विशेषज्ञ</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">औसत रेटिंग</CardTitle>
              <Star className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">4.8</div>
              <p className="text-xs text-blue-600">5 में से</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">कुल परामर्श</CardTitle>
              <MessageCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">4,050+</div>
              <p className="text-xs text-orange-600">सफल सलाह</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">तुरंत उपलब्ध</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">2</div>
              <p className="text-xs text-purple-600">विशेषज्ञ</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experts List */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>हमारे विशेषज्ञ</CardTitle>
                <CardDescription>अनुभवी कृषि विशेषज्ञों से सलाह लें</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-6">
              {experts.map((expert) => (
                <Card 
                  key={expert.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedExpert === expert.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                  }`}
                  onClick={() => setSelectedExpert(expert.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{expert.image}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">{expert.name}</h3>
                            <p className="text-gray-600">{expert.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{expert.rating}</span>
                            </div>
                            <p className="text-sm text-gray-500">{expert.consultations} परामर्श</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Award className="h-4 w-4" />
                            <span>{expert.experience} साल अनुभव</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{expert.nextAvailable}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {expert.specializations.map((spec, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {expert.languages.map((lang, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Video className="h-4 w-4 text-blue-600" />
                            <span>₹{expert.feeVideo}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4 text-green-600" />
                            <span>₹{expert.feePhone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4 text-purple-600" />
                            <span>₹{expert.feeMessage}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Panel */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>परामर्श बुक करें</CardTitle>
                <CardDescription>
                  {selectedExpert 
                    ? `${experts.find(e => e.id === selectedExpert)?.name} के साथ`
                    : 'कृपया विशेषज्ञ चुनें'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {selectedExpert && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">परामर्श का प्रकार</label>
                      <div className="space-y-2">
                        {['video', 'phone', 'message'].map((type) => {
                          const expert = experts.find(e => e.id === selectedExpert);
                          const fee = type === 'video' ? expert?.feeVideo : 
                                     type === 'phone' ? expert?.feePhone : expert?.feeMessage;
                          const icon = type === 'video' ? Video : type === 'phone' ? Phone : MessageCircle;
                          const label = type === 'video' ? 'वीडियो कॉल' : 
                                       type === 'phone' ? 'फोन कॉल' : 'मैसेज चैट';
                          
                          return (
                            <label key={type} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="consultationType"
                                value={type}
                                checked={consultationType === type}
                                onChange={(e) => setConsultationType(e.target.value)}
                                className="text-green-600"
                              />
                              <div className="flex items-center space-x-2">
                                {React.createElement(icon, { className: "h-4 w-4" })}
                                <span>{label}</span>
                                <span className="text-green-600 font-medium">₹{fee}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="query" className="text-sm font-medium mb-2 block">
                        आपकी समस्या या प्रश्न
                      </label>
                      <Textarea
                        id="query"
                        placeholder="अपनी फसल की समस्या या प्रश्न विस्तार से लिखें..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button 
                      onClick={handleBookConsultation}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      परामर्श बुक करें
                    </Button>
                  </>
                )}

                {!selectedExpert && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>कृपया पहले किसी विशेषज्ञ को चुनें</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Consultations */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">पिछले परामर्श</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentConsultations.map((consultation, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm text-gray-800">{consultation.topic}</div>
                      <div className="text-xs text-gray-600 mt-1">{consultation.expert}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{consultation.date}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < consultation.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertPage;
