import React from 'react';
import getWeb3 from './utils/getWeb3';
import { PostState } from './BlogChainInterfaces'
import Blog from './utils/Blog';

class Post extends React.Component< { match: { params: { post_id: string } } }, PostState> {
  state: PostState;
  blog: Blog;
  constructor(props) {
    super(props);

    this.state = {
      post: { title: '', content: '' },
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
      <div>
        <h2>Post</h2>
        { this.props.match.params.post_id }
        { this.state.post.title }
        { this.state.post.content }
      </div>
    );
  }
}

export default Post;
