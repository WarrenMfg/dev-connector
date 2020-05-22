import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/utils';


class ProfileCard extends Component {
  render() {
    const { profile } = this.props;


    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">

          <div className="col-2">
            <img src={profile.user.avatar} alt="Avatar" className="rounded-circle"/>
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.slug}</h3>
            <p>{profile.status} {isEmpty(profile.company) ? null : <span> at {profile.company}</span>}</p>
            <p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
            <Link to={`/profile/${profile.slug}`} className="btn btn-info">View Profile</Link>
          </div>

          <div className="col-md-4 d-none d-md-block">
            <h4>Skills</h4>
            <ul className="list-group">
              {profile.skills.slice(0,3).map((skill, i) => (
                <li key={i} className="list-group-item">
                  <i className="fa fa-check pr-1" />{skill}
                </li>))
              }
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileCard;
