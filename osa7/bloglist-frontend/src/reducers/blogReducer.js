import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name:'blogs',
  initialState:[],
  reducers:{
    createBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    updateBlogLike(state, action) {

      const id = action.payload
      const blogToChange = state.find(n => n.id === id)

      return state.map(blog =>
        blog.id !== id ? blog : blogToChange )
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
  }

})

export const { createBlog, setBlogs, updateBlogLike, deleteBlog } = blogSlice.actions
export default blogSlice.reducer