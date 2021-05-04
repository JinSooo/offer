import Cookies from 'js-cookie'

const USER_ID = 'userId'

export const getUserId = () => {
  const userId = Cookies.get(USER_ID)
  return userId ? userId.slice(3, -1) : ''
}

export const removeUserId = () => Cookies.remove(USER_ID)
