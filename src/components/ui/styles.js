import {StyleSheet} from 'react-native';

import colors from 'components/colors.js';

export const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center'
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 5,
    justifyContent: 'space-between'
  }
});

export const constants = {
  underlayColor: colors.action
};
