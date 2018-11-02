import { POLLS } from '../constants/actions'

const initialState = {
  polls: []
}

export default function polls (state = initialState, action) {
  switch(action.type) {
    case POLLS.RECEIVE_POLLS:
      return {
        ...state,
        polls: action.polls,
        error: null
      }
    case POLLS.ADD_POLL_FAILED:
      return {
        ...state,
        error: action.error
      }
    case POLLS.ADD_POLL:{
      const { id } = action.poll
      return {
        ...state,
      polls: {
        ...state.polls,
        [id]: action.poll
        }
      }
    }

    case POLLS.ADD_ANSWER_TO_POLL:{
      const { answerData } = action
      const { id, authedUser, answer } = answerData
      const poll = state.polls[id]
      const votesKey = answer + 'Votes'

      return {
        ...state,
        polls:{
          ...state.polls,
          [id]:{
            ...poll,
            [votesKey]: poll[votesKey].concat([authedUser])
          }
        }

      }
    }

    default:
      return state
  }
}