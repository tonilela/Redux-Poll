import { POLLS } from '../constants/actions'

export function receivePolls (polls) {
  return {
    polls,
    type: POLLS.RECEIVE_POLLS,
  }
}

export function addPoll (poll) {
  return {
    poll,
    type: POLLS.ADD_POLL,
  }
}

export function addPollsError (error) {
  return {
    error,
    type: POLLS.ADD_POLL_FAILED,
  }
}

export function addAnswerToPoll (answerData) {
  return {
    type: POLLS.ADD_ANSWER_TO_POLL,
    answerData: answerData
  }
}