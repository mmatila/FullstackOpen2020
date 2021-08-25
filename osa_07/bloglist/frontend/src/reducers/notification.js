const reducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.notification;
  case 'CLEAR':
    return null;
  default:
    return state;
  }
};

export const notify = (notification) => (dispatch) => {
  dispatch({
    type: 'NOTIFY',
    notification
  });
  setTimeout(() => dispatch(clear()), 5000);
}

export const clear = () => (dispatch) => {
  dispatch({
    type: 'CLEAR',
  });
};

export default reducer;