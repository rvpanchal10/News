/* import libraries */
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/css/Common';
import * as CommonFunctions from '../../theme/js/CommonFunctions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: CommonFunctions.screenWidth(100, 0),
    height: CommonFunctions.screenHeight(100, 0),
    color: colors._FFFFFF
  }
});

/* export the styling */
export default styles;