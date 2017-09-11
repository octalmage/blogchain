import * as React from 'react';
import contract from 'truffle-contract';
import getWeb3 from './utils/getWeb3';
import * as BlogContract from '../build/contracts/Blog.json';
import './App.css';
import 'normalize.css';
import 'flexboxgrid';
import BlogForm from './BlogForm'
import PostList from './PostList'
import {BlogInstance, Props, State, Post} from './BlogChainInterfaces'

class App extends React.Component<Props, State> {
  state: State;
  constructor() {
    super();

    this.state = {
      posts: [],
      web3: null,
    };

    this.instantiateContract = this.instantiateContract.bind(this);
    this.addBlogPost = this.addBlogPost.bind(this);
    this.convertPost = this.convertPost.bind(this);
    this.convertPosts = this.convertPosts.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then((results) => {
      this.setState({ web3: results.web3 }, () => {
        // On new post reload the blog posts.
        this.state.web3.eth.filter('latest', (error) => {
          if (!error) {
            this.instantiateContract();
          } else {
            console.error(error);
          }
        });

        // Instantiate contract once web3 provided.
        this.instantiateContract();

        // this.addBlogPost('Test', 'This is a test.');
      });
    })
    .catch((err) => {
      console.log('Error finding web3.');
    });
  }

  instantiateContract() {
    /*
    * SMART CONTRACT EXAMPLE
    *
    * Normally these functions would be called in the context of a
    * state management library, but for convenience I've placed them here.
    */
    const blog = contract(BlogContract);
    blog.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions.
    let blogInstance: BlogInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error: string, accounts: Array<string>) => {
      blog.deployed().then((instance: BlogInstance) => {
        blogInstance = instance;

        return blogInstance.getBlogPostsCount.call();
      }).then((count: Number) => {
        var tasks: Object[] = [];
        for (let i = 0; i < count; i++) {
          tasks.push(blogInstance.getBlogPost.call(i));
        }
        return Promise.all(tasks);
      }).then(this.convertPosts).then((posts: Array<Post>) => {
        this.setState({ posts: posts.reverse() });
      });
    });
  }

  addBlogPost(title: string, content: string) {
    var blogInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      const blog = contract(BlogContract);
      blog.setProvider(this.state.web3.currentProvider);

      var account = accounts[0];

      blog.deployed().then((instance) => {
        blogInstance = instance;

        return blogInstance.addBlogPost(title, content, { from: account });
      }).then((result) => {
        // return App.showBlogPosts();
      }).catch((err) => {
        console.log(err.message);
      });
    });
  }

  // Data off the chain is in binary format, need to convert.
  convertPost(post: Post) {
    return {
      title: this.state.web3.toAscii(post[0]),
      content: this.state.web3.toAscii(post[1]),
    };
  }

  convertPosts(posts: Array<Post>) {
    return posts.map(this.convertPost);
  }

  render() {
    return (
        <div className="App">
          <div className="row">
            <div className="col-md-12">
              <div className="App-header">
                <h1>Blogchain</h1>
                <h5>A Hackathon Project</h5>
              </div>
            </div>
          </div>
        <PostList posts={this.state.posts} />
        <BlogForm onSubmit={this.addBlogPost} />
      </div>
    );
  }
}

export default App;
