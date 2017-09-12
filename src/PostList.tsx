import React from 'react';
import { Link } from 'react-router-dom';

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
                <div className="col-xs-8 col-xs-offset-2">
                  <div className="PostTitle">
                    <Link to={`/post/${(this.props.posts.length - i) - 1}`}><h2>{post.title}</h2></Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
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
