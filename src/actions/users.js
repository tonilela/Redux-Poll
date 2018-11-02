import { USER } from '../constants/actions'

export function receiveUsers (users) {
  return {
    users,
    type: USER.RECEIVE_USERS,
  }
}

export function addQuestionToAuthor (author, id){
  return{
    author: author,
    id: id,
    type: USER.ADD_QUESTION_TO_AUTHOR
  }
}

export function addAnswerToAuthor (answerData) {
  return {
    type: USER.ADD_ANSWER_TO_AUTHOR,
    answerData: answerData
  }
}