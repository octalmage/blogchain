import React from 'react';
import { Post as PostInterface } from './BlogChainInterfaces';
import Post from './Post';

class PostList extends React.Component<{ posts: PostInterface[] }, any> {
  render () {
    return (
      <div>
        {this.props.posts.map((post, i) => {
          return (
            <Post key={i} post={post} />
          );
        })}
        {!this.props.posts.length &&
          <h2>Loading...</h2>
        }
      </div>
    );
  }
}

export default PostList;
