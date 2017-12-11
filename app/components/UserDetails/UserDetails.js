/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component, PropTypes } from 'react';
import request from 'utils/request';
import { API_BASE_URL } from 'utils/constants';
import get from 'lodash/get';
import difference from 'lodash/difference';
import { withRouter } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
import Snackbar from 'material-ui/Snackbar';

import './UserDetails.css';

class UserDetails extends Component {
  static propTypes = {
    userData: PropTypes.obj,
    skillsList: PropTypes.array
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.userData.name || '',
      photo: props.userData.photo || '',
      skills:props.userData.skills || [],
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  submitChangeHandler = () => {
    const url = `${API_BASE_URL}auth/updateuser/${this.props.match.params.user_id}`;
    const options = {
      method: 'PUT',
      body: {
        name: this.state.name,
        photo: this.state.photo,
        skills: this.state.skills.map(skill => skill._id)
      }
    };
    request(url, options)
      .then((res) => {
        this.setState({
          openSnackbar: true,
          snackbarMessage: 'Successfully updated'
        });
      })
      .catch((err) => {
        this.setState({
          openSnackbar: true,
          snackbarMessage: 'error occurred while updating'
        });
      });
  }

  handleRequestDelete = (index) => {
    this.state.skills.splice(index, 1);
    this.setState({
      skills: this.state.skills
    });
  }

  renderChip = (data, index) => {
    return (
      <Chip
        key={data._id}
        onRequestDelete={() => this.handleRequestDelete(index)}
        style={this.styles.chip}
      >
        {data.name}
      </Chip>
    );
  }

  renderSkillsChip = (data, index) => {
    return (
      <Chip
        key={data._id}
        style={this.styles.chip}
        onClick={() => {this.handleSkillsInputChange(data)}}
      >
        {data.name}
      </Chip>
    );
  }

  handleSkillsInputChange = (skill) => {
    this.state.skills.push(skill);
    this.setState({
      skills: this.state.skills
    });
  }

  getFilteredSkillList = () => {
    const skills = [];
    this.props.skillsList.map((o) => {
      let isPresent = true;
      this.state.skills.map((s) => {
        if (o._id === s._id) {
          isPresent = false;
        }
      });
      if (isPresent) skills.push(o);
    });
    return skills;
  }

  handleRequestClose = () => {
    this.setState({
      openSnackbar: false,
      snackbarMessage: ''
    });
  };

  render() {
    const diffSkills = this.getFilteredSkillList();
    console.log(this.state);
    return (
      <div className="user-details">
        {
          this.props.userData &&
          <div className="form">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              placeholder="name"
              onChange={this.handleInputChange}
            />
            <label>Photo URL</label>
            <input
              name="photo"
              type="text"
              value={this.state.photo}
              placeholder="Photo Url"
              onChange={this.handleInputChange}
            />
            <label>Skills</label>
            <div className="skillsChip">
            {
              this.state.skills.map((skill, index) => {
                return this.renderChip(skill, index);
              })
            }
            </div>
            <div className="skillsAutoComplete">
            {
              diffSkills.map((skill, index) => {
                return this.renderSkillsChip(skill, index);
              })
            }
            </div>
            <button type="submit" onClick={this.submitChangeHandler}>Submit</button>
          </div>
        }
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


export default withRouter(UserDetails);
