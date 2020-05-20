import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createEducation } from '../../actions/profileActions';


class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: false,
      disabled: false,
      description: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };

    this.props.createEducation(educationData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck() {
    this.setState({ current: !this.state.current, disabled: !this.state.disabled });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add past or current education</p>

              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  name='school'
                  placeholder='* School'
                  value={this.state.school}
                  error={errors.school}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name='degree'
                  placeholder='* Degree'
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name='fieldOfStudy'
                  placeholder='* Field of Study'
                  value={this.state.fieldOfStudy}
                  error={errors.fieldOfStudy}
                  onChange={this.onChange}
                />

                <h6>* From Date</h6>
                <TextFieldGroup
                  name='from'
                  type='date'
                  value={this.state.from}
                  error={errors.from}
                  onChange={this.onChange}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  name='to'
                  type='date'
                  value={this.state.to}
                  error={errors.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="curent"
                  />
                  <label htmlFor="current" className="form-check-label">Currently Enrolled</label>
                </div>

                <TextAreaFieldGroup
                  placeholder='Description, Honors, Awards, etc.'
                  name='description'
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />

                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  createEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  createEducation
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));
