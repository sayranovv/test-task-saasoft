import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types/models.ts'

export const useMainStore = defineStore('mainStore', () => {
  const loadAccounts = (): Account[] => {
    const saved = localStorage.getItem('accounts')
    if (!saved) return []

    return JSON.parse(saved)
      .filter((account: Account) => account.login.trim() !== '')
      .map((account: Account) => {
        if (account.type === 'local' && account.password === null) {
          return { ...account, type: 'ldap' }
        }
        return account
      })
  }

  const accounts = ref<Account[]>(loadAccounts())

  watch(
    accounts,
    (newAccounts) => {
      localStorage.setItem('accounts', JSON.stringify(newAccounts))
    },
    { deep: true },
  )

  const addAccount = (account: Account) => {
    const existingIndex = accounts.value.findIndex((a) => a.id === account.id)
    if (existingIndex !== -1) {
      accounts.value[existingIndex] = account
    } else {
      accounts.value.push(account)
    }
  }

  const deleteAccount = (id: string) => {
    const idx = accounts.value.findIndex((account) => account.id === id)
    if (idx !== -1) {
      accounts.value.splice(idx, 1)
    }
  }

  return { accounts, addAccount, deleteAccount }
})
