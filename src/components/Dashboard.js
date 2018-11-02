import React, { Component } from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAnswered: false
    }
    this.showAnsweredQuestion = this.showAnsweredQuestion.bind(this)
    this.showUnansweredQ = this.showUnansweredQ.bind(this)
  }

  showAnsweredQuestion () {
    this.setState({
      showAnswered: true
    })
  }
  showUnansweredQ () {
    this.setState({
      showAnswered: false
    })
  }

  render() {
    const { showAnswered } = this.state
    const { showUnansweredQ, showAnsweredQuestion } = this

    if (!this.props.answers && !this.props.polls) {
      console.log('nema usera')
      return <div>Loading...</div>
    }

    const answered = this.props.answers.map(id=>this.props.polls.polls[id])
    .sort((a,b)=> b.timestamp - a.timestamp)

    const unanswered_ = Object.keys(this.props.polls.polls)

    const unanswered= _.difference(unanswered_,this.props.answers)
                  .map((id)=>this.props.polls.polls[id])
                  .sort((a,b)=> b.timestamp - a.timestamp)

    const list = showAnswered ? answered : unanswered

    return (
      <div>
        <div className='dashboard-toggle'>
          <button onClick={showUnansweredQ} style={{textDecoration: showAnswered === false ? 'underline':'none' }}> Unanswered </button>
        <span>
        |
        </span>
          <button onClick={showAnsweredQuestion} style={{textDecoration: showAnswered === true ? 'underline':'none' }}> Answered </button>
        </div>
        {list.map(poll =>
          <li key={poll.id}>
            {poll.question}
          </li>
        )}
      </div>
    )
  }
}


const mapStateToProps = ({auth, polls,users})=> ({
  polls: polls ,
  users: users,
  answers: auth.user ? auth.user.answers : []
})


export default connect(mapStateToProps)(Dashboard)