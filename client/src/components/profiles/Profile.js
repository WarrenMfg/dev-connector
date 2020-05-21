import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { isEmpty } from '../../utils/utils';
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
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else if (isEmpty(profile)) {
      profileContent = <h4>No profile found...</h4>;
    } else {
      profileContent = (
        <div>

          <div className="row">
            <div className="col-md-6">
              <Link to='/profiles' className="btn btn-light mb-3 float-left">Developer Profiles</Link>
              <div className="col-md6"></div>
            </div>
          </div>

          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileExpEdu education={profile.education} experience={profile.experience} />
          <ProfileGitHub />

        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
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
