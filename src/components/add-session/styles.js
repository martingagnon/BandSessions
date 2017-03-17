import {StyleSheet} from 'react-native';

import {colors} from '../constants.js';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderBottomColor: colors.border,
    borderWidth: 1,
    paddingLeft: 10
  }
});