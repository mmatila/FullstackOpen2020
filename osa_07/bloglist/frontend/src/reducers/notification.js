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
    type: 'CLEAR'
  })
  dispatch({
    type: 'NOTIFY',
    notification
  });
}

export const clear = () => (dispatch) => {
  dispatch({
    type: 'CLEAR',
  });
};

export default reducer;