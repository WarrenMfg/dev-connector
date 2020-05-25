import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';


class Education extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    this.props.deleteEducation(id, this.props.history);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.current ? 'Current' : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
        </td>
        <td><button className="bt btn-danger" onClick={() => this.onDelete(edu._id)}>Delete</button></td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education</h4>

        <table className="table">

          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {education}
          </tbody>

        </table>

      </div>
    );
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteEducation
};

export default connect(null, mapDispatchToProps)(withRouter(Education));
