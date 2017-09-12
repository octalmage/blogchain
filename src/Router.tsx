import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App.tsx'
import Post from './Post.tsx'

const Router: React.SFC = () => (
  <BrowserRouter>
    <div>
        <Route exact path="/" component={App}/>
        <Route path="/post/:post_id" component={Post}/>
    </div>
  </BrowserRouter>
)

export default Router;
