import React from 'react';
import getWeb3 from './utils/getWeb3';
import { PostState } from './BlogChainInterfaces'
import Blog from './utils/Blog';
import Header from './Header'

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
      <div className="App Post center-xs">
        <Header />
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <div className="PostTitle">
              <h2>Post</h2>
              { this.state.post.title }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <div className="PostContent">
                { this.state.post.content }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Post;
