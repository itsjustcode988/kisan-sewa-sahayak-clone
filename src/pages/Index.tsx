
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Sprout, Cloud, TrendingUp, Award, Users, Phone } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    // Trigger card animation after component mounts
    setTimeout(() => setAnimateCards(true), 200);
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Cloud,
      title: 'मौसम की जानकारी',
      description: 'वास्तविक समय में मौसम की सटीक जानकारी प्राप्त करें'
    },
    {
      icon: TrendingUp,
      title: 'बाजार भाव',
      description: 'अपनी फसल के लिए सबसे अच्छी कीमत जानें'
    },
    {
      icon: Award,
      title: 'सरकारी योजनाएं',
      description: 'किसानों के लिए नवीनतम सरकारी योजनाओं की जानकारी'
    },
    {
      icon: Users,
      title: 'विशेषज्ञ सलाह',
      description: 'कृषि विशेषज्ञों से सीधी सलाह प्राप्त करें'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-full">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">सार्थी किसान सहायक</h1>
              <p className="text-sm text-green-600">आपका डिजिटल कृषि साथी</p>
            </div>
          </div>
          <div className="space-x-3">
            <Button variant="outline" asChild className="border-green-300 text-green-700 hover:bg-green-50">
              <Link to="/auth?mode=login">लॉगिन</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/auth?mode=signup">रजिस्टर करें</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-green-800 mb-6 leading-tight">
            आधुनिक खेती का <span className="text-green-600">डिजिटल समाधान</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            मौसम, बाजार भाव, सरकारी योजनाएं और विशेषज्ञ सलाह - सब कुछ एक ही जगह। 
            अपनी खेती को बनाएं और भी फायदेमंद।
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              <Link to="/auth?mode=signup">आज ही शुरू करें</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 text-lg px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              संपर्क करें
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-green-800 mb-4">हमारी सेवाएं</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            किसानों की हर जरूरत को ध्यान में रखकर बनाई गई आधुनिक सुविधाएं
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className={`transform transition-all duration-700 hover:scale-105 hover:shadow-lg border-green-200 ${
                  animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-green-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">आज ही जुड़ें सार्थी परिवार से</h3>
          <p className="text-xl mb-8 text-green-100">
            हजारों किसान पहले से ही उपयोग कर रहे हैं और बेहतर फसल पा रहे हैं
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-white text-green-600 hover:bg-green-50">
            <Link to="/auth?mode=signup">निःशुल्क रजिस्टर करें</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-green-600 p-2 rounded-full">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">सार्थी किसान सहायक</span>
          </div>
          <p className="text-green-200">© 2024 सार्थी किसान सहायक। सभी अधिकार सुरक्षित।</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
