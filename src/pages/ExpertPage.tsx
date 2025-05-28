
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { NavHeader } from '@/components/NavHeader';
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Clock, 
  Star, 
  Send,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

const ExpertPage = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const experts = [
    {
      id: 1,
      name: 'डॉ. राजेश शर्मा',
      specialization: 'फसल रोग विशेषज्ञ',
      experience: '15 साल का अनुभव',
      rating: 4.8,
      avatar: '/placeholder.svg',
      available: true,
      languages: ['हिंदी', 'अंग्रेजी'],
      location: 'नई दिल्ली'
    },
    {
      id: 2,
      name: 'प्रो. सुनीता पटेल',
      specialization: 'मिट्टी विज्ञान',
      experience: '12 साल का अनुभव',
      rating: 4.9,
      avatar: '/placeholder.svg',
      available: false,
      languages: ['हिंदी', 'गुजराती'],
      location: 'अहमदाबाद'
    },
    {
      id: 3,
      name: 'डॉ. अमित कुमार',
      specialization: 'जैविक खेती',
      experience: '10 साल का अनुभव',
      rating: 4.7,
      avatar: '/placeholder.svg',
      available: true,
      languages: ['हिंदी', 'अंग्रेजी'],
      location: 'जयपुर'
    }
  ];

  const consultations = [
    {
      id: 1,
      date: '15 नवंबर 2024',
      expert: 'डॉ. राजेश शर्मा',
      topic: 'गेहूं में पीला रतुआ रोग',
      status: 'पूर्ण',
      rating: 5
    },
    {
      id: 2,
      date: '10 नवंबर 2024',
      expert: 'प्रो. सुनीता पटेल',
      topic: 'मिट्टी की जांच',
      status: 'आगामी',
      rating: null
    }
  ];

  const handleSendMessage = () => {
    if (question.trim()) {
      setChatMessages([...chatMessages, { text: question, sender: 'user' }]);
      setQuestion('');
      // Simulate expert response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: 'आपका प्रश्न बहुत अच्छा है। इस समस्या का समाधान है...', 
          sender: 'expert' 
        }]);
      }, 1000);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('expert.title')}</h1>
          <p className="text-gray-600">{t('expert.description')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experts List */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('expert.available_experts')}</CardTitle>
                <CardDescription>{t('expert.choose_expert')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experts.map((expert) => (
                    <div 
                      key={expert.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedExpert?.id === expert.id ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedExpert(expert)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{expert.name}</h3>
                            <p className="text-sm text-gray-600">{expert.specialization}</p>
                            <p className="text-xs text-gray-500">{expert.experience}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm ml-1">{expert.rating}</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                {expert.location}
                              </div>
                            </div>
                            <div className="flex space-x-1 mt-2">
                              {expert.languages.map((lang, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant={expert.available ? "default" : "secondary"}>
                            {expert.available ? t('expert.available') : t('expert.busy')}
                          </Badge>
                          {expert.available && (
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {t('expert.chat')}
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-1" />
                                {t('expert.call')}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Question */}
            <Card>
              <CardHeader>
                <CardTitle>{t('expert.quick_question')}</CardTitle>
                <CardDescription>{t('expert.question_description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea 
                    placeholder={t('expert.question_placeholder')}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleSendMessage} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    {t('expert.send_question')}
                  </Button>
                </div>

                {/* Chat Messages */}
                {chatMessages.length > 0 && (
                  <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
                    {chatMessages.map((message, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-green-100 ml-8' 
                            : 'bg-gray-100 mr-8'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('expert.your_sessions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consultations.map((consultation) => (
                    <div key={consultation.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={consultation.status === 'पूर्ण' ? 'default' : 'secondary'}>
                          {consultation.status === 'पूर्ण' ? t('expert.completed') : t('expert.upcoming')}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {consultation.date}
                        </div>
                      </div>
                      <p className="font-medium text-sm">{consultation.topic}</p>
                      <p className="text-xs text-gray-500">विशेषज्ञ: {consultation.expert}</p>
                      {consultation.rating && (
                        <div className="flex items-center mt-2">
                          {[...Array(consultation.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('expert.book_consultation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Video className="h-4 w-4 mr-1" />
                      {t('expert.video_call')}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      {t('expert.phone_call')}
                    </Button>
                  </div>
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{t('expert.next_available')}</p>
                    <p className="font-medium">आज शाम 4:00 बजे</p>
                  </div>
                  <Button className="w-full">
                    {t('expert.book_now')}
                  </Button>
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
