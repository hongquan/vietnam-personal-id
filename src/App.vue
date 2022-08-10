<template>
  <div class='max-w-4xl mx-auto flex flex-col h-full px-4'>
    <HeaderBar
      :locale='selectedLocale'
      @locale-selected='preferLocale($event)'
    />
    <main class='mx-auto grow sm:w-full'>
      <form @submit.prevent='onSubmit'>
        <div class='sm:flex items-center sm:space-x-4'>
          <label
            for='inp_personal_id'
            class='block'
          >{{ $t('personal-id-12-digit') }}</label>
          <input
            id='inp_personal_id'
            v-model='personalId'
            type='search'
            pattern='\d{12}'
            autocomplete='off'
            class='mt-2 sm:mt-0 sm:grow bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded sm:rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
        </div>
      </form>
      <hr class='my-4'>
      <ResultDisplay
        v-if='personalInfo'
        :result='personalInfo'
      />
    </main>
    <footer class='text-sm p-4 border-t border-gray-200 dark:border-gray-600 flex justify-between'>
      <div>
        {{ $t('author') }}: <a
          href='https://quan.hoabinh.vn'
          class='text-sky-500 dark:text-sky-400'
        >Nguyễn Hồng Quân</a>
      </div>
      <a
        href='https://github.com/hongquan/vietnam-personal-id'
        class='block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300'
      >
        <svg
          viewBox='0 0 16 16'
          class='w-5 h-5'
          fill='currentColor'
          aria-hidden='true'
        ><path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' /></svg>
      </a>
    </footer>
  </div>
</template>

<fluent locale='en'>
personal-id-12-digit = Personal ID (12-digit)
author = Author
</fluent>

<fluent locale='vi'>
personal-id-12-digit = Mã định danh cá nhân (12 số)
author = Tác giả
</fluent>

<script setup lang='ts'>
import { onBeforeMount, ref, watch } from 'vue'
import { getUserLocale } from 'get-user-locale'

import { Language, PersonalInfo } from '@/models'
import HeaderBar from '@/components/HeaderBar.vue'
import ResultDisplay from '@/components/ResultDisplay.vue'
import { extractBirthplace, extractGender, extractBirthyear } from '@/utils'
import { preferLocale } from '@/translation'

const selectedLocale = ref(Language.EN)
const personalId = ref('')
const personalInfo = ref<PersonalInfo | null>(null)

function onSubmit() {
  if (personalId.value.length !== 12) {
    return
  }
  const birthplace = extractBirthplace(personalId.value)
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

onBeforeMount(() => {
  const userLocale = getUserLocale()
  if (userLocale.startsWith(Language.VI)) {
    selectedLocale.value = Language.VI
    preferLocale(Language.VI)
  }
})

watch(personalId, (newValue, oldValue) => {
  if (newValue.length < oldValue.length) {
    personalInfo.value = null
  }
})

</script>
