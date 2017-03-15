import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sessions from '../components/sessions';
import * as SessionsActions from '../actions/sessions';

const mapStateToProps = (state) => {
  return state.sessions;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(SessionsActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
