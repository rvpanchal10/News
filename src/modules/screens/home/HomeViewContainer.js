import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import HomeView from './HomeView';

export default connect(
  state => ({
    loading: state.getIn(['userAuth', 'loading']), //Comming from SingIn propTypes declaration
    user: state.getIn(['userAuth', 'user']),
    userArchiveBites: state.getIn(['userAuth', 'userArchiveBites']),
    getUserArchiveBitesSuccess: state.getIn(['userAuth', 'getUserArchiveBitesSuccess']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    };
  }
)(HomeView);
