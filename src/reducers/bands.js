import {ListView} from 'react-native';
import { UPDATE_BANDS } from 'actions/bands';

const initialState = {dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BANDS:
      const dataSource = state.dataSource.cloneWithRows(action.bands);
      return {...state, dataSource};
    default:
      return state;
  }
}
