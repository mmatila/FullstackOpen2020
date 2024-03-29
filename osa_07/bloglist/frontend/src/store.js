import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import notification from './reducers/notification';
import blogs from './reducers/blogs';
import users from './reducers/users';
import user from './reducers/user';

const reducers = combineReducers({
  notification,
  blogs,
  users,
  user
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;