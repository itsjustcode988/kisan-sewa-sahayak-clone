
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
    // Authentication
    'auth.login_title': 'Login',
    'auth.signup_title': 'Create Account',
    'auth.login_description': 'Sign in to your account',
    'auth.signup_description': 'Join the KisanSarthi family',
    'auth.full_name': 'Full Name',
    'auth.email': 'Email Address',
    'auth.phone': 'Mobile Number',
    'auth.password': 'Password',
    'auth.name_placeholder': 'Ram Prasad',
    'auth.email_placeholder': 'ram@example.com',
    'auth.phone_placeholder': '+91 9876543210',
    'auth.password_placeholder': 'Your password',
    'auth.login_button': 'Login',
    'auth.signup_button': 'Create Account',
    'auth.please_wait': 'Please wait...',
    'auth.new_user': 'New user?',
    'auth.existing_user': 'Already have an account?',
    'auth.register_here': 'Register here',
    'auth.login_here': 'Login here',
    'auth.login_success': 'Login Successful',
    'auth.signup_success': 'Account Created',
    'auth.welcome_message': 'Welcome back!',
    'auth.account_created': 'Your account has been created successfully',
    'auth.error': 'Error',
    'auth.check_credentials': 'Please check your information and try again',
    'auth.something_wrong': 'Something went wrong. Please try again.',

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
    'landing.title': 'KisanSarthi',
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
    'dashboard.advice_description': 'Weather-based farming advice',
    
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
    
    // Market Page
    'market.title': 'Market Prices',
    'market.description': 'Today\'s fresh market prices and price trends',
    'market.search_placeholder': 'Search crop name...',
    'market.all_categories': 'All',
    'market.grains': 'Grains',
    'market.pulses': 'Pulses',
    'market.oilseeds': 'Oilseeds',
    'market.vegetables': 'Vegetables',
    'market.fruits': 'Fruits',
    'market.spices': 'Spices',
    'market.total_crops': 'Total Crops',
    'market.available_prices': 'Available Prices',
    'market.average_growth': 'Average Growth',
    'market.highest_price': 'Highest Price',
    'market.active_markets': 'Active Markets',
    'market.today_prices': 'Today\'s Market Prices',
    'market.fresh_prices': 'Fresh prices from all major markets',
    'market.selling_advice': 'Selling Advice',
    'market.quality_focus': 'Quality Focus',
    'market.market_selection': 'Market Selection',
    'market.storage_advice': 'Storage Advice',
    
    // Schemes Page
    'schemes.title': 'Government Schemes',
    'schemes.description': 'Complete information about latest government schemes for farmers',
    'schemes.all_categories': 'All',
    'schemes.crop_insurance': 'Crop Insurance',
    'schemes.subsidy': 'Subsidy',
    'schemes.loan': 'Loan',
    'schemes.farmer_welfare': 'Farmer Welfare',
    'schemes.technical_support': 'Technical Support',
    'schemes.total_schemes': 'Total Schemes',
    'schemes.available_schemes': 'Available Schemes',
    'schemes.active_schemes': 'Active Schemes',
    'schemes.open_applications': 'Open for Applications',
    'schemes.total_benefit': 'Total Benefit Amount',
    'schemes.max_benefit': 'Maximum Benefit',
    'schemes.application_time': 'Application Time',
    'schemes.processing_days': 'Days Processing',
    'schemes.main_benefits': 'Main Benefits',
    'schemes.required_documents': 'Required Documents',
    'schemes.eligibility': 'Eligibility',
    'schemes.deadline': 'Deadline',
    'schemes.apply_now': 'Apply Now',
    'schemes.read_more': 'Read More',
    'schemes.download_guide': 'Download Guide',
    'schemes.need_help': 'Need Help?',
    'schemes.help_description': 'For more information about schemes or help with application',
    'schemes.helpline': 'Helpline: 1800-180-1551',
    'schemes.chat_support': 'Online Chat Support',
    'schemes.find_office': 'Find Nearest Office',
    
    // Expert Page
    'expert.title': 'Expert Advice',
    'expert.description': 'Direct consultation with agricultural experts',
    'expert.available_experts': 'Available Experts',
    'expert.choose_expert': 'Choose expert according to your problem',
    'expert.experience': 'Experience',
    'expert.available': 'Available',
    'expert.busy': 'Busy',
    'expert.chat': 'Chat',
    'expert.call': 'Call',
    'expert.quick_question': 'Ask Quick Question',
    'expert.question_description': 'Write your question and get instant answer',
    'expert.question_placeholder': 'Write your question here...',
    'expert.send_question': 'Send Question',
    'expert.your_sessions': 'Your Consultation Sessions',
    'expert.completed': 'Completed',
    'expert.upcoming': 'Upcoming',
    'expert.book_consultation': 'Book Consultation',
    'expert.video_call': 'Video Call',
    'expert.phone_call': 'Phone Call',
    'expert.next_available': 'Next available time',
    'expert.book_now': 'Book Now',
    
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
    'common.active': 'Active',
    'common.free': 'Free',
    'common.standard': 'Standard',
    'common.grade_a': 'A Grade',
    'common.super': 'Super',
  },
  hi: {
    // Authentication
    'auth.login_title': 'लॉगिन करें',
    'auth.signup_title': 'नया खाता बनाएं',
    'auth.login_description': 'अपने खाते में प्रवेश करें',
    'auth.signup_description': 'KisanSarthi परिवार में शामिल हों',
    'auth.full_name': 'पूरा नाम',
    'auth.email': 'ईमेल पता',
    'auth.phone': 'मोबाइल नंबर',
    'auth.password': 'पासवर्ड',
    'auth.name_placeholder': 'राम प्रसाद',
    'auth.email_placeholder': 'ram@example.com',
    'auth.phone_placeholder': '+91 9876543210',
    'auth.password_placeholder': 'आपका पासवर्ड',
    'auth.login_button': 'लॉगिन करें',
    'auth.signup_button': 'खाता बनाएं',
    'auth.please_wait': 'कृपया प्रतीक्षा करें...',
    'auth.new_user': 'नया उपयोगकर्ता हैं?',
    'auth.existing_user': 'पहले से खाता है?',
    'auth.register_here': 'यहाँ रजिस्टर करें',
    'auth.login_here': 'यहाँ लॉगिन करें',
    'auth.login_success': 'सफलतापूर्वक लॉगिन',
    'auth.signup_success': 'खाता बना दिया गया',
    'auth.welcome_message': 'आपका स्वागत है!',
    'auth.account_created': 'आपका खाता सफलतापूर्वक बन गया है',
    'auth.error': 'त्रुटि',
    'auth.check_credentials': 'कृपया अपनी जानकारी जांचें और पुनः प्रयास करें',
    'auth.something_wrong': 'कुछ गलत हुआ है। कृपया पुनः प्रयास करें।',

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
    'landing.title': 'KisanSarthi',
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
    
    // Market Page
    'market.title': 'बाजार भाव',
    'market.description': 'आज के ताजा बाजार भाव और मूल्य रुझान',
    'market.search_placeholder': 'फसल का नाम खोजें...',
    'market.all_categories': 'सभी',
    'market.grains': 'अनाज',
    'market.pulses': 'दालें',
    'market.oilseeds': 'तिलहन',
    'market.vegetables': 'सब्जियां',
    'market.fruits': 'फल',
    'market.spices': 'मसाले',
    'market.total_crops': 'कुल फसलें',
    'market.available_prices': 'उपलब्ध भाव',
    'market.average_growth': 'औसत वृद्धि',
    'market.highest_price': 'सर्वोच्च मूल्य',
    'market.active_markets': 'सक्रिय मंडियां',
    'market.today_prices': 'आज के बाजार भाव',
    'market.fresh_prices': 'सभी प्रमुख मंडियों से ताजा भाव',
    'market.selling_advice': 'बेचने का अच्छा समय',
    'market.quality_focus': 'गुणवत्ता का ध्यान',
    'market.market_selection': 'मंडी का चुनाव',
    'market.storage_advice': 'भंडारण सलाह',
    
    // Schemes Page
    'schemes.title': 'सरकारी योजनाएं',
    'schemes.description': 'किसानों के लिए नवीनतम सरकारी योजनाओं की पूरी जानकारी',
    'schemes.all_categories': 'सभी',
    'schemes.crop_insurance': 'फसल बीमा',
    'schemes.subsidy': 'सब्सिडी',
    'schemes.loan': 'ऋण',
    'schemes.farmer_welfare': 'किसान कल्याण',
    'schemes.technical_support': 'तकनीकी सहायता',
    'schemes.total_schemes': 'कुल योजनाएं',
    'schemes.available_schemes': 'उपलब्ध योजनाएं',
    'schemes.active_schemes': 'सक्रिय योजनाएं',
    'schemes.open_applications': 'आवेदन के लिए खुली',
    'schemes.total_benefit': 'कुल लाभ राशि',
    'schemes.max_benefit': 'अधिकतम लाभ',
    'schemes.application_time': 'आवेदन समय',
    'schemes.processing_days': 'दिन प्रोसेसिंग',
    'schemes.main_benefits': 'मुख्य लाभ',
    'schemes.required_documents': 'आवश्यक दस्तावेज',
    'schemes.eligibility': 'पात्रता',
    'schemes.deadline': 'अंतिम तिथि',
    'schemes.apply_now': 'आवेदन करें',
    'schemes.read_more': 'विस्तार से पढ़ें',
    'schemes.download_guide': 'गाइड डाउनलोड करें',
    'schemes.need_help': 'सहायता चाहिए?',
    'schemes.help_description': 'योजनाओं के बारे में अधिक जानकारी या आवेदन में सहायता के लिए',
    'schemes.helpline': 'हेल्पलाइन: 1800-180-1551',
    'schemes.chat_support': 'ऑनलाइन चैट सपोर्ट',
    'schemes.find_office': 'नजदीकी कार्यालय खोजें',
    
    // Expert Page
    'expert.title': 'विशेषज्ञ सलाह',
    'expert.description': 'कृषि विशेषज्ञों से सीधी बातचीत करें',
    'expert.available_experts': 'उपलब्ध विशेषज्ञ',
    'expert.choose_expert': 'अपनी समस्या के अनुसार विशेषज्ञ चुनें',
    'expert.experience': 'का अनुभव',
    'expert.available': 'उपलब्ध',
    'expert.busy': 'व्यस्त',
    'expert.chat': 'चैट',
    'expert.call': 'कॉल',
    'expert.quick_question': 'त्वरित प्रश्न पूछें',
    'expert.question_description': 'अपना प्रश्न लिखें और तुरंत उत्तर पाएं',
    'expert.question_placeholder': 'अपना प्रश्न यहाँ लिखें...',
    'expert.send_question': 'प्रश्न भेजें',
    'expert.your_sessions': 'आपकी सलाह सेशन',
    'expert.completed': 'पूर्ण',
    'expert.upcoming': 'आगामी',
    'expert.book_consultation': 'सलाह बुक करें',
    'expert.video_call': 'वीडियो कॉल',
    'expert.phone_call': 'फोन कॉल',
    'expert.next_available': 'अगला उपलब्ध समय',
    'expert.book_now': 'अभी बुक करें',
    
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
    'common.active': 'सक्रिय',
    'common.free': 'निःशुल्क',
    'common.standard': 'स्टैंडर्ड',
    'common.grade_a': 'A ग्रेड',
    'common.super': 'सुपर',
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
