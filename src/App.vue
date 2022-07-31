<template>
  <div class='max-w-4xl mx-auto p-8'>
    <header>
      <h1 class='text-2xl mb-4'>Viet Nam personal ID decoder</h1>
    </header>
    <main class='mx-auto'>
      <form @submit.prevent='onSubmit'>
        <div class='flex items-center space-x-4'>
          <label class='block'>Personal ID (12 digit)</label>
          <input v-model='personalId' type='text' minlength='12' autocomplete='off'
          class='grow focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md'>
        </div>
      </form>
      <ResultDisplay v-if='personalInfo' :result='personalInfo' />
    </main>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

import { PersonalInfo } from '@/models'
import ResultDisplay from '@/components/ResultDisplay.vue'

const personalId = ref('')
const personalInfo = ref<PersonalInfo | null>(null)

function onSubmit() {
  if (personalId.value.length < 12) {
    return
  }
}

</script>
