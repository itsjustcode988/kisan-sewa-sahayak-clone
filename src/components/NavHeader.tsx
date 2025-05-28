
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Sprout, LogOut, User } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const NavHeader = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: t('nav.logout_success'),
      description: t('nav.logout_description'),
    });
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: t('nav.dashboard') },
    { path: '/weather', label: t('nav.weather') },
    { path: '/market', label: t('nav.market') },
    { path: '/schemes', label: t('nav.schemes') },
    { path: '/expert', label: t('nav.expert') }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="bg-green-600 p-2 rounded-full">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-800">{t('landing.title')}</h1>
            <p className="text-sm text-green-600">{t('nav.dashboard')}</p>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                location.pathname === item.path
                  ? 'text-green-600 border-b-2 border-green-600 pb-1'
                  : 'text-gray-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language Switcher and User Menu */}
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuItem disabled>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('nav.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
