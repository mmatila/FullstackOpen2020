export const showNotification = (message, durationInSeconds) => {
    return async dispatch => {
        const milliseconds = durationInSeconds * 1000
        const timer = setTimeout(() => {
            dispatch(hideNotification())
        }, milliseconds)
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                message,
                timer
            }
        })
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

const notificationReducer = (state = {message: '', timer: null}, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':

            if (state.timer !== null) {
                clearTimeout(state.timer)
            }

            return {
                message: action.data.message,
                timer: action.data.timer
            }
        case 'HIDE_NOTIFICATION':
            return {
                message: '',
                timer: null
            }
        default:
            return state
    }
}

export default notificationReducer