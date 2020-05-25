import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';


class Experience extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    this.props.deleteExperience(id, this.props.history);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.title}</td>
        <td>{exp.company}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.current ? 'Current' : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
        </td>
        <td><button className="bt btn-danger" onClick={() => this.onDelete(exp._id)}>Delete</button></td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience</h4>

        <table className="table">

          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {experience}
          </tbody>

        </table>

      </div>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};


const mapDispatchToProps = {
  deleteExperience
};

export default connect(null, mapDispatchToProps)(withRouter(Experience));
