/*
 * FeaturePage
 *
 * List all the features
 */
import React, { PropTypes } from 'react';
import { Helmet } from 'react-helmet';import request from 'utils/request';
import { API_BASE_URL } from 'utils/constants';
import get from 'lodash/get';
import cookie from 'react-cookies';

import UserDetails from 'components/UserDetails/UserDetails';
import UserSkills from 'components/UserSkills/UserSkills';
export default class UserPage extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      skillsList: [],
      userSkills: {}
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.user_id;
    const url = `${API_BASE_URL}auth/getuser/${userId}`;
    const options = {
      method: 'GET'
    };
    const stateObj = {};
    request(url, options)
      .then((data1) => {
        stateObj.userData = get(data1, 'success.data', {});
        const skillsUrl = `${API_BASE_URL}skills/getall`;
        return request(skillsUrl, options);
      })
      .then((data2) => {
        stateObj.skillsList = get(data2, 'success.data', []);
        const userSkillsUrl = `${API_BASE_URL}userskill//getuserskill/${stateObj.userData._id}`;
        return request(userSkillsUrl, options);
      })
      .then((data3) => {
        stateObj.userSkills = get(data3, 'success.data', {});
        this.setState(stateObj);
      });
  }

  upvoteHandler = () => {
    const userSkillsUrl = `${API_BASE_URL}userskill//getuserskill/${this.state.userData._id}`;
    const options = {
      method: 'GET'
    };
    request(userSkillsUrl, options)
      .then((data) => {
        const userSkills = get(data, 'success.data', {});
        this.setState({userSkills});
      })

  }

  render() {
    const isSameProfile = cookie.load('_se_user_id') === this.state.userData.user_id;
    return (
      <div>
        <Helmet>
          <title>User Page</title>
          <meta name="description" content="User page of Skill Endorser" />
        </Helmet>
        {
          isSameProfile &&
          <UserDetails
            userData={this.state.userData}
            skillsList={this.state.skillsList}
          />
        }
        <UserSkills
          userData={this.state.userData}
          skillsList={this.state.skillsList}
          userSkills={this.state.userSkills}
          isSameProfile={isSameProfile}
          upvoteHandler={this.upvoteHandler}
        />
      </div>
    );
  }
}
