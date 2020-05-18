import React from 'react';


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

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(errors => this.setState({ errors }))
      .catch(console.error);
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

export default Register;