import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPercentage } from '../utils/helpers'
import { addAnswer } from '../actions/shared';

const getVoteKeys = () => ['aVotes','bVotes','cVotes','dVotes']

class Poll extends Component {
  constructor(props){
    super(props)
    this.handleAnswer = this.handleAnswer.bind(this)
  }
  handleAnswer (answer) {
    const { poll, id } = this.props

    this.answered = true

    this.props.dispatch(addAnswer({
      authedUser: id,
      answer,
      id: poll.id,
    }))
  }
  render () {
    if(this.props.poll === null){
      return (
        <p>
          This paragraph doesn`t exist
        </p>
      )
    }

    const { poll, avatar, vote} = this.props
    const { handleAnswer } = this
    const total = getVoteKeys().reduce((total,key)=>
      total + poll[key].length,0)

    return (
      <div className='poll-container'>
        <h1 className='question'>
          {poll.question}
        </h1>
      <div className='poll-author'>
        by <img src={avatar} alt='avatar'/>
      </div>
      <ul>
        {['aText','bText','cText','dText'].map((key) => {
          const count = poll[key[0]+'Votes'].length
          return(
            <li
              onClick={() => {
                if(vote === null && !this.answered)
                handleAnswer(key[0])
              }}
              className={`option ${vote === key[0] ? 'chosen':''}`}
              key={key}>
              {vote === null ? poll[key]
                :<div className='result'>
                    <span>
                      {poll[key]}
                    </span>
                    <span>
                      {getPercentage(count,total)}% ({count})
                    </span>
                </div> }

            </li>
          )
        })}
      </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, polls, users }, {match} ) => {
  const { id } = match.params
  const poll = polls.polls[id]

  if(!poll){
    return{
      poll: null
    }
  }

  if(auth.user !== null){

    const { id } = auth.user

    const vote = getVoteKeys().reduce((vote, key) => {

      if(vote !== null){
        return vote[0]
      }

      return poll[key].includes(id) ? key : vote
    }, null)

    return {
      poll,
      vote,
      id,
      avatar: auth.user.avatarURL
    }
  }
}

export default connect (mapStateToProps) (Poll)
