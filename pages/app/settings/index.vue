<script setup lang="ts">
import { z } from 'zod'

import type { FormSubmitEvent } from '#ui/types'
import DeleteAccountModal from '~/components/Dashboard/Settings/DeleteAccountModal.vue'

const isDeleteAccountModalOpen = ref(false)
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const state = reactive({
  full_name: user.value.user_metadata.full_name,
  email: user.value.email,
  password_new: '',
  password_confirm: ''
})

const toast = useToast()

const schema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email')
})

type Schema = z.output<typeof schema>

const error = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const dataToSend = {
    email: event.data.email,
    data: {
      full_name: event.data.full_name
    }
  }
  if (event.data.password_new && event.data.password_new === event.data.password_confirm) {
    dataToSend['password'] = event.data.password_new
  } else if (event.data.password_new && event.data.password_new !== event.data.password_confirm) {
    error.value = 'Passwords do not match'
    return
  }
  const { error: errorUser } = await supabase.auth.updateUser(dataToSend)
  event.data.password_new = ''
  event.data.password_confirm = ''
  console.log(errorUser)
  if (errorUser) {
    error.value = errorUser.message
  } else {
    toast.add({ title: 'Profile updated', icon: 'i-heroicons-check-circle' })
  }
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Theme"
      description="Customize the look and feel of your dashboard."
    >
      <template #links>
        <UColorModeSelect color="gray" />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm
      :state="state"
      :schema="schema"
      :validate-on="['submit']"
      @submit="onSubmit"
    >
      <UDashboardSection
        title="Profile"
        description="This information will be displayed publicly so be careful what you share."
      >
        <UAlert
          v-if="error"
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          :title="error"
        />
        <template #links>
          <UButton
            type="submit"
            label="Save changes"
            color="black"
          />
        </template>

        <UFormGroup
          name="full_name"
          label="Full name"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.full_name"
            type="text"
            autocomplete="off"
            icon="i-heroicons-user"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="Email"
          description="Used to sign in, for email receipts and product updates."
          required

          class="
          grid
          grid-cols-2
          gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.email"
            type="email"
            :disabled="user.app_metadata.provider !== 'email'"
            autocomplete="off"
            icon="i-heroicons-envelope"
            size="md"
          />
        </UFormGroup>

        <UFormGroup
          v-if="user.app_metadata.provider === 'email'"
          name="password"
          label="Password"
          description="Confirm your current password before setting a new one."
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            id="password_new"
            v-model="state.password_new"
            type="password"
            placeholder="New password"
            size="md"
            class="mb-2"
          />
          <UInput
            id="password_confirm"
            v-model="state.password_confirm"
            type="password"
            placeholder="Confirm new password"
            size="md"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />

    <UDashboardSection
      title="Account"
      description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
    >
      <div>
        <UButton
          color="red"
          label="Delete account"
          size="md"
          @click="isDeleteAccountModalOpen = true"
        />
      </div>
    </UDashboardSection>

    <!-- ~/components/settings/DeleteAccountModal.vue -->
    <DeleteAccountModal v-model="isDeleteAccountModalOpen" />
  </UDashboardPanelContent>
</template>
