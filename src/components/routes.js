import Sessions from 'components/sessions';
import Session from 'components/session';
import RecordSession from 'components/record-session';
import AddComment from 'components/add-comment';
import Bands from 'components/bands';
import AddBand from 'components/add-band';
import AddSession from 'components/add-session';

const Routes = {
  Bands: { screen: Bands },
  AddBand: { screen: AddBand },
  Sessions: { screen: Sessions },
  RecordSession: {screen: RecordSession},
  Session: {screen: Session},
  AddComment: {screen: AddComment},
  AddSession: {screen: AddSession}
};

export default Routes;
