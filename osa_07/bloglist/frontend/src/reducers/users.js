import usersService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL_USERS':
    return action.users;
  default:
    return state;
  }
}

export const getAllUsers = () => async (dispatch) => {
  try {
    const users = await usersService.getAll();
    dispatch({
      type: 'GET_ALL_USERS',
      users
    })
  } catch (error) {
    console.log(error);
  }
}

export default reducer;