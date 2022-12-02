<!-- Cet input de type checkox qui a pour valeur la props modelValue qu'il reçoit et qui vaut la computed "sLessonComplete" 
 qui retourne un Boolean. Quand on update cet input on envoi un émit vers le composant avec la valeur opposée de sa valeur actuelle
cela déclenche alors la méthode "toggleComplete" qui toggle l'état de progression de la tâche-->

<template> 
    <label
        class="rounded text-white font-bold py-2 px-4 cursor-pointer"
        :class="{
            'bg-green-500': modelValue,
            'bg-gray-500': !modelValue,
        }"    
    >
        <input
            type="checkbox"
            :value="modelValue"
            @input ="() => $emit('update:modelValue', !modelValue)"
            class="hidden"
        />
        {{ modelValue? 'Completed!' : 'Mark as complete' }}
    </label>
</template>

<script setup lang="ts">

    defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
    });

    defineEmits(['update:modelValue']);

</script>

<style scoped>

    ::selection{
        display:none;
    }

</style>

