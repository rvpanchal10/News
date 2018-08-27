import React, { Component } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';

/* import styles */
import styles from './HomeView.styles';

/* import styles and functions */
import { AllTexts, colors } from '../../theme/css/Common';

class HomeView extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: AllTexts.HomeViewTitle,
    gesturesEnabled: false
  });

  constructor(props) {
    super(props);
    this.state = {
      // state
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={{ justifyContent: 'center' }}>
          <Text>News Listing</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(HomeView);