import {ListView} from 'react-native';
import { ADD_SESSION, UPDATE_SESSIONS } from './actions';
import * as sessionsService from '../../services/sessions';

const validateState = (state) => {
  if (!!state.dataSource) {
    return state;
  }
  const defaultDataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  const dataSource = defaultDataSource.cloneWithRows([]);
  return {dataSource};
};

const updateStateWithSessions = (state, sessions) => {
  const dataSource = state.dataSource.cloneWithRows(sessions);
  return {dataSource};
};

export default function sessions(state = {}, action) {
  const newState = validateState(state);

  switch (action.type) {
    case ADD_SESSION:
      sessionsService.add({name: action.sessionName});
      return newState;
    case UPDATE_SESSIONS:
      return updateStateWithSessions(newState, action.sessions);
    default:
      return newState;
  }
}
