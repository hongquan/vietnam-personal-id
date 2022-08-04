<template>
  <div class='overflow-x-auto relative shadow-md rounded sm:rounded-lg'>
    <!-- Ref: https://flowbite.com/docs/components/tables/ -->
    <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <th
          scope='col'
          class='py-3 px-6'
        >
          Info
        </th>
        <th
          scope='col'
          class='py-3 px-6'
        >
          Value
        </th>
      </thead>
      <tbody>
        <tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
          <th
            scope='row'
            class='py-3 px-6'
          >
            Birth registration place
          </th>
          <td class='py-3 px-6'>
            {{ result.birthplace }}
          </td>
        </tr>
        <tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
          <th
            scope='row'
            class='py-3 px-6'
          >
            Birthyear
          </th>
          <td class='py-3 px-6'>
            {{ result.birthyear }}
          </td>
        </tr>
        <tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
          <th
            scope='row'
            class='py-3 px-6'
          >
            Gender
          </th>
          <td class='py-3 px-6'>
            {{ genderDisplay[result.gender] }}
          </td>
        </tr>
        <tr class='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
          <th
            scope='row'
            class='py-3 px-6'
          >
            Random number
          </th>
          <td class='py-3 px-6'>
            {{ result.random_number }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang='ts'>
import { Gender, PersonalInfo } from '@/models'

interface Props {
  result: PersonalInfo
}

defineProps<Props>()

const genderDisplay = {
  [Gender.Male]: 'Male',
  [Gender.Female]: 'Female',
}
</script>
