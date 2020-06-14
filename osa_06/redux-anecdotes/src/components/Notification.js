import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  

  // Hides the notification bar when message timer has run out
  if (props.notification.message === '') {
    style = {
      display: 'none'
    }
  }
  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps, null)(Notification)