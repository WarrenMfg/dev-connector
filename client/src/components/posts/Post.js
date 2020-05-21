import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import { isEmpty } from '../../utils/utils';


class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (isEmpty(post) || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostItem post={post} showActions={false} />;
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to='/feed' className="btn btn-light mb-3">Back</Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = {
  getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
