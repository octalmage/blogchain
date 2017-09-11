import * as React from 'react';

interface State {
  titleValue: string;
  commentValue: string;
}

class BlogForm extends React.Component<any, any> {
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      titleValue: '',
      commentValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.titleValue, this.state.commentValue);
  }

  render() {
    return (
      <div className="BlogForm row center-sm">
      <div className="col-sm-12">
      <h4>Ethereum for your thoughts?</h4>
      <form onSubmit={this.handleSubmit}>
        <div className="FormField">
        <p>Post Title: </p>
        <input type='text' className="TitleInput" name='titleValue' value={this.state.titleValue} onChange={this.handleChange} />
        </div>
        <div className="FormField">
        <p>Post Content: </p><textarea name='commentValue' value={this.state.commentValue} onChange={this.handleChange} />
        </div>
        <input type='submit' value='Submit!' />
      </form>
      </div>
      </div>
    )
  }
}

export default BlogForm;
