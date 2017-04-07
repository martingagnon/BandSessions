import Sessions from 'components/sessions';
import Session from 'components/session';
import RecordSession from 'components/record-session';
import AddComment from 'components/add-comment';
import SaveSession from 'components/save-session';

const Routes = {
  Sessions: { screen: Sessions },
  RecordSession: {screen: RecordSession},
  Session: {screen: Session},
  AddComment: {screen: AddComment},
  SaveSession: {screen: SaveSession}
};

export default Routes;
