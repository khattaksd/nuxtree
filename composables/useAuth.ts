export const useAuth = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const signIn = async (email: string, password: string) => {
    const { error } = await client.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await client.auth.signOut()
    if (error) throw error
  }

  return {
    user,
    signIn,
    signOut
  }
}