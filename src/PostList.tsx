import * as React from 'react';

class PostList extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {this.props.posts.map((post, i) => {
          return (
            <span key={i}>
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="PostTitle">
                    <h2>{post.title}</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="PostContent">
                    <p>{post.content}</p>
                  </div>
                </div>
              </div>
            </span>
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
