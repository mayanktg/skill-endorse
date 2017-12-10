export const PUT_LOGIN = 'PUT_LOGIN';
export const PUT_LOGIN_SUCCESS = 'PUT_LOGIN_SUCCESS';
export const PUT_LOGIN_FAIL = 'PUT_LOGIN_FAIL';

export const requestLogin = (user_id, password) => ({ type: PUT_LOGIN, args: {user_id, password} });
export const receiveLoginData = data => ({ type: PUT_LOGIN_SUCCESS, data });
export const receiveLoginError = err => ({ type: PUT_LOGIN_FAIL, err });

const initialState = {
  loading: false,
  loaded: false,
  loginData: {}
};

export default function auth(state = initialState, action = {}) {
  console.log(action);
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
