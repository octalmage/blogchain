import * as React from 'react';
import contract from 'truffle-contract';
import * as BlogContract from '../build/contracts/Blog.json';
import getWeb3 from './utils/getWeb3';
import {BlogInstance, PostState} from './BlogChainInterfaces'

class Post extends React.Component< { match: {params: {post_id: string } } }, PostState> {
  state: PostState;
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      web3: null,
    };
  }


  componentWillMount() {

    // Get accounts.
    getWeb3
    .then((results) => {
      this.setState({ web3: results.web3 }, () => {
        // On new post reload the blog posts.
        this.state.web3.eth.filter('latest', (error) => {
          if (!error) {
            const blog = contract(BlogContract);
            blog.setProvider(this.state.web3.currentProvider);

            // Declaring this for later so we can chain functions.
            let blogInstance: BlogInstance;

            this.state.web3.eth.getAccounts((error: string, accounts: Array<string>) => {
              blog.deployed().then((instance: BlogInstance) => {
                blogInstance = instance;
              }).then( () => {
                const [title, content] = blogInstance.getBlogPost.call(this.props.match.params.post_id);
                this.setState({title: title, content: content})
              })
            });
          } else {
            console.error(error);
          }
        });

      });
    })
    .catch((err) => {
      console.log('Error finding web3.');
    });

  }

  render() {
    return (
      <div>
        <h2>Post</h2>
        { this.props.match.params.post_id }
        { this.state.title }
        { this.state.content }
      </div>
    );
  }
}

export default Post;
