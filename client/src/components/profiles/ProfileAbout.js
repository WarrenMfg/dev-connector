import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const skills = profile.skills.map((skill, i) => <div key={i} className="p-3"><i className="fa fa-check"></i> {skill}</div>)

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Bio</h3>
            <p className="lead">{profile.bio ? profile.bio : <span>{profile.slug} has not added a bio.</span>}</p>
            <hr />
            <h3 className="text-center text-info">Skills</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;