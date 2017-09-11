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
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='titleValue' value={this.state.titleValue} onChange={this.handleChange} />
        <input type='text' name='commentValue' value={this.state.commentValue} onChange={this.handleChange} />
        <input type='submit' value='Submit!' />
      </form>
    )
  }
}

export default BlogForm;
