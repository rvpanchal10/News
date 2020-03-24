import { Provider } from 'react-redux';
import store from './src/redux/store';
import { AppRegistry } from 'react-native';
import React, {Component} from 'react';

import AppViewContainer from './src/modules/AppViewContainer';

class News extends Component {
    render() {
      return (
        <Provider store={store}>
          <AppViewContainer />
        </Provider>
      );
    }
}

AppRegistry.registerComponent('News', () => News);
