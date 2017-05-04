import * as facebookUsers from 'services/facebook/users';
export const UPDATE_USERS = 'UPDATE_USERS';

export const fetchUsers = (dispatch, getState, userIds) => {
  return new Promise((fullfill) => {
    const knownUsers = getState().users.users;
    const unknownUsers = userIds.filter((userId) => !knownUsers[userId]);
    if (unknownUsers.length > 0) {
      facebookUsers.get(unknownUsers, (users) => {
        dispatch({type: UPDATE_USERS, users});
        fullfill();
      });
    }
  });
};
