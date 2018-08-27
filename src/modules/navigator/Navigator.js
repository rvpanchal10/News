import { createTabNavigator, createStackNavigator } from 'react-navigation';

import HomeViewContainer from '../screens/home/HomeViewContainer';
import SearchViewContainer from '../screens/search/SearchViewContainer';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = createStackNavigator({
  HomeView: { screen: HomeViewContainer },
  SearchView: { screen: SearchViewContainer }
},
  { headerMode: 'screen' },
  { initialRouteName: 'HomeView' }
);

// Root navigator is a StackNavigator
const AppNavigator = createStackNavigator({
  MainScreenNavigator: {
    screen: MainScreenNavigator,
    navigationOptions: {}
  }
});

export default AppNavigator;
