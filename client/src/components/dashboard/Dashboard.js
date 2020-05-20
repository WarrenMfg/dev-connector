import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { isEmpty } from '../../../../backend/validation/utils';


class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    // if profile is still null or loading
    if (profile === null || loading) {
      dashboardContent = <Spinner />

    // if no profile created yet
    } else if (isEmpty(profile)) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome { user.userName }</p>
          <p>You haven't setup a profile yet.</p>
          <Link to='/create-profile' className="btn btn-lg btn-info">Create Profile</Link>
        </div>
      );

    // otherwise render profile
    } else {
      dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = {
  getCurrentProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);