import * as React from 'react';

interface State {
  titleInputValue: string;
  commentInputValue: string,
  titleInputLength: number,
  commentInputLength: number
}

class BlogForm extends React.Component<any, any> {
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      titleInputValue: '',
      commentInputValue: '',
      titleInputLength: 0,
      commentInputLength: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let valueKey = event.target.name + 'Value'
    let lengthKey = event.target.name + 'Length'

    this.setState({
      [valueKey]: event.target.value,
      [lengthKey]: event.target.value.length,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.titleInputValue, this.state.commentInputValue);
    this.setState({
      titleInputValue: '',
      commentInputValue: '',
      titleInputLength: 0,
      commentInputLength: 0
    });
  }

  render() {
    return (
      <div className="row center-sm">
        <div className="BlogForm col-sm-12">
          <h4>Ethereum for your thoughts?</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="FormField">
              <p>Post Title: </p>
              <input type='text' className="TitleInput" name='titleInput' maxLength={32} value={this.state.titleInputValue} onChange={this.handleChange} />
              <p className='subtext'>{32 - this.state.titleInputLength} characters remaining</p>
            </div>
            <div className="FormField">
              <p>Post Content: </p><textarea name='commentInput' maxLength={1024} value={this.state.commentInputValue} onChange={this.handleChange} />
              <p className='subtext'>{1024 - this.state.commentInputLength} characters remaining</p>
            </div>
            <input type='submit' value='Submit!' />
          </form>
        </div>
      </div>
    )
  }
}

export default BlogForm;
