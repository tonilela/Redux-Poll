import React, { Component, Fragment } from 'react'
import {handleInitialData} from '../actions/shared'
import {connect} from 'react-redux'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import LeaderBoard from './LeaderBoard'
import AddPoll from './AddPoll'
import Poll from './Poll'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())

  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
            ? null
            : <div>
                <Switch>
                <Route
                  exact
                  path='/'
                  Component={Dashboard}
                />
                <Route
                  path='/leaderboard'
                  Component={LeaderBoard}
                />
                <Route
                  path='/polls/:id'
                  Component={Poll}
                />
                  <Route
                  path='/add'
                  Component={AddPoll}
                />
                </Switch>
              </div>}
          </div>
        </Fragment>
      </ BrowserRouter>
    )
  }
}

function mapStateToProps(authUser){
  return{
    loading: authUser === null,
  }
}

export default connect(mapStateToProps)(App)