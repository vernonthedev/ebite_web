
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Star, Users, Trophy, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-yellow-500/20 rounded-full blur-xl animate-bounce delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/60 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400/50 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-ping delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 md:pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm mb-6 animate-fadeIn">
              <Star className="w-4 h-4 text-yellow-400 mr-2 animate-spin-slow" />
              <span className="text-purple-300 text-sm font-medium">Learn coding in bite-sized lessons</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slideUp">
              Master Coding
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                One Bite at a Time
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-300">
              Watch quick lessons, take instant quizzes, and unlock achievements. 
              <span className="text-purple-300 font-semibold">Learning has never been this addictive.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slideUp delay-500">
            <Link to="/feed">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-purple-500/25 w-full sm:w-auto">
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              Watch Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto animate-fadeIn delay-700">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-400 font-medium">Interactive Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">50K+</div>
              <div className="text-gray-400 font-medium">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-400 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-purple-400">Ebite</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-gray-800/50 border-gray-700 p-6 md:p-8 rounded-3xl backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Quick Lessons</h3>
              <p className="text-gray-400 leading-relaxed">
                Bite-sized video lessons that fit into your busy schedule. Learn coding concepts in just 2-5 minutes.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6 md:p-8 rounded-3xl backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Quizzes</h3>
              <p className="text-gray-400 leading-relaxed">
                Test your knowledge immediately with interactive quizzes and earn badges for your achievements.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6 md:p-8 rounded-3xl backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
              <p className="text-gray-400 leading-relaxed">
                Share your progress, challenge friends, and learn together with thousands of other developers.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of developers who are already learning with Ebite. 
            Your first lesson is just a click away.
          </p>
          
          <Link to="/feed">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-purple-500/25">
              <Play className="w-6 h-6 mr-3" />
              Begin Learning Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Index;
