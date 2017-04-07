import {StyleSheet} from 'react-native';

import {colors} from '../../constants.js';

export const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    borderBottomColor: colors.separator,
    borderColor: colors.clear,
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16
  },
  itemText: {
    color: colors.text,
    fontSize: 16
  }
});
