import {ListView} from 'react-native';
import { UPDATE_SESSIONS } from 'actions/sessions';

const initialState = {dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SESSIONS:
      const dataSource = state.dataSource.cloneWithRows(action.sessions);
      return {...state, dataSource};
    default:
      return state;
  }
}
