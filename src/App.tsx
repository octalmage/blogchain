import * as React from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';
import getWeb3 from './utils/getWeb3';
import * as BlogContract from '../build/contracts/Blog.json';
import 'normalize.css';
import 'flexboxgrid';
import './App.css';
import BlogForm from './BlogForm.tsx'

interface ContractFunction {
  call: Function;
}

interface BlogInstance {
  getBlogPostsCount: ContractFunction;
  getBlogPost: ContractFunction;
}

interface Post {
  title: string;
  content: string;
  date: string;
}

interface State {
  posts: Post[];
  web3: Web3;
}

class App extends React.Component<any, any> {
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
      <div className="App row center-md">
        <div className="col-xs-12">
          <h1>Blogchain</h1>
        </div>
        {this.state.posts.map((post, i) => {
        return <span key={i}>
          <div className="postTitle col-xs-12">
            <h2>{post.title}</h2>
          </div>
          <div className="postContent col-xs-12">
            <p>{post.content}</p>
          </div>
          </span>;
          })}
          {!this.state.posts.length &&
          <h2>Loading...</h2>
        }
        <BlogForm onSubmit={this.addBlogPost} />
        </div>
    );
  }
}

export default App;
