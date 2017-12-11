/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component, PropTypes } from 'react';
import request from 'utils/request';
import { API_BASE_URL, readCookie } from 'utils/constants';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';


import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './Login.css';
import { Cookies } from 'react-cookie';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    auth: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      pageType: 'login',
      userId: '',
      password: ''
    };
  }

  componentDidMount() {
    const userId = readCookie('_se_user_id');
    if (userId) {
      this.props.history.push(`/user/${userId}`);
    }
  }

  togglePage = () => {
    let pageType = 'login';
    if (this.state.pageType === 'login') {
      pageType = 'register';
    } else {
      pageType = 'login';
    }

    this.setState({ pageType });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  login = () => {
    if (!this.state.userId || !this.state.password) {
      return;
    }

    const url = `${API_BASE_URL}auth/login`;
    const options = {
      method: 'PUT',
      body: { user_id: this.state.userId, password: this.state.password }
    };
    request(url, options)
      .then((res) => {
        this.setState({loginData: res, isLoginError: false});
        const userId = get(res, 'success.data.user_id', null);
        const mongoId = get(res, 'success.data._id', null);
        document.cookie = '_se_user_id=' + userId + '; path=/';
        document.cookie = '_se_user_mongo_id=' + mongoId + '; path=/';
        this.props.history.push(`/user/${userId}`);
      })
      .catch((err) => {
        this.setState({loginErr: err, isLoginError: true});
        alert('Login failed');
      });
  }

  register = () => {
    if (!this.state.userId || !this.state.password || !this.state.email || !this.state.name) {
      return;
    }

    const url = `${API_BASE_URL}auth/createuser`;
    const options = {
      method: 'POST',
      body: {
        user_id: this.state.userId,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    };
    request(url, options)
      .then((res) => {
        this.setState({registerData: res, isRegisterError: false});
        const userId = get(res, 'success.data.user_id', null);
        const mongoId = get(res, 'success.data._id', null);
        document.cookie = '_se_user_id=' + userId + '; path=/';
        document.cookie = '_se_user_mongo_id=' + mongoId + '; path=/';
        this.props.history.push(`/user/${userId}`);
      })
      .catch((err) => {
        this.setState({registerData: err, isRegisterError: true});
        alert('Registration failed');
      });
  }

  render() {
    return (
      <div className="loginPage">
        {
          this.state.pageType === 'register' &&
          <div className="form">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              placeholder="name"
              onChange={this.handleInputChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handleInputChange}
            />
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={this.state.email}
              placeholder="email address"
              onChange={this.handleInputChange}
            />
            <label>User id</label>
            <input
              name="userId"
              type="text"
              value={this.state.userId}
              placeholder="user id"
              onChange={this.handleInputChange}
            />
            <button type="submit" onClick={this.register}>create</button>
            <p className="message">Already registered? <a onClick={this.togglePage}>Sign In</a></p>
          </div>
        }
        {
          this.state.pageType === 'login' &&
          <div className="form">
            <label>User Id</label>
            <input
              name="userId"
              type="text"
              value={this.state.userId}
              placeholder="username"
              onChange={this.handleInputChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handleInputChange}
            />
            <button onClick={this.login}>login</button>
            <p className="message">Not registered? <a onClick={this.togglePage}>Create an account</a></p>
          </div>
        }
      </div>
    );
  }
}


export default withRouter(Login);
