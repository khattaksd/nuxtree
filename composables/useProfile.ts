import { z } from 'zod'

const profileSchema = z.object({
  username: z.string().min(3).max(50),
  display_name: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
  theme: z.string().optional()
})

export const useProfile = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const getProfile = async (username: string) => {
    const { data, error } = await client
      .from('profiles')
      .select()
      .eq('username', username)
      .single()
    
    if (error) throw error
    return data
  }

  const updateProfile = async (profile: z.infer<typeof profileSchema>) => {
    if (!user.value?.id) throw new Error('Not authenticated')
    
    const validatedData = profileSchema.parse(profile)
    const { error } = await client
      .from('profiles')
      .update(validatedData)
      .eq('id', user.value.id)

    if (error) throw error
    return true
  }

  return {
    getProfile,
    updateProfile
  }
}