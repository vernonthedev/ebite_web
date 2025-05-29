import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Share, Star, Check, Play, Pause, Heart, MessageCircle } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  badge: string;
  author: string;
}

interface LessonCardProps {
  lesson: Lesson;
  onQuizComplete: (score: number) => void;
  isCompleted: boolean;
  isMobileFullscreen?: boolean;
}

const LessonCard = ({ lesson, onQuizComplete, isCompleted, isMobileFullscreen = false }: LessonCardProps) => {
  const [videoWatched, setVideoWatched] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setVideoWatched(true);
    setShowQuiz(true);
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      if (progress > 80 && !videoWatched) {
        setVideoWatched(true);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleQuizSubmit = () => {
    const isCorrect = selectedAnswer === lesson.quiz.correctAnswer;
    const score = isCorrect ? 100 : 0;
    setQuizScore(score);
    setShowResult(true);
    
    if (isCorrect) {
      onQuizComplete(score);
    }
  };

  const shareLesson = () => {
    const shareText = `Check out this ${lesson.title} lesson on Ebite! Can you beat my score?`;
    const shareUrl = `https://ebite.com/lesson/${lesson.id}?ref=user`;
    
    if (navigator.share) {
      navigator.share({
        title: lesson.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      console.log("Lesson shared!");
    }
  };

  // Mobile TikTok-style fullscreen layout
  if (isMobileFullscreen) {
    return (
      <div className="relative h-screen w-full bg-black">
        {/* Full-screen video */}
        <video
          ref={videoRef}
          src={lesson.videoUrl}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onTimeUpdate={handleVideoProgress}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={false}
          playsInline
          autoPlay
          muted
        />
        
        {/* Video Overlay Controls */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm rounded-full w-16 h-16 p-0"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>
        </div>

        {/* Right side action buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col space-y-6">
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center space-y-1"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${liked ? 'bg-red-500' : 'bg-black/50'} backdrop-blur-sm`}>
              <Heart className={`w-6 h-6 ${liked ? 'text-white' : 'text-white'}`} fill={liked ? 'white' : 'none'} />
            </div>
            <span className="text-white text-xs">125</span>
          </button>
          
          <button
            onClick={shareLesson}
            className="flex flex-col items-center space-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Share className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs">Share</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs">42</span>
          </button>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span className="font-medium">{lesson.author}</span>
            </div>
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
            <p className="text-sm text-gray-300">{lesson.description}</p>
            
            {/* Duration Badge */}
            <Badge className="bg-black/50 text-white border-gray-600 rounded-2xl">
              <Clock className="w-3 h-3 mr-1" />
              {Math.floor(lesson.duration / 60)}:{String(lesson.duration % 60).padStart(2, '0')}
            </Badge>
          </div>

          {/* Quiz Section for mobile */}
          {videoWatched && showQuiz && !showResult && (
            <div className="mt-4 bg-gray-900/90 rounded-3xl p-4 backdrop-blur-lg">
              <h4 className="font-medium text-white mb-3">Quick Quiz</h4>
              <p className="text-gray-300 mb-4 text-sm">{lesson.quiz.question}</p>
              
              <div className="space-y-2 mb-4">
                {lesson.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-3 text-left rounded-2xl border transition-all text-sm ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <Button
                onClick={handleQuizSubmit}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl"
              >
                Submit Answer
              </Button>
            </div>
          )}

          {/* Quiz Result for mobile */}
          {showResult && (
            <div className={`mt-4 rounded-3xl p-4 backdrop-blur-lg ${
              quizScore === 100 ? 'bg-green-900/90 border border-green-500' : 'bg-red-900/90 border border-red-500'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {quizScore === 100 ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</div>
                )}
                <h4 className={`font-medium ${quizScore === 100 ? 'text-green-400' : 'text-red-400'}`}>
                  {quizScore === 100 ? 'Correct!' : 'Not quite right'}
                </h4>
              </div>
              
              {quizScore === 100 && (
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">Badge unlocked: {lesson.badge}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-10">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ 
              width: videoRef.current ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` : '0%' 
            }}
          />
        </div>
      </div>
    );
  }

  // Desktop/tablet layout (existing code)
  return (
    <Card className="bg-gray-800/80 border-gray-700 overflow-hidden h-full rounded-3xl">
      {/* Video Section */}
      <div className="relative bg-gray-900 h-48 md:h-64 overflow-hidden rounded-t-3xl">
        <video
          ref={videoRef}
          src={lesson.videoUrl}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onTimeUpdate={handleVideoProgress}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={false}
        />
        
        {/* Video Overlay Controls */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm rounded-full w-12 h-12 md:w-16 md:h-16 p-0"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
            )}
          </Button>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4 flex items-center space-x-2">
          <Badge className="bg-black/50 text-white border-gray-600 rounded-2xl">
            <Clock className="w-3 h-3 mr-1" />
            {Math.floor(lesson.duration / 60)}:{String(lesson.duration % 60).padStart(2, '0')}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ 
              width: videoRef.current ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` : '0%' 
            }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{lesson.title}</h3>
          <p className="text-gray-400 text-sm">{lesson.description}</p>
          <p className="text-purple-400 text-sm mt-1">by {lesson.author}</p>
        </div>

        {/* Video Completion Notice */}
        {videoWatched && !showQuiz && (
          <div className="bg-green-900/30 border border-green-500 rounded-2xl p-3 md:p-4 text-center">
            <Check className="w-6 h-6 md:w-8 md:h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-medium text-sm md:text-base">Great! You've watched the lesson</p>
            <Button
              onClick={() => setShowQuiz(true)}
              className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl"
            >
              Take Quiz Now
            </Button>
          </div>
        )}

        {/* Quiz Section */}
        {showQuiz && !showResult && (
          <div className="bg-gray-700/50 rounded-2xl p-3 md:p-4">
            <h4 className="font-medium text-white mb-3 text-sm md:text-base">Quick Quiz</h4>
            <p className="text-gray-300 mb-4 text-sm md:text-base">{lesson.quiz.question}</p>
            
            <div className="space-y-2 mb-4">
              {lesson.quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-3 text-left rounded-2xl border transition-all text-sm md:text-base ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                      : 'border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <Button
              onClick={handleQuizSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl"
            >
              Submit Answer
            </Button>
          </div>
        )}

        {/* Quiz Result */}
        {showResult && (
          <div className={`rounded-2xl p-3 md:p-4 ${
            quizScore === 100 ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {quizScore === 100 ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</div>
              )}
              <h4 className={`font-medium text-sm md:text-base ${quizScore === 100 ? 'text-green-400' : 'text-red-400'}`}>
                {quizScore === 100 ? 'Correct!' : 'Not quite right'}
              </h4>
            </div>
            
            {quizScore === 100 && (
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm">Badge unlocked: {lesson.badge}</span>
              </div>
            )}
            
            <Button
              onClick={shareLesson}
              variant="outline"
              className="w-full border-gray-600 text-gray-400 hover:bg-gray-700 rounded-2xl text-sm md:text-base"
            >
              <Share className="w-4 h-4 mr-2" />
              Challenge a Friend
            </Button>
          </div>
        )}

        {/* Completed Badge */}
        {isCompleted && !showQuiz && (
          <div className="bg-green-900/30 border border-green-500 rounded-2xl p-3 md:p-4 text-center">
            <Check className="w-6 h-6 md:w-8 md:h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-medium text-sm md:text-base">Lesson Completed!</p>
            <p className="text-xs md:text-sm text-gray-400">Badge: {lesson.badge}</p>
            
            <Button
              onClick={shareLesson}
              variant="outline"
              className="w-full mt-3 border-green-500 text-green-400 hover:bg-green-500 hover:text-white rounded-2xl text-sm md:text-base"
            >
              <Share className="w-4 h-4 mr-2" />
              Share Your Achievement
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LessonCard;
