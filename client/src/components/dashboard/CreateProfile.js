import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { createOrUpdateProfile } from '../../actions/profileActions';


class CreateProfile extends Component {
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

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
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

    return (
      <div className='create-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
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
                  value='Submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

// SelectListGroup options for status
const getOptions = () => (
  [
    { label: 'Select a Professional Status', value: '' },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Instructor/Teacher', value: 'Instructor/Teacher' },
    { label: 'Student', value: 'Student' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' }
  ]
);

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

CreateProfile.propTypes = {
  slug: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  slug: state.auth.user.userName,
  errors: state.errors
})

const mapDispatchToProps = {
  createOrUpdateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile))
