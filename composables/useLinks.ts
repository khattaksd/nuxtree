export const useLinks = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const getLinks = async (profileId: string) => {
    const { data, error } = await client
      .from('social_links')
      .select()
      .eq('profile_id', profileId)
      .order('order_index')
    
    if (error) throw error
    return data
  }

  const createLink = async (link: { title: string; url: string; platform: string }) => {
    if (!user.value?.id) throw new Error('Not authenticated')
    
    const { error } = await client
      .from('social_links')
      .insert({
        ...link,
        profile_id: user.value.id
      })

    if (error) throw error
    return true
  }

  const updateLink = async (id: string, link: { title: string; url: string; platform: string }) => {
    if (!user.value?.id) throw new Error('Not authenticated')
    
    const { error } = await client
      .from('social_links')
      .update(link)
      .eq('id', id)
      .eq('profile_id', user.value.id)

    if (error) throw error
    return true
  }

  const deleteLink = async (id: string) => {
    if (!user.value?.id) throw new Error('Not authenticated')
    
    const { error } = await client
      .from('social_links')
      .delete()
      .eq('id', id)
      .eq('profile_id', user.value.id)

    if (error) throw error
    return true
  }

  return {
    getLinks,
    createLink,
    updateLink,
    deleteLink
  }
}