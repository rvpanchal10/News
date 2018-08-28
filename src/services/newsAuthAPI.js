import { Map } from 'immutable';
import { get, post } from '../utils/api';
import * as apiEndpoints from '../utils/apiConfig'; // you need to make
import * as configuration from '../utils/configuration'; // already made
import { resetSessionStateFromSnapshot } from '../modules/session/SessionState';
import { setAuthenticationToken, clearAuthenticationToken } from '../utils/authentication'; // already made
import { clearSnapshot } from '../utils/snapshot';
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';

// import {NavigationActions} from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation';
// TO set API_ROOT varible
const API_ROOT = apiEndpoints.api;
configuration.setConfiguration('API_ROOT', API_ROOT);

const SET_LOADER = 'SET_LOADER';
const INVALIDE_LOGIN = 'INVALIDE_LOGIN';

const CHANGE_NOTIFICATION_TOKEN = 'CHANGE_NOTIFICATION_TOKEN';

const GET_TOP_HEADLINES_SUCCESS = 'GET_TOP_HEADLINES_SUCCESS';
const GET_TOP_HEADLINES_FAILURE = 'GET_TOP_HEADLINES_FAILURE';

{
  /* ============== Set cases for success & failure ============== */
}

export const setLoader = value => ({ type: SET_LOADER, payload: value });

export function setNotificationToken(value) {
  return { type: CHANGE_NOTIFICATION_TOKEN, payload: value };
}
// 1. Top Headlines API
export const getTopHeadlinesSuccess = value => ({
  type: GET_TOP_HEADLINES_SUCCESS,
  payload: JSON.stringify({ value })
});

export const getTopHeadlinesFailure = value => ({
  type: GET_TOP_HEADLINES_FAILURE,
  payload: JSON.stringify({ value })
});


export const resetTo = (props, route) => {
  return async dispatch => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    props
      .navigation
      .dispatch(resetAction);
    dispatch(setLoader(false));
  };
};

{
  /* List of Get Requests */
}
// Top headlines from TechCrunch
export const onAsyncGetTopHeadlines = () => {
  return async dispatch => {
    dispatch(setLoader(true));
    dispatch(getTopHeadlinesFailure(''));
    let url = 'everything?q=apple&from=2018-08-27&to=2018-08-27&sortBy=popularity&apiKey=a1a6e07224aa4d2699f2accbc351139e'
    console.log('onAsyncGetTopHeadlines (url) ==>', url);
    get(url, true)
      .then((responseData) => {
        console.log('====== onAsyncGetTopHeadlines =======', responseData);
        if (responseData.status === 'error') {
          if (responseData.code === 'apiKeyMissing') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else if (responseData.code === 'apiKeyDisabled') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else if (responseData.code === 'apiKeyExhausted') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else if (responseData.code === 'apiKeyInvalid') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else if (responseData.code === 'parameterInvalid') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else if (responseData.code === 'rateLimited') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else if (responseData.code === 'sourcesTooMany') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else if (responseData.code === 'sourceDoesNotExist') {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          } else {
            setTimeout(() => {
              Toast.show(responseData.Message);
            }, 500);
          }
          dispatch(getTopHeadlinesFailure(responseData.Message));
        } else if (responseData.status === 'ok') {
          dispatch(getTopHeadlinesSuccess(responseData.articles));
        } else {
          dispatch(getTopHeadlinesFailure(responseData));
        }
        dispatch(setLoader(false));
        return responseData;
      }).catch((e) => {
        setTimeout(() => {
          Toast.show('We are unable to fetch data.');
        }, 1000);
        dispatch(setLoader(false));
        dispatch(getTopHeadlinesFailure(e));
      });
  };
};

// Initial state
const initialState = Map({
  newsArticles: '',
  errorMsg: '',
  loading: false,
  userNotificationToken: '',
  getTopHeadlinesSuccess: false,
});

export default function NewsAuthStateReducer(state = initialState, action) {
  switch (action.type) {
    // Top headlines
    case GET_TOP_HEADLINES_SUCCESS:
      return state.set('newsArticles', action.payload).set('getTopHeadlinesSuccess', true);
    case GET_TOP_HEADLINES_FAILURE:
      return state.set('errorMsg', action.payload).set('getTopHeadlinesSuccess', false);

    // ChangeNotificationToken 
    case CHANGE_NOTIFICATION_TOKEN:
      return state.set('userNotificationToken', action.payload);

    // set loader
    case SET_LOADER:
      return state.set('loading', action.payload);

    // default
    default:
      return state;
  }
}
