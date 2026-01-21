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

export const toggleLessonCompletion = (lessonId: string): UserProgress => {
  const progress = getProgress();
  const index = progress.completedLessons.indexOf(lessonId);
  
  if (index > -1) {
    progress.completedLessons.splice(index, 1);
  } else {
    progress.completedLessons.push(lessonId);
  }
  
  saveProgress(progress);
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