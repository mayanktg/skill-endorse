/*
 * FeaturePage
 *
 * List all the features
 */
import React, { PropTypes } from 'react';
import { Helmet } from 'react-helmet';import request from 'utils/request';
import { API_BASE_URL } from 'utils/constants';
import get from 'lodash/get';

import UserDetails from 'components/UserDetails/UserDetails';
export default class UserPage extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      skillsList: []
    };
  }

  componentDidMount() {
    console.log(this.props.params);
    const url = `${API_BASE_URL}auth/getuser/${this.props.match.params.user_id}`;
    const options = {
      method: 'GET'
    };
    const stateObj = {};
    request(url, options)
      .then((res) => {
        stateObj.userData = get(res, 'success.data', {});
        const skillsUrl = `${API_BASE_URL}skills/getall`;
        return request(skillsUrl, options);
      })
      .then((data) => {
        stateObj.skillsList = get(data, 'success.data', []);
        this.setState(stateObj);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Helmet>
          <title>User Page</title>
          <meta name="description" content="User page of Skill Endorser" />
        </Helmet>
        <div>
          <UserDetails
            userData={this.state.userData}
            skillsList={this.state.skillsList}
          />
        </div>
      </div>
    );
  }
}
