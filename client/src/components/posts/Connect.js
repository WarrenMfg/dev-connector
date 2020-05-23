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
      getLatestPostsIntervalID: null,
      throttledInfiniteScrollingTimeoutID: null
    };
  }

  componentDidMount() {

    // get initial posts
    this.props.getPosts();


    // add setInterval to continuously update new posts
    this.setState({

      getLatestPostsIntervalID: setInterval(() => {
        const { posts } = this.props.post;
        // pass in createdAt date of latest post
        posts[0] && this.props.getLatestPosts(posts[0].createdAt);
      }, 3000)

    });

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
              this.props.getMorePosts(posts[posts.length - 1].createdAt, toggle);
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
