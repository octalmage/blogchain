import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'
import SinglePost from './SinglePost'
import Author from './Author.tsx'

const Router = ()  => (
  <BrowserRouter>
    <div>
        <Route exact path="/" component={App} />
        <Route path="/post/:post_id" component={SinglePost} />
        <Route path="/author/:author_id" component={Author} />
    </div>
  </BrowserRouter>
)

export default Router;
