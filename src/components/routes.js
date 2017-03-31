import Sessions from 'components/sessions';
import Session from 'components/session';
import RecordSession from 'components/record-session';
import AddComment from 'components/add-comment';
<<<<<<< HEAD:src/components/routes.js
import Login from 'components/login';
import Bands from 'components/bands';
import AddBand from 'components/add-band';
=======
import SaveSession from 'components/save-session';
>>>>>>> Add new Save session class:src/components/navigation/routes.js

const Routes = {
  Login: { screen: Login },
  Bands: { screen: Bands },
  AddBand: { screen: AddBand },
  Sessions: { screen: Sessions },
  RecordSession: {screen: RecordSession},
  Session: {screen: Session},
  AddComment: {screen: AddComment},
  SaveSession: {screen: SaveSession}
};

export default Routes;
