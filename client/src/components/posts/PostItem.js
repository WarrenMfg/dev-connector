import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class PostItem extends Component {
  onDelete(id) {

  }

  render() {
    const { post, auth } = this.props;

    const deleteButton = (
      <button onClick={this.onDelete.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
        <i className="fas fa-times" />
      </button>
    );

    return (
      <div className="card card-body mb-3">
        <div className="row">

          <div className="col-md-2">
            <Link to={`/profile/${post.userName}`}>
              <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="Avatar" />
            </Link>
            <br />
            <p className="text-center">{post.userName}</p>
          </div>

          <div className="col-md-10">
            <p className="lead">{post.text}</p>

            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up"></i>
              <span className="badge badge-light">{post.likes.length}</span>
            </button>

            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>

            {post.user === auth.user._id && deleteButton}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
