import loginService from '../services/login';
import storage from '../utils/storage';
import { notify } from './notification';

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT_USER':
    return null;
  default:
    return state;
  }
}

export const setUser = () => (dispatch) => {
  const user = storage.loadUser();
  dispatch({
    type: 'SET_USER',
    user
  })
}

export const login = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    dispatch({
      type: 'SET_USER',
      user
    });
    storage.saveUser(user);
    dispatch(notify({ message: `${user.name} welcome back!`, type: 'success' }));
  } catch (error) {
    dispatch(notify({ message: 'wrong username/password', type: 'error' }));
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT_USER',
  });
  storage.logoutUser();
}

export default reducer;
