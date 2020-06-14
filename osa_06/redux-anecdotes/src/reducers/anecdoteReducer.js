import anecdoteService from '../services/anecdotes'

export const voteAction = (id) => {
  return async dispatch => {
    const beforeVote = await anecdoteService.getOne(id)
    console.log(beforeVote)
    const votedAnecdote = { ...beforeVote, votes: beforeVote.votes + 1 }
    await anecdoteService.updateVotes(votedAnecdote)

    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const addAnecdoteAction = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      return state
        .map(anecdote => anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
        .sort((a1, a2) => a2.votes - a1.votes)

    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer