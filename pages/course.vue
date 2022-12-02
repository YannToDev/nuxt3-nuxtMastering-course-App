<template>
    <div
    class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center"
    >
    <div class="prose mb-12">
      <h1>
        <span class="font-medium">
          Course:
          <span class="font-bold">Mastering Nuxt 3</span>
        </span>
      </h1>
    </div>

    <!-- partie gauche contenant les chapitres et lessons -->
    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
      >
        <h3 class="mb-4 font-semibold text-lg">Chapters</h3>
        <div
            v-for="chapter in chapters"
            :key="chapter.slug"
            class="space-y-1 mb-4 flex flex-col font-semibold"
        >
            <h4>{{ chapter.title }}</h4>

            <NuxtLink
                v-for="(lesson,index) in chapter.lessons"
                :key="lesson.slug"
                class="flex flex-row space-x-1 no-underline prose-sm font-normal"
                :to="lesson.path"
                :class="{'text-blue-500' : lesson.path === $route.fullPath,
                            'text-gray-600' : lesson.path !== $route.fullPath}"
            >   
                <span>{{( index + 1)}}</span>
                <span>{{ lesson.title }}</span>
            </NuxtLink>

        </div>
      </div>
      <div
        class="prose bg-white p-12 rounded-md w-[65ch] "
      >
       
        <NuxtPage />
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">

    // destructuring pour récupérer le tableau de chapitres dispo via le composable
    const { chapters } = useCourse();


</script>

<style scoped>

    /* permet d'ajouter du style au lien qui est actif mais on peut le faire directement dans le DOM
    en passant une classe dynamique ou nuxtLink */

    /* .router-link-active {
        @apply text-blue-500 font-bold
    } */

</style>