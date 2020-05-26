import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import { getPosts, getMorePosts, getLatestPosts } from '../../actions/postActions';
import { isEmpty } from '../../utils/utils'


class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getLatestPostsIntervalID: setInterval(() => {
        const { posts } = this.props.post;
        // pass in createdAt date of latest post
        posts[0] && this.props.getLatestPosts(posts[0].createdAt, this.props.history);
      }, 3000),
      throttledInfiniteScrollingTimeoutID: null
    };

    this.getLatestPostsSetInterval = this.getLatestPostsSetInterval.bind(this);
  }

  componentDidMount() {

    // get initial posts
    this.props.getPosts(this.props.history);

    // throttled infinite scrolling
    window.onscroll = ( () => {
      let toggle = {canFetch: true};
      return () => {
        if (toggle.canFetch) {
          toggle.canFetch = false;

          // setState with throttledInfiniteScrollingTimeoutID
          this.setState({ throttledInfiniteScrollingTimeoutID: setTimeout(() => {
            const footer = document.getElementsByTagName('footer')[0].getBoundingClientRect();
            if ((footer.bottom - (window.innerHeight / 2)) <= window.innerHeight) {
              const { posts } = this.props.post;
              // get more posts
              this.props.getMorePosts(posts[posts.length - 1].createdAt, toggle, this.props.history);
            } else {
              toggle.canFetch = true;
            }
          }, 500) });
        }
      };
    })();

  }

  componentWillUnmount() {
    clearInterval(this.state.getLatestPostsIntervalID);
    clearTimeout(this.state.throttledInfiniteScrollingTimeoutID);
    window.onscroll = null;
  }

  getLatestPostsSetInterval() {
    this.setState({

      getLatestPostsIntervalID: setInterval(() => {
        const { posts } = this.props.post;
        // pass in createdAt date of latest post
        posts[0] && this.props.getLatestPosts(posts[0].createdAt, this.props.history);
      }, 3000)

    });
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (loading) {
      postContent = <Spinner />;
    } else if (isEmpty(posts)) {
      postContent = <h1 className="display-4 text-center">🙄</h1>
    } else {
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className="connect">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm getLatestPostsSetInterval={this.getLatestPostsSetInterval} getLatestPostsIntervalID={this.state.getLatestPostsIntervalID} />
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
  getMorePosts: PropTypes.func.isRequired,
  getLatestPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
});

const mapDispatchToProps = {
  getPosts,
  getMorePosts,
  getLatestPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
