import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { errorNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser } = userSlice.actions

export const initialUser = () => {
  return dispatch => {
    const userInLocalStorage = JSON.parse(
      window.localStorage.getItem('BloglistAppUser')
    )

    if (userInLocalStorage) {
      dispatch(setUser(userInLocalStorage))
      blogService.setToken(userInLocalStorage.token)
    }
  }
}

export const login = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('BloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (e) {
      dispatch(errorNotification('Wrong username or password'))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('BloglistAppUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
