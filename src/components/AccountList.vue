<script setup lang="ts">
import { Trash } from 'lucide-vue-next'
import AccountListItem from '@/components/AccountListItem.vue'
import { useMainStore } from '@/stores/main.ts'

const store = useMainStore()
</script>

<template>
  <div v-if="store.accounts.length > 0">
    <div class="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 text-sm opacity-50">
      <p>Метки</p>
      <p>Тип записи</p>
      <p>Логин</p>
      <p>Пароль</p>
      <Trash class="invisible ml-3 mr-2" />
    </div>
    <div class="mt-2 space-y-3">
      <AccountListItem
        v-for="account in store.accounts"
        :key="account.id"
        :account="account"
        @delete="store.deleteAccount"
      />
    </div>
  </div>
  <div v-else>
    <p class="text-center opacity-50">Нет учетных записей</p>
  </div>
</template>
