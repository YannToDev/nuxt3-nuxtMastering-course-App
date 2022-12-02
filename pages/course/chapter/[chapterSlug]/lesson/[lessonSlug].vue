<template>
    <div >
        <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
           Lesson {{ chapter?.number }} - {{ lesson?.number }}
        </p>
        
        <h2 class="my-0 font-bold text-xl">{{ lesson?.title }}</h2>

        <div class="flex space-x-4 mt-2 mb-8">
            <NuxtLink
                v-if="lesson?.sourceUrl"
                class=" text-md text-gray-500 font-semibold"
                :to="lesson?.sourceUrl"
            >
                Dowload Souce Code
            </NuxtLink>
            <NuxtLink
                v-if="lesson?.downloadUrl"
                class="font-normal text-gray-500 text-md underline"
                :to="lesson?.downloadUrl"
            >
                Dowload Video
            </NuxtLink>
        </div>

        <!-- Composant pour afficher une vidéo -->
        <VideoPlayer
            v-if="lesson?.videoId" 
            :videoId="lesson?.videoId"
        />
        
        <p>{{ lesson?.text }}</p>

        <!-- Composant de type Checkbox -->
        <LessonCompleteButton
                :model-value="isLessonComplete"
                @update:model-value="toggleComplete"
                class="inline-block mt-5"
        />

    </div>
  </template>

<script setup lang="ts">


    // constante qui contient tous les cours
    const course = useCourse();

    // const chapter = useChapter();
    const route = useRoute();
   

    // dans l'objet chapitre de nos cours on va chercher le chapitre dont le slug correspond à celui passé
    // en paramètre dans la route
    const chapter = computed(() => {

        return course.chapters.find((chapter) => chapter.slug === route.params.chapterSlug)
    })


    // dans les chapitres obtenus avec la computed précédentes on cherche le chapitre dont le slug correspond à celui 
    // passé dans l'URL
    const lesson = computed(() => {

        return chapter.value?.lessons.find((chapter) => chapter.slug === route.params.lessonSlug)
    })

    // computed qui permet de définir le titre de la page dynamiquement
    const title = computed(() => {
        return `${lesson.value?.title} - ${course.title}`
    })
    
    // useLocalStorage est une mélange de useState et localStorage, permet d'avoir useState pour définir un tableau contenant
    // plusieurs tableaux, un par chapitre et d'avoir une persistance lors du refresh de la page via localStorage
    const progress:any= useLocalStorage('progress', () => {

        return [];
    })

    // 1.on vérifie si un tableau sur le chapitre exsite, si non c'est que l'on a rien complété
    // 2. on vérifie si il la lesson existe dans le state, si non c'est que l'on a pas fait la leçon et on retoune false
    // 3. si le chapitre et la leçon existc c'est qu'elle est finie et on retourne true
    const isLessonComplete = computed(() => {
        if (!progress.value[chapter.value.number - 1]) {

            return false;
        }
        if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {

            return false;
        }
            return progress.value[chapter.value.number - 1][lesson.value.number - 1];
    });



    // méthode qui permet de changer l'état du lecon
    // 1. on vérifie si le tableau associé au chapitre existe dans le state si non, on l'initialise à un tableau vide
    // 2. si il existe alors on totoggleCompleteggle sa valeur autrement dit on donne la valeur opposé à son état de départ qui est défini
    //    par la computed "isLessonComplete"
    const toggleComplete = () => {
        
        if (!progress.value[chapter.value.number - 1]) {
    
                progress.value[chapter.value.number - 1] = [];
        }
  
        progress.value[chapter.value.number - 1][lesson.value.number - 1] = !isLessonComplete.value;
        };


    // méta pour définir le nom de la page
    useHead({
        title:`${title.value}`
    })

</script>





<!-- on peut attraper par exemple la première leçon du 1er chapitre avec l'URL suivante: -->
<!-- http://localhost:3000/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3 -->


<!-- on peut attraper les slug de l'URL avec les paramètre disponnible dans le router -->
 <!-- <p>Chapter slug: {{ $route.params.chapterSlug }}</p>
        <p>Lesson slug: {{ $route.params.lessonSlug }}</p> -->

<!-- le problème de définir le v-model de l'input comme une réf est que l'on perd le state des qu'on change de leçon car une nouvelle réf est créer
a chaque fois et stocker la progression de chaque leçon dans une ref différente à chaque fois rend difficile le suivi de la progression notamment si on 
veut stocker les données en BDD -->

<!-- state est un tableau qui contient différents tableau, un par chapitre mais n'est pas persistent disparait si on refresh la page -->
<!-- const progress:any= useState('progress', () => {

    return [];
}) -->

  <!-- on utilise clientOnly pour éviter les problèmes d'ydration quand on rafraichit la page sinon le bg
          du bouton n'est plus le bon.-->
          <!-- <ClientOnly>
            <LessonCompleteButton
                :model-value="isLessonComplete"
                @update:model-value="toggleComplete"
                class="inline-block mt-5"
            />
        </ClientOnly> -->