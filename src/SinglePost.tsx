import React from 'react';
import Header from './Header'
import { PostState } from './BlogChainInterfaces'
import Blog from './utils/Blog';
import getWeb3 from './utils/getWeb3';
import Post from './Post';

class SinglePost extends React.Component< { match: { params: { post_id: string } } }, PostState> {
  state: PostState;
  blog: Blog;
  constructor(props) {
    super(props);

    this.state = {
      post: { title: '', content: '', author: '' },
    };

    this.blog = new Blog(getWeb3);
  }

  componentWillMount() {
    return this.blog.getBlogPost(this.props.match.params.post_id)
      .then((post) => {
        this.setState({ post });
      });
  }

  render() {
    return (
      <div className="App Post center-xs">
        <Header />
        <Post post={this.state.post} />
      </div>
    );
  }
}

export default SinglePost;
