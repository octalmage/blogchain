import React from 'react';
import { Post as PostInterface } from './BlogChainInterfaces';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Post = (props: { post: PostInterface }) => (
  <div>
    <div className="row">
      <div className="col-xs-8 col-xs-offset-2">
        <div className="PostTitle">
          <Link to={`/post/${props.post.id}`}><h2>{props.post.title}</h2></Link>
          by <Link to={'/author/' + props.post.author}>
            <h3 title={props.post.author}>{props.post.author.substring(0, 9)}</h3>
          </Link>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-8 col-xs-offset-2">
        <div className="PostContent">
          <ReactMarkdown escapeHtml skipHtml source={props.post.content} />
        </div>
      </div>
    </div>
  </div>
);

export default Post;
