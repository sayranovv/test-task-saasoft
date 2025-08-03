import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account, Tag } from '@/types/models.ts'

export const useMainStore = defineStore('mainStore', () => {
  const accounts = ref<Account[]>([
    {
      id: '1',
      tags: [{ text: 'tag1' }],
      type: 'local',
      login: 'login',
      password: 'qwerty123456',
    },
    {
      id: '2',
      tags: [{ text: 'tag2' }, { text: 'tag2' }],
      type: 'ldap',
      login: 'login2',
      password: 'qwerty123456',
    },
    {
      id: '3',
      tags: [{ text: 'tag3' }],
      type: 'local',
      login: 'login3',
      password: 'qwerty123456',
    },
  ])

  const addAccount = (account: Account) => accounts.value.push(account)

  const deleteAccount = (id: string) => {
    const idx = accounts.value.findIndex((account) => account.id === id)
    if (idx !== -1) {
      accounts.value.splice(idx, 1)
    }
  }

  return { accounts, addAccount, deleteAccount }
})
