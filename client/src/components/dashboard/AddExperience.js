import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createExperience } from '../../actions/profileActions';


class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      location: '',
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

    const experienceData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: (this.state.to === '' && this.state.current === false) ? true : this.state.current,
      description: this.state.description,
    };

    this.props.createExperience(experienceData, this.props.history);
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
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">Add a past or current position</p>

              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  name='title'
                  placeholder='* Title'
                  value={this.state.title}
                  error={errors.title}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name='company'
                  placeholder='* Company'
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name='location'
                  placeholder='Location'
                  value={this.state.location}
                  error={errors.location}
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
                  <label htmlFor="current" className="form-check-label">Current Position</label>
                </div>

                <TextAreaFieldGroup
                  placeholder='Job Description'
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

AddExperience.propTypes = {
  createExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  createExperience
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));
