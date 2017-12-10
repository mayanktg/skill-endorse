/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component, PropTypes } from 'react';
import request from 'utils/request';
import { API_BASE_URL, readCookie } from 'utils/constants';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';

import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import './UserSkills.css';

class UserSkills extends Component {
  static propTypes = {
    userData: PropTypes.obj,
    userSkills: PropTypes.object,
    skillsList: PropTypes.array,
    isSameProfile: PropTypes.boolean,
    upvoteHandler: PropTypes.func
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      skills: [],
      openSnackbar: false,
      snackbarMessage: ''
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'inline-block',
        flexWrap: 'wrap',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.userData.user_id && nextProps.userData.user_id) {
      const user = nextProps.userData;
      this.setState({
        name: user.name,
        photo: user.photo,
        skills: user.skills
      });
    }
  }

  renderSkillsChip = (data, index) => {
    return (
      <Chip
        key={data._id}
        style={this.styles.chip}
        onClick={() => {this.endorseSkill(data._id)}}
      >
        {data.name}
      </Chip>
    );
  }

  handleRequestClose = () => {
    this.setState({
      openSnackbar: false,
      snackbarMessage: ''
    });
  };

  endorseSkill = (id) => {
    if (this.props.isSameProfile) {
      this.setState({
        openSnackbar: true,
        snackbarMessage: 'You cannot upvote your own profile'
      });
      return;
    }

    const url = `${API_BASE_URL}userskill/createuserskill`;
    const options = {
      method: 'post',
      body: {
        user_id: this.props.userData._id,
        endorser_user_id: readCookie('_se_user_mongo_id'),
        skill_id: id
      }
    };
    request(url, options)
      .then((res) => {
        this.setState({
          openSnackbar: true,
          snackbarMessage: 'Successfully upvoted'
        });
        this.props.upvoteHandler();
      })
      .catch((err) => {
        this.setState({
          openSnackbar: true,
          snackbarMessage: 'error occurred while updating'
        });
      });
  };


  getUserSkill = (key) => {
    const skill = this.props.userSkills[key] || [];
    const skillLength = skill.length;
    return (
      <li
        key={key}
      >
      <ListItem
        className="user-skill-block"
        onClick={ () => {this.endorseSkill(skill[0].skill_id);}}
      >
        <div className="user-skill-left-item">
          <ListItem
            disabled={true}
            leftAvatar={<Avatar>{skillLength}</Avatar>}
          >
            {key}
          </ListItem>
        </div>
        <div className="user-skill-right-items">
          {
            skill.slice(0, 5).map((user, index) => {
              return(
                <a href={`/user/${user.user_id}`} key={index}>
                  <Avatar src={user.photo} />
                </a>
              );
            })
          }
        </div>
      </ListItem>
      </li>

    );
  };

  getFilteredSkillList = () => {
    const skills = [];
    this.props.skillsList.map((o) => {
      let isPresent = true;
      Object.keys(this.props.userSkills).map((key) => {
        if (o.name === key) {
          isPresent = false;
        }
      });
      if (isPresent) skills.push(o);
    });
    return skills;
  };

  render() {
    const user = this.props.userData;
    const zeroUpvotedSkills = this.getFilteredSkillList();
    return (
      <div className="user-skills">
        <div className="user-skills-form">
        <List>
          {
            this.props.userData &&
            <ListItem
              disabled={true}
              leftAvatar={ <Avatar src={user.photo} /> }
            >
              {user.name}
            </ListItem>
          }
          {
            !isEmpty(this.props.userSkills) &&
            <div>
              <h3>{`Endorse ${user.name}'s skills`}</h3>
              <ul className="user-skill-entries">
              {
                Object.keys(this.props.userSkills).map((key, index) => {
                  return(this.getUserSkill(key));
                })
              }
              </ul>
            </div>
          }
        </List>
        <div className="skillsAutoComplete">
        {
          zeroUpvotedSkills.map((skill, index) => {
            return this.renderSkillsChip(skill, index);
          })
        }
        </div>
        </div>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}


export default withRouter(UserSkills);
