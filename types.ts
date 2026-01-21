
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  paragraphs: string[]; // 4 paragraphs
  exampleTitle: string;
  exampleContent: string;
  quiz: QuizQuestion[]; // 3 questions
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  content: LessonContent;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface TrackDetails {
  skills: string[];
  overview: string;
  targetAudience: string[];
  prerequisites: string[];
  outcomes: string[];
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  modules: Module[];
  details: TrackDetails; // New field for expanded content
}

export interface UserProgress {
  completedLessons: string[]; // array of lesson IDs
}

export interface Review {
  id: string;
  author: string;
  city: string;
  date: string;
  rating: number;
  comment: string;
}
