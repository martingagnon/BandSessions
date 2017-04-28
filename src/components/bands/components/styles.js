import {StyleSheet} from 'react-native';

import {colors} from '../../constants.js';

export default StyleSheet.create({
  bandList: {
    height: 70
  },
  bandItem: {
    backgroundColor: colors.clear,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center'
  },
  bandItemText: {
    color: colors.text,
    fontSize: 16
  },
  selectedBandItemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold'
  },
  addBandItem: {
    width: 50,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 25,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addBandItemText: {
    color: '#ffff00',
    fontSize: 16
  },
  bandImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  sessionsList: {
    flex: 1
  },
  sessionItem: {
    backgroundColor: colors.clear,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: 'center'
  },
  sessionItemText: {
    color: colors.text,
    fontSize: 16
  },
  memberList: {
    height: 50,
    backgroundColor: '#cbcbcb'
  },
  memberImage: {
    width: 34,
    height: 34,
    borderRadius: 17
  }
});
