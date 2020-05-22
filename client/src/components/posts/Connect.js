import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import { getPosts, getPostsAndCompareFirstComment } from '../../actions/postActions';
import { isEmpty } from '../../utils/utils'


class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: null
    };
  }

  componentDidMount() {
    this.props.getPosts();
    this.setState({ intervalID: setInterval(() => this.props.getPostsAndCompareFirstComment(), 3000) })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
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
  getPosts: PropTypes.func.isRequired,
  getPostsAndCompareFirstComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
});

const mapDispatchToProps = {
  getPosts,
  getPostsAndCompareFirstComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
