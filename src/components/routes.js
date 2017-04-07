import Sessions from 'components/sessions';
import Session from 'components/session';
import RecordSession from 'components/record-session';
import AddComment from 'components/add-comment';
import Login from 'components/login';
import Bands from 'components/bands';
import AddBand from 'components/add-band';

const Routes = {
  Login: { screen: Login },
  Bands: { screen: Bands },
  AddBand: { screen: AddBand },
  Sessions: { screen: Sessions },
  RecordSession: {screen: RecordSession},
  Session: {screen: Session},
  AddComment: {screen: AddComment}
};

export default Routes;
