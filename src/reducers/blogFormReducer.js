import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  url: '',
}

const blogFormSlice = createSlice({
  name: 'blog-form',
  initialState,
  reducers: {
    updateTitle(state, action) {
      return { ...state, title: action.payload }
    },
    updateAuthor(state, action) {
      return { ...state, author: action.payload }
    },
    updateUrl(state, action) {
      return { ...state, url: action.payload }
    },
    resetForm() {
      return initialState
    },
  },
})

export const { updateAuthor, updateTitle, updateUrl, resetForm } =
  blogFormSlice.actions

export const setTitle = title => {
  return dispatch => dispatch(updateTitle(title))
}

export const setAuthor = author => {
  return dispatch => dispatch(updateAuthor(author))
}

export const setUrl = url => {
  return dispatch => dispatch(updateUrl(url))
}

export const resetBlogForm = () => {
  return dispatch => dispatch(resetForm())
}

export default blogFormSlice.reducer
