<template>
  <div class='max-w-4xl mx-auto p-8'>
    <header>
      <h1 class='text-2xl mb-4 text-slate-900 dark:text-white'>
        Viet Nam personal ID decoder
      </h1>
    </header>
    <main class='mx-auto'>
      <form @submit.prevent='onSubmit'>
        <div class='sm:flex items-center sm:space-x-4'>
          <label
            for='inp_personal_id'
            class='block'
          >Personal ID (12-digit)</label>
          <input
            id='inp_personal_id'
            v-model='personalId'
            type='search'
            pattern='\d{12}'
            autocomplete='off'
            class='mt-2 sm:mt-0 sm:grow bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
        </div>
      </form>
      <hr class='my-4'>
      <ResultDisplay
        v-if='personalInfo'
        :result='personalInfo'
      />
    </main>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

import { PersonalInfo } from '@/models'
import ResultDisplay from '@/components/ResultDisplay.vue'
import { extractBirthplace, extractGender, extractBirthyear } from '@/utils'

const personalId = ref('')
const personalInfo = ref<PersonalInfo | null>(null)

async function onSubmit() {
  if (personalId.value.length !== 12) {
    return
  }
  const birthplace = await extractBirthplace(personalId.value)
  const gender = extractGender(personalId.value)
  const birthyear = extractBirthyear(personalId.value)
  const randomNumber = personalId.value.slice(6)
  personalInfo.value = {
    birthplace,
    birthyear,
    gender,
    random_number: randomNumber,
  }
}

</script>
