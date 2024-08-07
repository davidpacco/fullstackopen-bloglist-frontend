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
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      const blogToUpdate = state.find(blog => blog.id === id)
      blogToUpdate.comments = blogToUpdate.comments.concat(comment)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, removeBlog, addComment } =
  blogSlice.actions

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.addBlog(blog)
      dispatch(
        addBlog({
          ...newBlog,
          user: {
            name: user.name,
            username: user.username,
          },
        })
      )
      dispatch(
        successNotification(`${newBlog.title} by ${newBlog.author} added`)
      )
    } catch {
      dispatch(errorNotification('Cannot create blog'))
    }
  }
}

export const likeBlog = (id, blogObject) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.likeBlog(id, blogObject)
      dispatch(updateBlog(likedBlog))
    } catch {
      dispatch(errorNotification('Cannot like blog, try again later'))
    }
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch(removeBlog(id))
    dispatch(successNotification('Blog deleted'))
  }
}

export const postComment = (id, comment) => {
  return async dispatch => {
    try {
      const newComment = await blogService.commentBlog(id, comment)
      dispatch(addComment({ id, comment: newComment }))
    } catch {
      dispatch(errorNotification('Cannot post comment, try again later'))
    }
  }
}

export default blogSlice.reducer
