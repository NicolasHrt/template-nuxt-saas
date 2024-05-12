<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

import { authWithGoogle } from '~/utils/auth'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up'
})

const fields = [
  {
    name: 'full_name',
    type: 'text',
    label: 'Full name',
    placeholder: 'Enter your full name'
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Enter your email'
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  }]

const schema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const error = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = ''

  const supabase = useSupabaseClient()
  const { error: errorAuth } = await supabase.auth.signUp({
    email: event.email,
    password: event.password,
    options: {
      data: {
        full_name: event.full_name
      }
    }
  })
  if (errorAuth) {
    error.value = errorAuth.message
  } else {
    await navigateTo('/app')
  }
}

const providers = [{
  label: 'Continue with Google',
  icon: 'i-simple-icons-google',
  color: 'gray' as const,
  click: async () => {
    await authWithGoogle()
  }
}]
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      :providers="providers"
      align="top"
      title="Create an account"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Create account' }"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account? <NuxtLink
          to="/login"
          class="text-primary font-medium"
        >Login</NuxtLink>.
      </template>
      <template #validation>
        <UAlert
          v-if="error"
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          :title="error"
        />
      </template>
      <template #footer>
        By signing up, you agree to our <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
