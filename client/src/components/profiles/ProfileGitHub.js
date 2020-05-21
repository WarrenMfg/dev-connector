import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class ProfileGitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.githubRef = React.createRef();
  }

  componentDidMount() {
    const { githubUserName } = this.props;

    fetch(`/api/githubRepos/${githubUserName}`)
      .then(res => res.json())
      .then(repos => {
        // if component is still mounted, then update state
        if (this.githubRef.current) {
          this.setState({ repos });
        }
      })
      .catch(console.log);
  }

  render() {
    const { repos } = this.state;

    const recentRepos = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4><a href={repo.html_url} className="text-info" target="_blank">{repo.name}</a></h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
            <span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
            <span className="badge badge-success">Forks: {repo.forks_count}</span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref={this.githubRef} id="github">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {recentRepos}
      </div>
    );
  }
}

ProfileGitHub.propTypes = {
  githubUserName: PropTypes.string.isRequired
};

export default ProfileGitHub;