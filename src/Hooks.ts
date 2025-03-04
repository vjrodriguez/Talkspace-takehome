import { AvatarList, AvatarListItem } from './Types'

export const useOnUpdateAvatarList = (): AvatarList => {
  try {
    const keys = Object.keys(window.localStorage)
    const aList: AvatarList = []
    keys.forEach((key) => {
      // Skip non-avatar items (like theme setting)
      if (key === 'theme') return
      
      const item = window.localStorage.getItem(key) 
      // Checks if the item exists in localStorage (not null/undefined)
      if(!item) return
      try {
        const avatar = JSON.parse(item)
        // Only add items that have the expected avatar structure
        if (avatar.URL && avatar.name) {
          // Avoid directly assigning avatar.key since it can lead to accidental mutation and also violates type safety, also we avoid assigning the default json if we can if item is valid beforehand and purposefully avoid adding malformed data
          const avatarListItem: AvatarListItem = {
            key,
            name: avatar.name,
            URL: avatar.URL
          }
          aList.push(avatarListItem)
        }
      } catch (parseError) {
        // TODO: in production we can send this error to a error logging service such as Sentry
        console.error('Failed to parse item:', key, parseError)
      }
    })
    return aList
  } catch(error) {
    console.log(error)
    return []
  }
}