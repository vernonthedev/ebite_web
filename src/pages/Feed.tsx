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
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: 120,
        quiz: {
            question: "Which of these is a valid Python variable name?",
            options: ["2name", "my_name", "my-name", "my name"],
            correctAnswer: 1,
        },
        badge: "Python Novice",
        author: "@codewithsarah",
    },
    {
        id: 2,
        title: "React Hooks: useState",
        description: "Master the useState hook in React",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        duration: 90,
        quiz: {
            question: "What does useState return?",
            options: [
                "A value",
                "A function",
                "An array with value and setter",
                "An object",
            ],
            correctAnswer: 2,
        },
        badge: "React Explorer",
        author: "@reactmaster",
    },
    {
        id: 3,
        title: "CSS Flexbox Layout",
        description: "Create responsive layouts with Flexbox",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: 105,
        quiz: {
            question: "Which property makes flex items wrap to new lines?",
            options: [
                "flex-direction",
                "flex-wrap",
                "flex-grow",
                "align-items",
            ],
            correctAnswer: 1,
        },
        badge: "CSS Architect",
        author: "@designpro",
    },
    {
        id: 4,
        title: "JavaScript Async/Await",
        description: "Modern asynchronous programming in JavaScript",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        duration: 95,
        quiz: {
            question: "What does the await keyword do?",
            options: [
                "Pauses function execution",
                "Creates a new thread",
                "Throws an error",
                "Returns immediately",
            ],
            correctAnswer: 0,
        },
        badge: "JS Ninja",
        author: "@javascriptwizard",
    },
    {
        id: 5,
        title: "Django ORM Fundamentals",
        description: "Database operations with Django's ORM",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        duration: 110,
        quiz: {
            question: "Which method executes a QuerySet?",
            options: ["filter()", "all()", "get()", "values()"],
            correctAnswer: 2,
        },
        badge: "Django Master",
        author: "@pythondjango",
    },
    {
        id: 6,
        title: "Git Branching Strategies",
        description: "Effective version control workflows",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        duration: 85,
        quiz: {
            question: "What's the purpose of git rebase?",
            options: [
                "To delete branches",
                "To rewrite commit history",
                "To merge branches",
                "To create tags",
            ],
            correctAnswer: 1,
        },
        badge: "Version Control Pro",
        author: "@gitguru",
    },
    {
        id: 7,
        title: "TypeScript Interfaces",
        description: "Strong typing for JavaScript applications",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        duration: 100,
        quiz: {
            question: "What's the main benefit of TypeScript interfaces?",
            options: [
                "Runtime performance",
                "Code documentation",
                "Type safety",
                "Smaller bundle size",
            ],
            correctAnswer: 2,
        },
        badge: "TypeScript Expert",
        author: "@typescriptking",
    },
    {
        id: 8,
        title: "Node.js REST API Design",
        description: "Build scalable backend services",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        duration: 135,
        quiz: {
            question: "Which HTTP method is typically used for updates?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctAnswer: 2,
        },
        badge: "Backend Engineer",
        author: "@nodehero",
    },
    {
        id: 9,
        title: "Vue.js Component Lifecycle",
        description: "Understand Vue's component hooks",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        duration: 80,
        quiz: {
            question: "Which hook runs after the component is mounted?",
            options: ["created", "beforeMount", "mounted", "updated"],
            correctAnswer: 2,
        },
        badge: "Vue Specialist",
        author: "@vueartist",
    },
    {
        id: 10,
        title: "Docker Containerization",
        description: "Package and deploy applications",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        duration: 115,
        quiz: {
            question: "What's the difference between an image and a container?",
            options: [
                "Images run code, containers are blueprints",
                "Containers are running instances of images",
                "Images are smaller than containers",
                "There is no difference",
            ],
            correctAnswer: 1,
        },
        badge: "DevOps Engineer",
        author: "@dockerwhale",
    },
    {
        id: 11,
        title: "MongoDB Aggregation Framework",
        description: "Advanced data processing in MongoDB",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        duration: 125,
        quiz: {
            question: "Which aggregation stage filters documents?",
            options: ["$project", "$match", "$group", "$sort"],
            correctAnswer: 1,
        },
        badge: "Database Wizard",
        author: "@mongodbrocks",
    },
    {
        id: 12,
        title: "AWS Lambda Basics",
        description: "Serverless computing with AWS",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        duration: 95,
        quiz: {
            question:
                "What's the maximum execution time for a Lambda function?",
            options: ["1 minute", "5 minutes", "15 minutes", "1 hour"],
            correctAnswer: 2,
        },
        badge: "Cloud Architect",
        author: "@awsmaster",
    },
    {
        id: 13,
        title: "GraphQL Queries and Mutations",
        description: "Modern API query language",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        duration: 105,
        quiz: {
            question: "Which operation modifies server-side data?",
            options: ["Query", "Mutation", "Subscription", "Fragment"],
            correctAnswer: 1,
        },
        badge: "API Specialist",
        author: "@graphqlpro",
    },
    {
        id: 14,
        title: "Python Data Analysis with Pandas",
        description: "Data manipulation and analysis",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: 140,
        quiz: {
            question: "What does the pandas read_csv() function return?",
            options: ["A list", "A dictionary", "A DataFrame", "A numpy array"],
            correctAnswer: 2,
        },
        badge: "Data Scientist",
        author: "@datapandas",
    },
    {
        id: 15,
        title: "Flask Web Development",
        description: "Lightweight Python web framework",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        duration: 90,
        quiz: {
            question: "How do you define a route in Flask?",
            options: [
                "@app.get()",
                "@route()",
                "@app.route()",
                "@flask.route()",
            ],
            correctAnswer: 2,
        },
        badge: "Web Developer",
        author: "@flaskenthusiast",
    },
    {
        id: 16,
        title: "Responsive Web Design Principles",
        description: "Design for all devices",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: 85,
        quiz: {
            question: "What's the purpose of a media query?",
            options: [
                "To play media files",
                "To apply styles based on device characteristics",
                "To query a media database",
                "To optimize images",
            ],
            correctAnswer: 1,
        },
        badge: "UI/UX Designer",
        author: "@responsivequeen",
    },
    {
        id: 17,
        title: "Redux State Management",
        description: "Predictable state container for JavaScript apps",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        duration: 110,
        quiz: {
            question: "Where is the application state stored in Redux?",
            options: [
                "In components",
                "In the store",
                "In actions",
                "In reducers",
            ],
            correctAnswer: 1,
        },
        badge: "State Management Pro",
        author: "@reduxmaster",
    },
    {
        id: 18,
        title: "Web Security Essentials",
        description: "Protect your web applications",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        duration: 120,
        quiz: {
            question: "Which of these helps prevent XSS attacks?",
            options: ["Input validation", "HTTPS", "Rate limiting", "CORS"],
            correctAnswer: 0,
        },
        badge: "Security Expert",
        author: "@securityguard",
    },
    {
        id: 19,
        title: "Next.js Server-Side Rendering",
        description: "React framework for production",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        duration: 95,
        quiz: {
            question: "What's the main benefit of SSR in Next.js?",
            options: [
                "Better SEO",
                "Smaller bundle size",
                "Faster client-side navigation",
                "Easier state management",
            ],
            correctAnswer: 0,
        },
        badge: "React Framework Specialist",
        author: "@nextjsdev",
    },
    {
        id: 20,
        title: "Machine Learning Basics",
        description: "Introduction to ML concepts",
        videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        duration: 150,
        quiz: {
            question:
                "What's the difference between supervised and unsupervised learning?",
            options: [
                "Supervised uses labeled data",
                "Unsupervised requires more compute power",
                "Supervised is always better",
                "There is no difference",
            ],
            correctAnswer: 0,
        },
        badge: "ML Beginner",
        author: "@mlenthusiast",
    },
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
                        onQuizComplete={(score) =>
                            handleQuizComplete(
                                mockLessons[currentLesson].id,
                                score
                            )
                        }
                        isCompleted={completedLessons.includes(
                            mockLessons[currentLesson].id
                        )}
                        isMobileFullscreen={true}
                    />
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block max-w-md mx-auto pt-16 md:pt-20 pb-8 px-4">
                {/* Feed Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Your Feed
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Swipe through bite-sized lessons
                    </p>
                </div>

                {/* Lesson Card Container */}
                <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                    <LessonCard
                        lesson={mockLessons[currentLesson]}
                        onQuizComplete={(score) =>
                            handleQuizComplete(
                                mockLessons[currentLesson].id,
                                score
                            )
                        }
                        isCompleted={completedLessons.includes(
                            mockLessons[currentLesson].id
                        )}
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
                                    index === currentLesson
                                        ? "bg-purple-500"
                                        : "bg-gray-600"
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
                        <div className="text-xl md:text-2xl font-bold text-white">
                            {completedLessons.length}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                            Completed
                        </div>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-700 p-3 md:p-4 text-center rounded-2xl">
                        <div className="text-xl md:text-2xl font-bold text-purple-400">
                            {mockLessons.length}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                            Available
                        </div>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-700 p-3 md:p-4 text-center rounded-2xl">
                        <div className="text-xl md:text-2xl font-bold text-pink-400">
                            {completedLessons.length}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                            Badges
                        </div>
                    </Card>
                </div>
            </div>
            <br />
            <br />
            <br />

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />
        </div>
    );
};

export default Feed;
