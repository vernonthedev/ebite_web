
import { Link, useLocation } from "react-router-dom";
import { Home, Plus, User } from "lucide-react";

const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/create", icon: Plus, label: "Create" },
    { path: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-gray-800">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-2xl transition-all duration-300 ${
              isActive(item.path)
                ? 'text-purple-400 bg-purple-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
