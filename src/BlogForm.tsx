import * as React from 'react';

interface State {
  titleInput: string;
  commentInput: string,
}

class BlogForm extends React.Component<any, any> {
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      titleInput: '',
      commentInput: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.titleInput, this.state.commentInput);
    this.setState({ titleInput: '', commentInput: '' });
  }

  render() {
    return (
      <div className="row center-xs">
        <div className="BlogForm col-xs-12">
          <h4>Ethereum for your thoughts?</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="FormField">
              <p>Post Title: </p>
              <input type='text' className="TitleInput" name='titleInput' maxLength={32} value={this.state.titleInput} onChange={this.handleChange} />
              <p className='subtext'>{32 - this.state.titleInput.length} characters remaining</p>
            </div>
            <div className="FormField">
              <p>Post Content: </p><textarea name='commentInput' maxLength={1024} value={this.state.commentInput} onChange={this.handleChange} />
              <p className='subtext'>{1024 - this.state.commentInput.length} characters remaining</p>
            </div>
            <input className="Submit" type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
}

export default BlogForm;
