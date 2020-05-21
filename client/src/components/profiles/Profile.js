import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileExpEdu from './ProfileExpEdu';
import ProfileGitHub from './ProfileGitHub';
import { getProfileBySlug} from '../../actions/profileActions';


export class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.slug) {
      this.props.getProfileBySlug(this.props.match.params.slug);
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileExpEdu />
        <ProfileGitHub />
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileBySlug: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getProfileBySlug
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
