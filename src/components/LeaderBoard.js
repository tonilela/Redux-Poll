import React, { Component } from 'react'
import {connect} from 'react-redux'

class LeaderBoard extends Component {

  render() {

    if (this.props.loadingBar.default !== 0) {
      return(
        <div>
          Loading...
        </div>
      )
    }


    return (
      <div>
        {Object.keys(this.props.users.users)
          .map(id=>{
            const {name, avatarURL, polls, answers} = this.props.users.users[id]
            return(
              <li key={id} >
              <div className='moj' >
                <img src={avatarURL} alt='user' className='avatar'/>
                <span>
                  {name}
                </span>
                <span>
                  Number of polls {polls.length}
                </span>
                <span>
                  Number of answers {answers.length}
                </span>
              </div>
              </li>
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = state => state

export default connect (mapStateToProps)(LeaderBoard)