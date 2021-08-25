import blogService from '../services/blogs';
import { notify } from './notification';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs;
  case 'CREATE_BLOG':
    return state.concat(action.blog);
  case 'UPDATE_BLOG':
    return state
      .map((blog) => blog.id === action.blog.id
        ? action.blog
        : blog
      );
  case 'REMOVE_BLOG':
    return state.filter((blog) => blog.id !== action.id);
  default:
    return state;
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  } catch (error) {
    console.log(error)
  }
}

export const createBlog = (body) => async (dispatch) => {
  try {
    const blog = await blogService.create(body)
    dispatch({
      type: 'CREATE_BLOG',
      blog
    })
    dispatch(notify({ message: `a new blog '${blog.title}' by ${blog.author} added!`, type: 'success' }));
  } catch (error) {
    console.log(error);
  }
}

export const updateBlog = (updatedBlog) => async (dispatch) => {
  try {
    const blog = await blogService.update(updatedBlog);
    dispatch({
      type: 'UPDATE_BLOG',
      blog
    })
  } catch (error) {
    console.log(error);
  }
}

export const removeBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  } catch (error) {
    console.log(error);
  }
}

export default reducer;