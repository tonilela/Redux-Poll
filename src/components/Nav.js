import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink exact activeClassName='active' to='/' >
              Dashboard
            </NavLink>
          </li>
          <li>

            <NavLink activeClassName='active' to='/leaderboard' >
              Leader Board
            </NavLink>
          </li>
          <li>

            <NavLink activeClassName='active' to='/add' >
              Polls
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}
