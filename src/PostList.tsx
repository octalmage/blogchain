import React from 'react';
import { Post as PostInterface } from './BlogChainInterfaces';
import Post from './Post';

class PostList extends React.Component<{ posts: PostInterface[] }, any> {
  render () {
    return (
      <div>
        {this.props.posts.map((post, i) => {
          const id = (this.props.posts.length - i) - 1;
          return (
            <Post key={id} post={post} id={id} />
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
