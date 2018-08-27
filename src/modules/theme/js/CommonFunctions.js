import { Dimensions } from 'react-native';

export function screenHeight(percentageHeight, offset) {
  return (Dimensions.get('window').height * (percentageHeight / 100)) - offset;
}
export function screenWidth(percentageWidth, offset) {
  return (Dimensions.get('window').width * (percentageWidth / 100)) - offset;
}

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
