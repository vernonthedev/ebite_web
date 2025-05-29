
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/feed", label: "Feed" },
    { path: "/create", label: "Create" },
    { path: "/profile", label: "Profile" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <span className="text-white text-lg md:text-xl font-bold">Ebite</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                isActive(link.path) 
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                  : 'text-white hover:bg-purple-500/20 hover:text-purple-300 border border-transparent hover:border-purple-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white rounded-full px-6 ml-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Sign In
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-3">
          <Link to="/feed">
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white rounded-full px-4 text-xs"
            >
              View Feed
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 rounded-2xl hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 pt-20">
          <div className="flex flex-col items-center justify-start h-full space-y-8 pt-20">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-2xl font-medium transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'text-purple-400' 
                    : 'text-white hover:text-purple-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white rounded-3xl px-8 mt-8"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
