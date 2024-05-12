<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

import { authWithGoogle } from '~/utils/auth'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login'
})

const fields = [{
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
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const error = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = ''

  const supabase = useSupabaseClient()
  const { error: errorAuth } = await supabase.auth.signInWithPassword({
    email: event.email,
    password: event.password
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
  color: 'white' as const,
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
      title="Welcome back"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <NuxtLink
          to="/signup"
          class="text-primary font-medium"
        >Sign up</NuxtLink>.
      </template>
      <template #validation>
        <UAlert
          v-if="error"
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          :title="error"
        />
      </template>
      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Forgot password?</NuxtLink>
      </template>

      <template #footer>
        By signing in, you agree to our <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
