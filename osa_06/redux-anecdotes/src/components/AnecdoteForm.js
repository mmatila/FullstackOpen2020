import React from 'react'
import { connect } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    
    const handleAddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdoteAction(content)
        props.showNotification(`you added ${content}`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div><input id='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdoteAction,
    showNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)