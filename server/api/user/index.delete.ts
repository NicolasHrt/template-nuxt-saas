import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  if (!user) {
    return { status: 404, body: { error: 'Not authorized' } }
  }
  console.log('Deleting user', user.id)
  await client.auth.admin.deleteUser(user.id)
  return { status: 204 }
})
