<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-vue-next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Account } from '@/types/models.ts'

defineProps<{ account: Account }>()

const emit = defineEmits<{
  (e: 'delete', id): void
}>()
</script>

<template>
  <div class="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-2">
    <Input
      placeholder="Укажите метки (необязательно)"
      :default-value="account.tags.map((obj) => obj.text).join('; ')"
    />
    <Select :default-value="account.type">
      <SelectTrigger class="w-full truncate">
        <SelectValue placeholder="Выберите тип" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="local"> Локальная </SelectItem>
          <SelectItem value="ldap"> LDAP </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Input placeholder="Введите логин" :default-value="account.login" />
    <Input type="password" placeholder="Введите пароль" :default-value="account.password" />
    <Trash class="opacity-50 ml-3 mr-2" @click="emit('delete', account.id)" />
  </div>
</template>
