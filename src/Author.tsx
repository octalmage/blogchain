import React from 'react';
import Header from './Header'
import PostList from './PostList.tsx';
import Blog from './utils/Blog.ts';
import getWeb3 from './utils/getWeb3';

class Author extends React.Component< { match: { params: { author_id: string } } }, any> {
  blog: Blog;
  constructor(props) {
    super(props);

    this.state = { posts: [] }
    this.blog = new Blog(getWeb3);
  }

  componentWillMount() {
    return this.blog.getBlogPostsByAuthor(this.props.match.params.author_id)
      .then((posts) => {
        this.setState({ posts: posts });
      });
  }

  render () {
    return (
      <div className="App">
        <Header />
        { this.state.posts && <PostList posts={this.state.posts} /> }
        { this.state.posts.length <= 0 && <div><h3>No posts by author {this.props.match.params.author_id}</h3> </div> }
      </div>
    );
  }

}

export default Author;
