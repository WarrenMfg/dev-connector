import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';
import { isEmpty } from '../../utils/utils'


class Connect extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (loading) {
      postContent = <Spinner />;
    } else if (isEmpty(posts)) {
      postContent = <h1 className="display-4 text-center">Be the first! 😃</h1>
    } else {
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className="connect">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Connect.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
