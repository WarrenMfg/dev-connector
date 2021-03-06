import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getPost, getPostForLatestComments } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import { isEmpty } from '../../utils/utils';
import PostCommentForm from './PostCommentForm';
import CommentFeed from './CommentFeed';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: null
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id, this.props.history);
    this.setState({ intervalID: setInterval(() => {
      this.props.getPostForLatestComments(this.props.match.params.id, this.props.history);
    }, 3000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (isEmpty(post) || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <PostCommentForm postID={post._id} />
          <CommentFeed comments={post.comments} postID={post._id} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to='/connect' className="btn btn-light mb-3">Back</Link>
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
  getPost: PropTypes.func.isRequired,
  getPostForLatestComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = {
  getPost,
  getPostForLatestComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
