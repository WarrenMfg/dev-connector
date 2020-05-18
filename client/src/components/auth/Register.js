import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';


class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      password: '',
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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your devConnector account</p>

              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.userName && 'is-invalid'}`}
                    placeholder="Username" name="userName"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${errors.email && 'is-invalid'}`}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  <small className="form-text text-muted">This site uses Gravatar for profile images</small>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

// subscribe to store updates only with what this component needs
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// dispatch => bindActionCreators(mapDispatchToProps, dispatch)
const mapDispatchToProps = {
  registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));