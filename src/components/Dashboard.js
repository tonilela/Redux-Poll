import React, { Component } from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

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

    if (!this.props.answers && !this.props.polls && !this.props.users) {
      console.log('nema usera')
      return <div>Loading...</div>
    }
    const auth = this.props.auth
    if(this.props.users && this.props.auth){

      const answers = this.props.users[auth].answers


      const answered = answers.map(id=>this.props.polls.polls[id])
      .sort((a,b)=> b.timestamp - a.timestamp)

      const unanswered_ = Object.keys(this.props.polls.polls)

      const unanswered= _.difference(unanswered_,answers)
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
            <Link to={`polls/${poll.id}`}>
              {poll.question}
            </Link>
            </li>
          )}
        </div>
      )
    }

    return (
      <div>
        Loading...
      </div>
    )
  }
}


const mapStateToProps = ({auth, polls,users})=> ({
  polls: polls ,
  users: users ? users.users : [] ,
  answers: auth.user ? auth.user.answers : [],
  auth: auth.user ? auth.user.id : []
})


export default connect(mapStateToProps)(Dashboard)