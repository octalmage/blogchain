import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'
import SinglePost from './SinglePost'
import Author from './Author'

const Router = ()  => (
  <HashRouter>
    <div>
        <Route exact path="/" component={App} />
        <Route path="/post/:post_id" component={SinglePost} />
        <Route path="/author/:author_id" component={Author} />
    </div>
  </HashRouter>
)

export default Router;
