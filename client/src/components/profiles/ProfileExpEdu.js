import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { isEmpty } from '../../utils/utils';


class ProfileExpEdu extends Component {
  render() {
    const { experience, education } = this.props;

    const expListItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.title}</h4>
        <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.current ? 'Current' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}</p>
        {exp.company && <p><strong>Company: </strong>{exp.company}</p>}
        {exp.location && <p><strong>Location: </strong>{exp.location}</p>}
        {exp.description && <p><strong>Description: </strong>{exp.description}</p>}
      </li>
    ));

    const eduListItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.current ? 'Current' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}</p>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field Of Study: </strong>{edu.fieldOfStudy}</p>
        {edu.description && <p><strong>Description: </strong>{edu.description}</p>}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {isEmpty(experience) ? <p className="text-center">No experience listed.</p> : <ul className="list-group">{expListItems}</ul>}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {isEmpty(education) ? <p className="text-center">No education listed.</p> : <ul className="list-group">{eduListItems}</ul>}
        </div>
      </div>
    );
  }
}

ProfileExpEdu.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileExpEdu;