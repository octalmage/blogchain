import * as React from 'react';
import getWeb3 from './utils/getWeb3';
import './App.css';
import 'normalize.css';
import 'flexboxgrid';
import Header from './Header'
import BlogForm from './BlogForm'
import PostList from './PostList'
import { Props, State } from './BlogChainInterfaces'
import Blog from './utils/Blog';

class App extends React.Component<Props, State> {
  state: State;
  blog: Blog;
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.loadBlogPosts = this.loadBlogPosts.bind(this);
    this.addBlogPost = this.addBlogPost.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);

    this.blog = new Blog(getWeb3);
  }

  componentWillMount() {
    return this.blog.initialized()
      .then(() => {
        this.loadBlogPosts();

        this.blog.web3.eth.filter('latest', (error) => {
          if (!error) {
            this.loadBlogPosts();
          } else {
            console.error(error);
          }
        });
      });
  }

  loadBlogPosts() {
    return this.blog.getBlogPosts()
      .then((posts) => {
        this.setState({ posts: posts.reverse() });
      });
  }

  addBlogPost(title: string, content: string) {
    return this.blog.addBlogPost(title, content);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <PostList posts={this.state.posts} />
        <BlogForm onSubmit={this.addBlogPost} />
      </div>
    );
  }
}

export default App;
