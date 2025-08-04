<script setup lang="ts">
import { Button } from '@/components/ui/button'
import AccountList from '@/components/AccountList.vue'
import { Plus, CircleQuestionMark } from 'lucide-vue-next'
import { useMainStore } from '@/stores/main.ts'

const store = useMainStore()
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-5">
    <header class="flex gap-4 items-center">
      <h1 class="text-2xl font-bold">Учетные записи</h1>
      <Button
        class="h-14 w-14"
        variant="outline"
        @click="
          store.addAccount({
            id: Date.now(),
            tags: [{ text: '' }],
            type: null,
            login: '',
            password: '',
          })
        "
      >
        <Plus />
      </Button>
    </header>
    <main>
      <section class="flex gap-2 items-center bg-blue-50 rounded-lg py-2 px-3 my-6">
        <CircleQuestionMark />
        <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
      </section>
      <AccountList />
    </main>
  </div>
</template>
