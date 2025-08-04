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
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { useMainStore } from '@/stores/main.ts'

const prop = defineProps<{ account: Account }>()

const emit = defineEmits<{ (e: 'delete', id): void }>()

const store = useMainStore()

const formSchema = toTypedSchema(
  z.object({
    tags: z.string(),
    type: z.string(),
    login: z.string().min(4).max(100),
    password: z.string().min(4).max(100),
  }),
)

const { values, validate } = useForm({
  validationSchema: formSchema,
  initialValues: {
    tags: prop.account.tags.map((t) => t.text).join('; '),
    type: prop.account.type,
    login: prop.account.login,
    password: prop.account.password,
  },
  validateOnValueUpdate: true,
})

const parseTags = (tagsString: string) => {
  return tagsString
    .split(';')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .map((text) => ({ text }))
}

const handleBlur = async () => {
  const { valid } = values.type === 'ldap' ? { valid: true } : await validate()
  if (valid) {
    store.addAccount({
      ...prop.account,
      ...values,
      password: prop.account.type === 'ldap' ? null : values.password,
      tags: parseTags(values.tags),
    })
  }
}
</script>

<template>
  <form class="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-2">
    <FormField v-slot="{ componentField }" name="tags">
      <FormItem>
        <FormControl>
          <Input
            placeholder="Укажите метки (необязательно)"
            v-bind="componentField"
            @blur="handleBlur"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger class="w-full truncate">
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent @click="handleBlur">
              <SelectGroup>
                <SelectItem value="local" @click="account.type = 'local'"> Локальная </SelectItem>
                <SelectItem value="ldap" @click="account.type = 'ldap'"> LDAP </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    </FormField>

    <div :class="account.type === 'ldap' ? 'col-span-2' : ''">
      <FormField v-slot="{ componentField }" name="login">
        <FormItem>
          <FormControl>
            <Input placeholder="Введите логин" v-bind="componentField" @blur="handleBlur" />
          </FormControl>
        </FormItem>
      </FormField>
    </div>

    <div v-show="account.type !== 'ldap'">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormControl>
            <Input
              type="password"
              placeholder="Введите пароль"
              v-bind="componentField"
              @blur="handleBlur"
            />
          </FormControl>
        </FormItem>
      </FormField>
    </div>

    <Trash class="opacity-50 ml-3 mr-2" @click="emit('delete', account.id)" />
  </form>
</template>
