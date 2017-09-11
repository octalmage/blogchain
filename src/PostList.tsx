import * as React from 'react';

class PostList extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {this.props.posts.map((post, i) => {
          return <span key={i}><h2>{post.title}</h2><p>{post.content}</p></span>;
        })}
        {!this.props.posts.length &&
          <h2>Loading...</h2>
        }
      </div>
    );
  }
}

export default PostList;
