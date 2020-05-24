import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { isEmpty } from '../../utils/utils';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { createOrUpdateProfile, getCurrentProfile } from '../../actions/profileActions';
import getOptions from './StatusOptions';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      slug: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      githubUserName: '',
      youtube: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.profile.profile === null) {
      return;
    }
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
    if (prevProps.profile.profile !== this.props.profile.profile) {
      let { profile } = this.props.profile;
      // make skills CSV from skills array
      const skills = profile.skills.join(',');
      // normalize the other properties
      profile = normalizeProfileData(profile);

      // destructure
      const { company, website, location, status, bio, githubUserName, youtube, twitter, facebook, linkedin, instagram } = profile;
      // set component state
      this.setState({ company, website, location, status, skills, bio, githubUserName, youtube, twitter, facebook, linkedin, instagram });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      githubUserName: this.state.githubUserName,
      skills: this.state.skills,
      bio: this.state.bio,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };

    this.props.createOrUpdateProfile(profileData, this.props.history);
  }

  render() {
    const { displaySocialInputs, errors } = this.state;
    const { profile, loading } = this.props.profile;
    let editProfileContent;

    if (profile === null || loading) {
      editProfileContent = <Spinner />;

    } else if (isEmpty(profile)) {
      editProfileContent = <h1 className="display-4 text-center">No profile found 🤨</h1>;

    } else {
      editProfileContent = (
        <div>
          <h1 className="display-4 text-center">Edit Your Profile</h1>
          <p className="lead text-center">Make your profile standout!</p>

          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              name='slug'
              value={this.props.slug}
              error={errors.slug}
              info='Your unique profile URL'
              onChange={() => {}}
              disabled={'disabled'}
            />

            <SelectListGroup
              name='status'
              value={this.state.status}
              error={errors.status}
              info='Your career stage (required)'
              onChange={this.onChange}
              options={getOptions()}
            />

            <TextFieldGroup
              name='company'
              placeholder='Company'
              value={this.state.company}
              error={errors.company}
              info='Your current employer'
              onChange={this.onChange}
            />

            <TextFieldGroup
              name='website'
              placeholder='Website'
              value={this.state.website}
              error={errors.website}
              info='Your portfolio website'
              onChange={this.onChange}
            />

            <TextFieldGroup
              name='location'
              placeholder='Location'
              value={this.state.location}
              error={errors.location}
              info='City &amp; State'
              onChange={this.onChange}
            />

            <TextFieldGroup
              name='skills'
              placeholder='Skills'
              value={this.state.skills}
              error={errors.skills}
              info='Comma separated list of skills (required)'
              onChange={this.onChange}
            />

            <TextFieldGroup
              name='githubUserName'
              placeholder='GitHub Username'
              value={this.state.githubUserName}
              error={errors.githubUserName}
              info='Include your GitHub username to show your latest repos'
              onChange={this.onChange}
            />

            <TextAreaFieldGroup
              name='bio'
              placeholder='A Short biography'
              value={this.state.bio}
              error={errors.bio}
              info='Tell everyone about yourself'
              onChange={this.onChange}
            />

            <div className="mb-3">
              <button
                onClick={() => this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }))}
                type='button'
                className="btn btn-light"
              >
                Add Social Network Links
              </button>
              <span className="text-muted">{' '}Optional</span>
            </div>

            {displaySocialInputs && getSocialInputs(this.state, this.onChange)}

            <input
              type="submit"
              value='Update'
              className='btn btn-info btn-block mt-4'
            />
          </form>
        </div>
      );
    }

    return (
      <div className='edit-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>

              {editProfileContent}

            </div>
          </div>
        </div>
      </div>
    );

  }
}

const getSocialInputs = (state, onChange) => {
  const { twitter, facebook, linkedin, youtube, instagram, errors } = state;
  return (
    <div>
      <InputGroup
        placeholder='Twitter Profile URL'
        name='twitter'
        value={twitter}
        error={errors.twitter}
        onChange={onChange}
        icon='fab fa-twitter'
      />

      <InputGroup
        placeholder='Facebook Profile URL'
        name='facebook'
        value={facebook}
        error={errors.facebook}
        onChange={onChange}
        icon='fab fa-facebook'
      />

      <InputGroup
        placeholder='LinkedIn Profile URL'
        name='linkedin'
        value={linkedin}
        error={errors.linkedin}
        onChange={onChange}
        icon='fab fa-linkedin'
      />

      <InputGroup
        placeholder='YouTube Profile URL'
        name='youtube'
        value={youtube}
        error={errors.youtube}
        onChange={onChange}
        icon='fab fa-youtube'
      />

      <InputGroup
        placeholder='Instagram Profile URL'
        name='instagram'
        value={instagram}
        error={errors.instagram}
        onChange={onChange}
        icon='fab fa-instagram'
      />
    </div>
  );
};

const normalizeProfileData = profile => {
  // profile
  profile.company = profile.company ? profile.company : '';
  profile.website = profile.website ? profile.website : '';
  profile.location = profile.location ? profile.location : '';
  profile.status = profile.status ? profile.status : '';
  profile.bio = profile.bio ? profile.bio : '';
  profile.githubUserName = profile.githubUserName ? profile.githubUserName : '';
  // social
  profile.social = profile.social ? profile.social : {};
  profile.youtube = profile.social?.youtube ? profile.social?.youtube : '';
  profile.twitter = profile.social?.twitter ? profile.social?.twitter : '';
  profile.facebook = profile.social?.facebook ? profile.social?.facebook : '';
  profile.linkedin = profile.social?.linkedin ? profile.social?.linkedin : '';
  profile.instagram = profile.social?.instagram ? profile.social?.instagram : '';

  return profile;
};

EditProfile.propTypes = {
  slug: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  slug: state.auth.user.userName,
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = {
  createOrUpdateProfile,
  getCurrentProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
