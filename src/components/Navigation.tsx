import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: "/feed", label: "Feed" },
        { path: "/create", label: "Create" },
        { path: "/profile", label: "Profile" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
            <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-white text-lg md:text-xl font-bold">
                        Ebite(alpha)
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                                isActive(link.path)
                                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                                    : "text-white hover:bg-purple-500/20 hover:text-purple-300 border border-transparent hover:border-purple-400"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-400 text-black-300 font-bold hover:bg-purple-500 hover:text-white rounded-full px-6 ml-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
