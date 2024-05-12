<script setup lang="ts">
import { signOut } from '~/utils/auth'

const user = useSupabaseUser()

const items = computed(() => [
  [{
    slot: 'account',
    label: '',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/app/settings'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => {
      signOut()
    }
  }]
])
</script>

<template>
  <UDropdown
    v-if="user"
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="user.user_metadata.full_name || 'Account'"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            :src="user.user_metadata.avatar_url"
            size="sm"
            :alt="user.user_metadata.full_name || 'Account'"
          />
        </template>

        <template #trailing>
          <UIcon
            name="
            i-heroicons-ellipsis-vertical"
            class="w-5 h-5 ml-auto"
          />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
