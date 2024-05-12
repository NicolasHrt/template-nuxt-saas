<script setup lang="ts">
import { signOut } from '~/utils/auth'

const model = defineModel({
  type: Boolean
})

const toast = useToast()

const loading = ref(false)

async function onDelete() {
  loading.value = true
  const { data: response } = await useFetch('/api/user', { method: 'DELETE' })

  if (response.value.status === 204) {
    toast.add({
      title: 'Account deleted',
      icon: 'i-heroicons-check-circle'
    })
    // remove in local storage
    localStorage.clear()
    await navigateTo('/login')
  } else {
    toast.add({
      title: 'Error',
      description: 'An error occurred while deleting your account'
    })
  }
  loading.value = false
}
</script>

<template>
  <UDashboardModal
    v-model="model"
    title="Delete account"
    description="Are you sure you want to delete your account?"
    icon="i-heroicons-exclamation-circle"
    prevent-close
    :close-button="null"
    :ui="{
      icon: {
        base: 'text-red-500 dark:text-red-400'
      } as any,
      footer: {
        base: 'ml-16'
      } as any
    }"
  >
    <template #footer>
      <UButton
        color="white"
        label="Cancel"
        @click="model = false"
      />  <UButton
        color="red"
        label="Delete"
        :loading="loading"
        @click="onDelete"
      />
    </template>
  </UDashboardModal>
</template>
