import { getInitialData, savePoll, savePollAnswer } from '../utils/api'
import { receivePolls, addPoll, addPollsError, addAnswerToPoll } from '../actions/polls'
import { receiveUsers, addQuestionToAuthor, addAnswerToAuthor } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'


const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, polls}) => {
        dispatch(setAuthedUser(users,AUTHED_ID))
        dispatch(receiveUsers(users))
        dispatch(receivePolls(polls))
        dispatch(hideLoading())
      })
  }
}

export function handleAddPolls (poll) {
  return (dispatch, getState) => {
    const { auth } = getState()
    dispatch(showLoading())
   try{
      return savePoll({
      ...poll,
      author: auth.user.id
    }).then((poll) => {
        dispatch(addPoll(poll))
        dispatch(addQuestionToAuthor(poll.author,poll.id))
    })
      .then(() => dispatch(hideLoading()))
   }
   catch(e){
    return dispatch(addPollsError(e.message))
   }
  }
}

export function addAnswer (answerData) {
  return (dispatch) => {
    dispatch(showLoading())
    return savePollAnswer(answerData)
      .then(() => {
        dispatch(addAnswerToPoll(answerData))
        dispatch(addAnswerToAuthor(answerData))
      })
      .then(dispatch(hideLoading()))

  }
}
