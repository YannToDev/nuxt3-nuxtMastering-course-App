// -------- COMPOSABLE QUI PERMET DE RETOURNER UNIQUEMENT LES COURS --------

import courseData from "./courseData";

// composable
export const useCourse = () => {

    return {
        ...courseData,
        chapters: courseData.chapters.map((chapter) =>({
            ...chapter,

            lessons: chapter.lessons.map((lesson) => ({
                ...lesson,

                path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
            }))
        }))
    }
};