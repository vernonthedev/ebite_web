
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Create = () => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedLesson({
        title: `${topic}: Quick Start Guide`,
        description: `Learn the fundamentals of ${topic} in just 2 minutes`,
        script: `Welcome to this quick lesson on ${topic}! 

In the next 2 minutes, you'll learn:
• What ${topic} is and why it matters
• The key concepts you need to know
• A practical example you can try today

Let's dive in and master ${topic} together!`,
        quiz: {
          question: `What's the most important thing to remember about ${topic}?`,
          options: [
            "It's complicated and takes years to learn",
            "Start with the basics and practice regularly", 
            "You need expensive tools to get started",
            "It's only useful for experts"
          ],
          correctAnswer: 1
        }
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Creator Studio</h1>
          <p className="text-xl text-gray-300">Transform any topic into an engaging micro-lesson</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Create Your Lesson</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What would you like to teach?
                </label>
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., 'How to center a div in CSS', 'Python list comprehensions', 'Basic photography composition'"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  2-min format
                </Badge>
                <Badge variant="outline" className="border-pink-500 text-pink-400">
                  Auto quiz
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  AI-powered
                </Badge>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!topic.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isGenerating ? "Generating..." : "Generate Lesson"}
              </Button>
            </div>
          </Card>

          {/* Preview Section */}
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Preview</h2>
            
            {!generatedLesson ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 opacity-50"></div>
                <p className="text-gray-400">Enter a topic to generate your lesson preview</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{generatedLesson.title}</h3>
                  <p className="text-gray-400">{generatedLesson.description}</p>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">Video Script</h4>
                  <p className="text-sm text-gray-300 whitespace-pre-line">{generatedLesson.script}</p>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-medium text-pink-400 mb-3">Quiz Question</h4>
                  <p className="text-white mb-3">{generatedLesson.quiz.question}</p>
                  <div className="space-y-2">
                    {generatedLesson.quiz.options.map((option: string, index: number) => (
                      <div
                        key={index}
                        className={`p-2 rounded border text-sm ${
                          index === generatedLesson.quiz.correctAnswer
                            ? 'border-green-500 bg-green-500/20 text-green-300'
                            : 'border-gray-600 text-gray-400'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Publish Lesson
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-400">
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="bg-gray-800/50 border-gray-700 p-6 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">💡 Pro Tips</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <strong className="text-purple-400">Be Specific:</strong> Instead of "JavaScript," try "JavaScript array methods" for better results.
            </div>
            <div>
              <strong className="text-pink-400">Keep it Simple:</strong> Focus on one key concept that can be explained in 2 minutes.
            </div>
            <div>
              <strong className="text-blue-400">Think Practical:</strong> Include real-world examples that learners can try immediately.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Create;
