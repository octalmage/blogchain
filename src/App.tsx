import * as React from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';
import * as BlogContract from '../build/contracts/Blog.json';
import './App.css';
import './BlogList.tsx';

interface Post {
  title: string;
  content: string;
}

interface State {
  posts: Post[];
  web3: Web3;
}

interface Props {
}

class App extends React.Component<Props, State> {
  state: State;

  constructor() {
    super();

    this.state = {
      posts: [],
      web3: null,
    };

    this.addBlogPost = this.addBlogPost.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
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

  render() {
    return (
      <div className="App">
      <h1>Blogchain</h1>
      <BlogList />
      </div>
    );
  }

}

export default App;
