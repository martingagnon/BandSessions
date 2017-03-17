import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RecordSession from './record-session';
import * as RecordSessionActions from '../../actions/record-session';

const mapStateToProps = (state) => {
  return state.recordSession;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RecordSessionActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordSession);
