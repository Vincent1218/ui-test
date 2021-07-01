import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react'
import Book from './Pages/Book'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Book} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
