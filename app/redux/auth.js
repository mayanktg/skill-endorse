import { API_BASE_URL } from '../utils/constants';
import request from '../utils/request';

export const PUT_LOGIN = 'PUT_LOGIN';
export const PUT_LOGIN_SUCCESS = 'PUT_LOGIN_SUCCESS';
export const PUT_LOGIN_FAIL = 'PUT_LOGIN_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  loginData: {}
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case PUT_LOGIN:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case PUT_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        loginData: action.data
      };
    case PUT_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        loginData: action.err
      };
    default:
      return state;
  }
}

export function login(dispatch, user_id, password) {
  const url = `${API_BASE_URL}auth/login`;
  const options = {
    method: 'PUT',
    body: { user_id, password }
  };
  dispatch({ type: PUT_LOGIN });
  request(url, options)
    .then(res => dispatch({ type: PUT_LOGIN_SUCCESS, result: res }))
    .catch(err => dispatch({ type: PUT_LOGIN_FAIL, err: err }))

}
