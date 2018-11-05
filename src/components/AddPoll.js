import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPolls } from '../actions/shared'


class AddPoll extends Component {
  constructor(prosp){
    super(prosp)
    this.state = {
      question: '',
      a: '',
      b: '',
      c: '',
      d: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isDisabled = this.isDisabled.bind(this)
  }

  handleChange (e) {
    const {value ,name} = e.target

    this.setState({
      [name]:value
    })
  }

  isDisabled () {
    const { question, a, b, c, d } = this.state

    return question === '' || a === '' || b === '' || c === '' || d === ''
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.history.push('/')
    this.props.dispatch(handleAddPolls(this.state))
  }
  render () {
    const { handleChange, handleSubmit, isDisabled } = this
    const { question, a, b, c, d} = this.state
    return (
      <div>
        <form className='add-form' onSubmit={handleSubmit}>
          What is your Question?AddPoll
          <input
            type='text'
            name='question'
            className='input'
            value={question}
            onChange={handleChange}
          />
          what are the options
          <li>
            <label>
             A.
            </label>
            <input
              type='text'
              name='a'
              className='input'
              value={a}
              onChange={handleChange}
            />
          </li>
          <li>
            <label>
              B.
            </label>
            <input
              type='text'
              name='b'
              className='input'
              value={b}
              onChange={handleChange}
            />
          </li>
          <li>
            <label>
              C.
            </label>
            <input
              type='text'
              name='c'
              className='input'
              value={c}
              onChange={handleChange}
            />
          </li>
          <li>
            <label>
              D.
            </label>
            <input
              type='text'
              name='d'
              className='input'
              value={d}
              onChange={handleChange}
            />
          </li>
          <button type="submit" disabled={isDisabled()}>
            submit
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect (mapStateToProps) (AddPoll)