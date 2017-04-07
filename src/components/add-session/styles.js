import {StyleSheet} from 'react-native';

import {colors} from '../constants.js';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  defaultInputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});
