export async function authWithGoogle() {
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `/http://localhost:3000/app`
    }
  })
  if (error) console.log(error)
}

export async function signOut() {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  await navigateTo('/')
}
