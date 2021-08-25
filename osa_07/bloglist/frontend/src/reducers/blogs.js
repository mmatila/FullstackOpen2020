import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.blogs;
  case 'CREATE':
    return state.concat(action.blog);
  case 'UPDATE':
    return state
      .map((blog) => blog.id === action.blog.id
        ? action.blog
        : blog
      );
  default:
    return state;
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
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
      type: 'CREATE',
      blog
    })
  } catch (error) {
    console.log(error);
  }
}

export const updateBlog = (updatedBlog) => async (dispatch) => {
  try {
    const blog = await blogService.update(updatedBlog);
    dispatch({
      type: 'UPDATE',
      blog
    })
  } catch (error) {
    console.log(error);
  }
}

export default reducer;