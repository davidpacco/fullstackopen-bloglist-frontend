import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { successNotification, errorNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.addBlog(blog)
      dispatch(addBlog(newBlog))
      dispatch(
        successNotification(`${newBlog.title} by ${newBlog.author} added`)
      )
    } catch {
      dispatch(errorNotification('Cannot create blog'))
    }
  }
}

export default blogSlice.reducer
