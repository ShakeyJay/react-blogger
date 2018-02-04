import * as firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_PASSWORD_FAIL,
  LOGOUT_USER,
  USER_CREATE,
  USER_UPDATE,
  USER_SAVE_SUCCESS
} from './types';


export const userCreate = ({ name, userName }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}`)
      .set({ name, userName })
      .then(() => {
        dispatch({ type: USER_CREATE });
      })
      .catch((err) => console.log(err));
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        loginUserSuccess(dispatch, user);
        startTabNav();
      })
      .catch((error) => {
        console.log(error);
        loginUserFail(dispatch);
      });
  };
};


export const signupUser = ({ email, password, navigator }) => {
  return (dispatch) => {
    // console.log(`password = ${password} and vpass = ${vPassword}`);
    console.log(`navigator = ${navigator}`);
    // if (password !== vPassword) {
    //   signupUserFail(dispatch)
    // }
    // else {
    dispatch({ type: SIGNUP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log("Created User with email and pw");
        signupUserSuccess(dispatch, user);
        // Handled in the authstatechange in app.js now!
        // navPush(navigator, 'createProfile', "", true, 'fade', true);
      })
      .catch((error) => {
        console.log(error);
        signupUserFail(dispatch)
      });
    // }
  };
  return "This is a return";
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChange = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const userUpdate = ({ prop, value }) => {
  // console.log(prop);
  // console.log(value);
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

const signupUserSuccess = (dispatch, user) => {
  console.log('Successful sign up');
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  });
};

export const signoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut().then(() => {
      dispatch({ type: LOGOUT_USER });
      startSingleNav();
    })
      .catch((err) => {
        console.log(err);
      });
  };
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};