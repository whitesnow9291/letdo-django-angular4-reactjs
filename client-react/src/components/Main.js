import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from './About'
import Portfolio from './Portfolio'
import PortfolioEdit from './PortfolioEdit'
import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={About}/>
      <Route path='/portfolio' component={Portfolio}/>
      <Route path='/schedule' component={Schedule}/>
      <Route path='/portfolioedit' component = {PortfolioEdit}/>
    </Switch>
  </main>
)

export default Main
