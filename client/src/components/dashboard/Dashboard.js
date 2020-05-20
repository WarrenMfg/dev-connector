import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';


class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

Dashboard.propTypes = {

};

const mapDispatchToProps = {
  getCurrentProfile
};

export default connect(null, mapDispatchToProps)(Dashboard);