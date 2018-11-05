import { USER, POLLS } from '../constants/actions'

const initialState = {
  users: null,
  author: null
}


export default function users (state = initialState, action){
  switch(action.type){
    case USER.RECEIVE_USERS:
      return {
        ...state,
        users: action.users
      }
      case POLLS.ADD_POLL_FAILED:
      return {
        ...state,
        error: action.error
      }
    case USER.ADD_QUESTION_TO_AUTHOR:
      const {author, id} = action
      return{
        ...state,
        users:{
          ...state.users,
          [author]:{
            ...state.users[author],
            polls: [...state.users[author].polls, id]
           }
        }
      }
    case USER.ADD_ANSWER_TO_AUTHOR:{
      const { answerData } = action
      const { id, authedUser } = answerData
      console.log(answerData)
      return {
        ...state,
        users:{
          ...state.users,
          [authedUser]:{
            ...state.users[authedUser],
            answers: [...state.users[authedUser].answers, id]
          }
        }
      }
    }
    default:
      return state
  }
}