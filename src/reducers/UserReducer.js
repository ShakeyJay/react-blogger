import {
  USER_UPDATE,
  USER_CREATE,
  USER_SAVE_SUCCESS,
  USER_GET_INFO,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  platform: '',
  id: '',
  country: '',
  timezone: ''
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_CREATE:
      return INITIAL_STATE;
    case USER_SAVE_SUCCESS:
      return INITIAL_STATE;
    case USER_GET_INFO:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    case SIGNUP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, error: '', loggedIn: true };
    case LOGOUT_USER:
      return { INITIAL_STATE };
    default:
      return state;
  }
};