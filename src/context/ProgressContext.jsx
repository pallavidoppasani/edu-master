import React, { createContext, useContext, useState, useEffect } from 'react';

// ProgressContext stores lightweight, client-side course progress.
// It persists a small structure in localStorage (`courseProgress`) and exposes helpers
// that UI components can use to mark lessons complete/incomplete and to compute
// progress percentages. This is intentionally local-only (fast UI response) —
// server synchronization happens in background API calls elsewhere when needed.
const ProgressContext = createContext();

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

export const ProgressProvider = ({ children }) => {
    // Load progress from localStorage on first render. Structure is:
    // { [courseId]: { completedLessons: [lessonId, ...], lastAccessed: ISOString } }
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('courseProgress');
        return saved ? JSON.parse(saved) : {};
    });

    // Persist progress to localStorage whenever it changes.
    useEffect(() => {
        localStorage.setItem('courseProgress', JSON.stringify(progress));
    }, [progress]);

    // Add a lesson id to the completedLessons list for a course
    const markLessonComplete = (courseId, lessonId) => {
        setProgress(prev => {
            const courseProgress = prev[courseId] || { completedLessons: [] };
            const completedLessons = courseProgress.completedLessons || [];

            if (!completedLessons.includes(lessonId)) {
                return {
                    ...prev,
                    [courseId]: {
                        ...courseProgress,
                        completedLessons: [...completedLessons, lessonId],
                        lastAccessed: new Date().toISOString()
                    }
                };
            }
            return prev;
        });
    };

    // Remove a lesson id from the completedLessons list
    const markLessonIncomplete = (courseId, lessonId) => {
        setProgress(prev => {
            const courseProgress = prev[courseId] || { completedLessons: [] };
            return {
                ...prev,
                [courseId]: {
                    ...courseProgress,
                    completedLessons: courseProgress.completedLessons.filter(id => id !== lessonId),
                    lastAccessed: new Date().toISOString()
                }
            };
        });
    };

    // Utility: check if a lesson is marked complete locally
    const isLessonComplete = (courseId, lessonId) => {
        const courseProgress = progress[courseId];
        if (!courseProgress) return false;
        return courseProgress.completedLessons?.includes(lessonId) || false;
    };

    // Compute percentage progress for a course given total lessons count
    const getCourseProgress = (courseId, totalLessons) => {
        const courseProgress = progress[courseId];
        if (!courseProgress || !totalLessons) return 0;
        const completed = courseProgress.completedLessons?.length || 0;
        return Math.round((completed / totalLessons) * 100);
    };

    const getCompletedLessonsCount = (courseId) => {
        const courseProgress = progress[courseId];
        return courseProgress?.completedLessons?.length || 0;
    };

    const getAllProgress = () => progress;

    const value = {
        markLessonComplete,
        markLessonIncomplete,
        isLessonComplete,
        getCourseProgress,
        getCompletedLessonsCount,
        getAllProgress
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
