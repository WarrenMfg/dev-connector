import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';


class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { userName, avatar } = this.props.auth.user;

    const newPost = {
      text: this.state.text,
      userName,
      avatar
    };

    // clear Connect.js setInterval
    clearInterval(this.props.getLatestPostsIntervalID);
    // add post, but pass in setInterval props function to restart again
    // this will prohibit potential duplicate posts showing up in the DOM
    this.props.addPost(newPost, () => this.setState({ text: '' }), this.props.history, this.props.getLatestPostsSetInterval);

  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">&nbsp;</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  name="text"
                  placeholder="Create a post"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  getLatestPostsSetInterval: PropTypes.func.isRequired,
  getLatestPostsIntervalID: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  addPost
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostForm));
