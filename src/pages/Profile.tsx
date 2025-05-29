
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Share, Calendar, Link } from "lucide-react";
import Navigation from "@/components/Navigation";

const mockUser = {
  username: "alexlearns",
  displayName: "Alex Johnson",
  bio: "Full-stack developer learning something new every day 🚀",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  joinDate: "2024-01-15",
  stats: {
    lessonsCompleted: 47,
    badgesEarned: 23,
    friendsChallenged: 15,
    streakDays: 12
  },
  badges: [
    { name: "Python Master", category: "Programming", earned: "2024-01-20", color: "bg-green-500" },
    { name: "React Explorer", category: "Frontend", earned: "2024-01-18", color: "bg-blue-500" },
    { name: "CSS Architect", category: "Design", earned: "2024-01-16", color: "bg-purple-500" },
    { name: "7-Day Streak", category: "Achievement", earned: "2024-01-22", color: "bg-orange-500" },
    { name: "First Share", category: "Social", earned: "2024-01-15", color: "bg-pink-500" },
    { name: "Quiz Master", category: "Learning", earned: "2024-01-19", color: "bg-yellow-500" }
  ],
  recentActivity: [
    { type: "completed", lesson: "Advanced React Hooks", time: "2 hours ago" },
    { type: "badge", badge: "Python Master", time: "1 day ago" },
    { type: "shared", lesson: "CSS Grid Basics", time: "2 days ago" },
    { type: "challenged", friend: "@sarah_dev", time: "3 days ago" }
  ]
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("badges");

  const shareProfile = () => {
    const url = `https://ebite.com/@${mockUser.username}`;
    navigator.clipboard.writeText(url);
    console.log("Profile URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-8">
        {/* Profile Header */}
        <Card className="bg-gray-800/50 border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={mockUser.avatar}
              alt={mockUser.displayName}
              className="w-24 h-24 rounded-full bg-gray-700"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{mockUser.displayName}</h1>
              <p className="text-purple-400 text-lg">@{mockUser.username}</p>
              <p className="text-gray-300 mt-2">{mockUser.bio}</p>
              <p className="text-gray-500 text-sm mt-1">
                Joined {new Date(mockUser.joinDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={shareProfile}
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-white">{mockUser.stats.lessonsCompleted}</div>
            <div className="text-sm text-gray-400">Lessons</div>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{mockUser.stats.badgesEarned}</div>
            <div className="text-sm text-gray-400">Badges</div>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">{mockUser.stats.friendsChallenged}</div>
            <div className="text-sm text-gray-400">Challenges</div>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{mockUser.stats.streakDays}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === "badges" ? "default" : "outline"}
            onClick={() => setActiveTab("badges")}
            className={activeTab === "badges" ? "bg-purple-600" : "border-gray-600 text-gray-400"}
          >
            Badges
          </Button>
          <Button
            variant={activeTab === "activity" ? "default" : "outline"}
            onClick={() => setActiveTab("activity")}
            className={activeTab === "activity" ? "bg-purple-600" : "border-gray-600 text-gray-400"}
          >
            Activity
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "badges" && (
          <div className="grid md:grid-cols-3 gap-4">
            {mockUser.badges.map((badge, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 p-4 hover:bg-gray-800/70 transition-all hover-scale">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 ${badge.color} rounded-full flex items-center justify-center`}>
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{badge.name}</h3>
                    <p className="text-sm text-gray-400">{badge.category}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Earned {new Date(badge.earned).toLocaleDateString()}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-3 border-gray-600 text-gray-400 hover:bg-gray-700 text-xs"
                >
                  <Share className="w-3 h-3 mr-1" />
                  Share Badge
                </Button>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {mockUser.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    {activity.type === "completed" && (
                      <p className="text-gray-300">
                        Completed <span className="text-white font-medium">"{activity.lesson}"</span>
                      </p>
                    )}
                    {activity.type === "badge" && (
                      <p className="text-gray-300">
                        Earned badge <span className="text-purple-400 font-medium">{activity.badge}</span>
                      </p>
                    )}
                    {activity.type === "shared" && (
                      <p className="text-gray-300">
                        Shared <span className="text-white font-medium">"{activity.lesson}"</span>
                      </p>
                    )}
                    {activity.type === "challenged" && (
                      <p className="text-gray-300">
                        Challenged <span className="text-pink-400 font-medium">{activity.friend}</span>
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Referral Section */}
        <Card className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 border-purple-500/50 p-6 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Invite Friends & Earn</h3>
              <p className="text-gray-300">Share your referral link and unlock exclusive badges when friends join!</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link className="w-4 h-4 mr-2" />
              Get Link
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
