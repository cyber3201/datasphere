import { UserProgress } from '../types';

const STORAGE_KEY = 'datasphere_progress';

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { completedLessons: [] };
  } catch (e) {
    return { completedLessons: [] };
  }
};

export const saveProgress = (progress: UserProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

// Save progress to database
export const saveProgressToDb = async (lessonId: string, completed: boolean) => {
  const userId = localStorage.getItem('datasphere_user_id');
  if (!userId) {
    console.log('No user ID found, skipping database sync');
    return; // Not logged in to database
  }

  try {
    const response = await fetch('/.netlify/functions/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'saveProgress',
        data: {
          user_id: parseInt(userId),
          lesson_id: lessonId,
          completed
        }
      })
    });

    if (!response.ok) {
      console.error('Failed to save progress to database');
    }
  } catch (error) {
    console.error('Failed to save progress to database:', error);
  }
};

export const toggleLessonCompletion = (lessonId: string): UserProgress => {
  const progress = getProgress();
  const index = progress.completedLessons.indexOf(lessonId);

  if (index > -1) {
    progress.completedLessons.splice(index, 1);
  } else {
    progress.completedLessons.push(lessonId);
  }

  saveProgress(progress);

  // Also save to database (async, don't wait)
  const completed = index === -1; // true if we just added it
  saveProgressToDb(lessonId, completed);

  return progress;
};

export const isLessonCompleted = (lessonId: string): boolean => {
  const progress = getProgress();
  return progress.completedLessons.includes(lessonId);
};

export const getTrackProgressPercentage = (trackId: string, tracks: any): number => {
  const track = tracks[trackId];
  if (!track) return 0;

  let totalLessons = 0;
  let completedCount = 0;
  const progress = getProgress();

  track.modules.forEach((mod: any) => {
    mod.lessons.forEach((lesson: any) => {
      totalLessons++;
      if (progress.completedLessons.includes(lesson.id)) {
        completedCount++;
      }
    });
  });

  if (totalLessons === 0) return 0;
  return Math.round((completedCount / totalLessons) * 100);
};