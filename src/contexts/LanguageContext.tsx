
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation objects
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.weather': 'Weather',
    'nav.market': 'Market Prices',
    'nav.schemes': 'Schemes',
    'nav.expert': 'Expert Advice',
    'nav.logout': 'Logout',
    'nav.logout_success': 'Logout Successful',
    'nav.logout_description': 'You have been successfully logged out',
    
    // Landing Page
    'landing.title': 'Sarthi Kisan Sahayak',
    'landing.subtitle': 'Your Digital Agriculture Companion',
    'landing.hero_title': 'Digital Solution for Modern Farming',
    'landing.hero_description': 'Weather, market prices, government schemes and expert advice - all in one place. Make your farming more profitable.',
    'landing.get_started': 'Get Started Today',
    'landing.contact': 'Contact Us',
    'landing.login': 'Login',
    'landing.register': 'Register',
    'landing.services_title': 'Our Services',
    'landing.services_description': 'Modern facilities designed keeping every need of farmers in mind',
    
    // Features
    'feature.weather.title': 'Weather Information',
    'feature.weather.description': 'Get accurate weather information in real time',
    'feature.market.title': 'Market Prices',
    'feature.market.description': 'Know the best prices for your crops',
    'feature.schemes.title': 'Government Schemes',
    'feature.schemes.description': 'Information about latest government schemes for farmers',
    'feature.expert.title': 'Expert Advice',
    'feature.expert.description': 'Get direct advice from agricultural experts',
    
    // Dashboard
    'dashboard.welcome': 'Hello',
    'dashboard.welcome_message': 'Let\'s see what\'s new for your farming today',
    'dashboard.today_temp': 'Today\'s Temperature',
    'dashboard.humidity': 'Humidity',
    'dashboard.wind_speed': 'Wind Speed',
    'dashboard.uv_index': 'UV Index',
    'dashboard.market_highlights': 'Today\'s Market Prices',
    'dashboard.market_description': 'Current prices of major crops',
    'dashboard.view_all_prices': 'View All Prices',
    'dashboard.today_advice': 'Today\'s Advice',
    'dashboard.advice_description': 'Farming advice according to today\'s weather',
    
    // Weather Page
    'weather.title': 'Weather Information',
    'weather.description': 'Today\'s weather and weekly forecast',
    'weather.current': 'Current Weather',
    'weather.weekly_forecast': 'Weekly Forecast',
    'weather.farming_advice': 'Farming Advice',
    'weather.advice_description': 'Weather-based farming advice',
    'weather.alerts': 'Weather Alerts',
    'weather.sunrise': 'Sunrise',
    'weather.sunset': 'Sunset',
    'weather.visibility': 'Visibility',
    'weather.rain_chance': 'Rain',
    
    // Common
    'common.normal': 'Normal',
    'common.moderate': 'Moderate',
    'common.sunny': 'Sunny',
    'common.cloudy': 'Cloudy',
    'common.rain': 'Rain',
    'common.heavy_rain': 'Heavy Rain',
    'common.partly_cloudy': 'Partly Cloudy',
    'common.today': 'Today',
    'common.tomorrow': 'Tomorrow',
    'common.day_after': 'Day After Tomorrow',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.weather': 'मौसम',
    'nav.market': 'बाजार भाव',
    'nav.schemes': 'योजनाएं',
    'nav.expert': 'विशेषज्ञ सलाह',
    'nav.logout': 'लॉगआउट',
    'nav.logout_success': 'लॉगआउट सफल',
    'nav.logout_description': 'आपको सफलतापूर्वक लॉगआउट कर दिया गया है',
    
    // Landing Page
    'landing.title': 'सार्थी किसान सहायक',
    'landing.subtitle': 'आपका डिजिटल कृषि साथी',
    'landing.hero_title': 'आधुनिक खेती का डिजिटल समाधान',
    'landing.hero_description': 'मौसम, बाजार भाव, सरकारी योजनाएं और विशेषज्ञ सलाह - सब कुछ एक ही जगह। अपनी खेती को बनाएं और भी फायदेमंद।',
    'landing.get_started': 'आज ही शुरू करें',
    'landing.contact': 'संपर्क करें',
    'landing.login': 'लॉगिन',
    'landing.register': 'रजिस्टर करें',
    'landing.services_title': 'हमारी सेवाएं',
    'landing.services_description': 'किसानों की हर जरूरत को ध्यान में रखकर बनाई गई आधुनिक सुविधाएं',
    
    // Features
    'feature.weather.title': 'मौसम की जानकारी',
    'feature.weather.description': 'वास्तविक समय में मौसम की सटीक जानकारी प्राप्त करें',
    'feature.market.title': 'बाजार भाव',
    'feature.market.description': 'अपनी फसल के लिए सबसे अच्छी कीमत जानें',
    'feature.schemes.title': 'सरकारी योजनाएं',
    'feature.schemes.description': 'किसानों के लिए नवीनतम सरकारी योजनाओं की जानकारी',
    'feature.expert.title': 'विशेषज्ञ सलाह',
    'feature.expert.description': 'कृषि विशेषज्ञों से सीधी सलाह प्राप्त करें',
    
    // Dashboard
    'dashboard.welcome': 'नमस्कार',
    'dashboard.welcome_message': 'आज आपकी खेती के लिए क्या नया है, देखते हैं',
    'dashboard.today_temp': 'आज का तापमान',
    'dashboard.humidity': 'नमी',
    'dashboard.wind_speed': 'हवा की गति',
    'dashboard.uv_index': 'यूवी इंडेक्स',
    'dashboard.market_highlights': 'आज के बाजार भाव',
    'dashboard.market_description': 'प्रमुख फसलों की वर्तमान कीमतें',
    'dashboard.view_all_prices': 'सभी भाव देखें',
    'dashboard.today_advice': 'आज की सलाह',
    'dashboard.advice_description': 'आज के मौसम के अनुसार खेती की सलाह',
    
    // Weather Page
    'weather.title': 'मौसम की जानकारी',
    'weather.description': 'आज का मौसम और साप्ताहिक पूर्वानुमान',
    'weather.current': 'वर्तमान मौसम',
    'weather.weekly_forecast': '7 दिन का पूर्वानुमान',
    'weather.farming_advice': 'कृषि सलाह',
    'weather.advice_description': 'मौसम के अनुसार खेती की सलाह',
    'weather.alerts': 'मौसम चेतावनी',
    'weather.sunrise': 'सूर्योदय',
    'weather.sunset': 'सूर्यास्त',
    'weather.visibility': 'दृश्यता',
    'weather.rain_chance': 'बारिश',
    
    // Common
    'common.normal': 'सामान्य',
    'common.moderate': 'मध्यम',
    'common.sunny': 'धूप',
    'common.cloudy': 'बादल',
    'common.rain': 'बारिश',
    'common.heavy_rain': 'भारी बारिश',
    'common.partly_cloudy': 'आंशिक बादल',
    'common.today': 'आज',
    'common.tomorrow': 'कल',
    'common.day_after': 'परसों',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  useEffect(() => {
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem('sarthi_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('sarthi_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
