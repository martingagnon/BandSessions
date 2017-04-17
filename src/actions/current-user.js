import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

export const CURRENT_USER = 'CURRENT_USER';

const setCurrentUser = (currentUser) => {
  return {
    type: CURRENT_USER,
    currentUser
  };
};

export const updateCurrentuser = () => {
  return (dispatch) => {
    const currentUserRequest = new GraphRequest('/me?fields=id,name,picture', null, (error, result) => {
      if (!error) {
        dispatch(setCurrentUser(result));
      }
    });
    new GraphRequestManager().addRequest(currentUserRequest).start();
  };
};
