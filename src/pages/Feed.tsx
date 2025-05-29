import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import Navigation from "@/components/Navigation";
import MobileBottomNav from "@/components/MobileBottomNav";

const mockLessons = [
  {
    id: 1,
    title: "Python Basics: Variables",
    description: "Learn how to declare and use variables in Python",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 120,
    quiz: {
      question: "Which of these is a valid Python variable name?",
      options: ["2name", "my_name", "my-name", "my name"],
      correctAnswer: 1
    },
    badge: "Python Novice",
    author: "@codewithsarah"
  },
  {
    id: 2,
    title: "React Hooks: useState",
    description: "Master the useState hook in React",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: 90,
    quiz: {
      question: "What does useState return?",
      options: ["A value", "A function", "An array with value and setter", "An object"],
      correctAnswer: 2
    },
    badge: "React Explorer",
    author: "@reactmaster"
  },
  {
    id: 3,
    title: "CSS Flexbox Layout",
    description: "Create responsive layouts with Flexbox",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: 105,
    quiz: {
      question: "Which property makes flex items wrap to new lines?",
      options: ["flex-direction", "flex-wrap", "flex-grow", "align-items"],
      correctAnswer: 1
    },
    badge: "CSS Architect",
    author: "@designpro"
  }
];

const Feed = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [startY, setStartY] = useState<number | null>(null);

  const handleQuizComplete = (lessonId: number, score: number) => {
    if (score >= 75 && !completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      console.log(`Badge unlocked for lesson ${lessonId}!`);
    }
  };

  const nextLesson = () => {
    if (currentLesson < mockLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startY) return;
    
    const endY = e.changedTouches[0].clientY;
    const diffY = startY - endY;
    
    // Minimum swipe distance
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        // Swipe up - next lesson
        nextLesson();
      } else {
        // Swipe down - previous lesson
        prevLesson();
      }
    }
    
    setStartY(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <Navigation />
      
      {/* Mobile TikTok-style View */}
      <div className="md:hidden">
        <div 
          className="h-screen w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <LessonCard
            lesson={mockLessons[currentLesson]}
            onQuizComplete={(score) => handleQuizComplete(mockLessons[currentLesson].id, score)}
            isCompleted={completedLessons.includes(mockLessons[currentLesson].id)}
            isMobileFullscreen={true}
          />
        </div>
        
        {/* Mobile Navigation Arrows */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-4">
          <Button
            onClick={prevLesson}
            disabled={currentLesson === 0}
            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm rounded-full w-12 h-12 p-0"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          <Button
            onClick={nextLesson}
            disabled={currentLesson === mockLessons.length - 1}
            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm rounded-full w-12 h-12 p-0"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Mobile Progress Dots */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex space-x-2">
          {mockLessons.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentLesson ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-md mx-auto pt-16 md:pt-20 pb-8 px-4">
        {/* Feed Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Feed</h1>
          <p className="text-gray-400 text-sm md:text-base">Swipe through bite-sized lessons</p>
        </div>

        {/* Lesson Card Container */}
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
          <LessonCard
            lesson={mockLessons[currentLesson]}
            onQuizComplete={(score) => handleQuizComplete(mockLessons[currentLesson].id, score)}
            isCompleted={completedLessons.includes(mockLessons[currentLesson].id)}
            isMobileFullscreen={false}
          />
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-4 md:mt-6">
          <Button
            variant="outline"
            onClick={prevLesson}
            disabled={currentLesson === 0}
            className="border-gray-600 text-gray-400 hover:bg-gray-800 text-sm md:text-base px-3 md:px-4"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {mockLessons.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentLesson ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <Button
            onClick={nextLesson}
            disabled={currentLesson === mockLessons.length - 1}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm md:text-base px-3 md:px-4"
          >
            Next
          </Button>
        </div>

        {/* Progress Stats */}
        <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
          <Card className="bg-gray-800/50 border-gray-700 p-3 md:p-4 text-center rounded-2xl">
            <div className="text-xl md:text-2xl font-bold text-white">{completedLessons.length}</div>
            <div className="text-xs md:text-sm text-gray-400">Completed</div>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-3 md:p-4 text-center rounded-2xl">
            <div className="text-xl md:text-2xl font-bold text-purple-400">{mockLessons.length}</div>
            <div className="text-xs md:text-sm text-gray-400">Available</div>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-3 md:p-4 text-center rounded-2xl">
            <div className="text-xl md:text-2xl font-bold text-pink-400">{completedLessons.length}</div>
            <div className="text-xs md:text-sm text-gray-400">Badges</div>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Feed;
