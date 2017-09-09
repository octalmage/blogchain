import * as React from 'react';
import contract from 'truffle-contract';
import * as test from '../test.json';
import BlogContract from '../build/contracts/Blog.json';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  constructor(props) {
    super(props)
    console.og(test);
    this.state = {
      posts: [],
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
      });
      // Instantiate contract once web3 provided.
      this.instantiateContract();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
    * SMART CONTRACT EXAMPLE
    *
    * Normally these functions would be called in the context of a
    * state management library, but for convenience I've placed them here.
    */
    const blog = contract(BlogContract)
    blog.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var blogInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      blog.deployed().then((instance) => {
        blogInstance = instance;

        // Stores a given value, 5 by default.
        return blogInstance.getBlogPostsCount.call();
      }).then(function(count) {
        console.log(count);
        var tasks = [];
        for (i = 0; i < count; i++) {
          tasks.push(blogInstance.getBlogPost.call(i));
        }
        return Promise.all(tasks);
      }).then(this.convertPosts).then(function(posts) {
        this.setState({ posts });
      });
    })
  }

  addBlogPost(title, content) {
    var blogInstance;

    this.state.web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      const blog = contract(BlogContract)
      blog.setProvider(this.state.web3.currentProvider)

      var account = accounts[0];

      blog.deployed().then(function(instance) {
        blogInstance = instance;

        return blogInstance.addBlogPost(title, content, { from: account });
      }).then(function(result) {
        // return App.showBlogPosts();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

  convertPost(post) {
    return {
      title: this.state.web3.toAscii(post[0]),
      content: this.state.web3.toAscii(post[1]),
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
