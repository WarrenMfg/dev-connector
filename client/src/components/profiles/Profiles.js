import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles, getLatestProfiles, getMoreProfiles } from '../../actions/profileActions';
import { isEmpty } from '../../utils/utils';
import ProfileCard from './ProfileCard';


class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getLatestProfilesIntervalID: null,
      throttledInfiniteScrollingTimeoutID: null
    };
  }

  componentDidMount() {
    // get initial profiles
    this.props.getProfiles();

    // add setInterval to continuously update new profiles every minute
    this.setState({

      getLatestProfilesIntervalID: setInterval(() => {
        const { profiles } = this.props.profile;
        // pass in createdAt date of latest post
        profiles[0] && this.props.getLatestProfiles(profiles[0].createdAt);
      }, 1000 * 60)

    });

    // throttled infinite scrolling
    window.onscroll = ( () => {
      let toggle = {canFetch: true};
      return () => {
        if (toggle.canFetch) {
          toggle.canFetch = false;

          // setState with throttledInfiniteScrollingTimeoutID
          this.setState({ throttledInfiniteScrollingTimeoutID: setTimeout(() => {
            const footer = document.getElementsByTagName('footer')[0].getBoundingClientRect();
            if ((footer.bottom - (window.innerHeight / 2)) <= window.innerHeight) {
              const { profiles } = this.props.profile;
              // get more profiles
              this.props.getMoreProfiles(profiles[profiles.length - 1].createdAt, toggle);
            } else {
              toggle.canFetch = true;
            }
          }, 500) });
        }
      };
    })();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;

    } else if (isEmpty(profiles)) {
      profileItems = <h4>No profiles found...</h4>;

    } else {
      profileItems = profiles.map(profile => <ProfileCard key={profile._id} profile={profile} />);
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Connect with other developers</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getLatestProfiles: PropTypes.func.isRequired,
  getMoreProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getProfiles,
  getLatestProfiles,
  getMoreProfiles
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
