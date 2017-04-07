import {StyleSheet} from 'react-native';

import {colors} from 'components/constants.js';

export const styles = StyleSheet.create({
  action: {
    backgroundColor: colors.action,
    borderColor: colors.clear,
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16
  },
  text: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center'
  }
});

export const constants = {
  underlayColor: colors.action
};
