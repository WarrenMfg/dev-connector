import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';


class CommentItem extends Component {
  onDelete(postID, commentID) {
    this.props.deleteComment(postID, commentID);
  }

  render() {
    const { comment, postID, auth } = this.props;

    const deleteButton = (
      <button onClick={this.onDelete.bind(this, postID, comment._id)} type="button" className="btn btn-danger mr-1">
        <i className="fas fa-times" />
      </button>
    );

    return (
      <div className="card card-body mb-3">
        <div className="row">

          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="Avatar" />
            </a>
            <br />
            <p className="text-center">{comment.userName}</p>
          </div>

          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user._id && deleteButton}
          </div>

        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
