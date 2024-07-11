import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setSuccessNotification(state, action) {
      return { type: 'success', message: action.payload }
    },
    setErrorNotification(state, action) {
      return { type: 'error', message: action.payload }
    },
    clearNotification() {
      return null
    },
  },
})

export const {
  setSuccessNotification,
  setErrorNotification,
  clearNotification,
} = notificationSlice.actions

export const successNotification = message => {
  return dispatch => {
    dispatch(setSuccessNotification(message))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export const errorNotification = message => {
  return dispatch => {
    dispatch(setErrorNotification(message))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export default notificationSlice.reducer
