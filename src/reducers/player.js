import { PLAYER_TIME, PLAYER_STATE, PLAYER_DURATION} from 'actions/player';
import PlayerStates from 'constants/player-states';

const initialState = {
  playerState: PlayerStates.stopped,
  currentTime: 0,
  playerDuration: 0
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case PLAYER_TIME:
      return {...state, currentTime: action.currentTime};
    case PLAYER_STATE:
      return {...state, playerState: action.playerState};
    case PLAYER_DURATION:
      return {...state, playerDuration: action.duration};
    default:
      return state;
  }
}
