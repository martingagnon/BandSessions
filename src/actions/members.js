import getMemberService from 'services/firebase/member';
import {fetchUsers} from './users';

export const UPDATE_MEMBERS = 'UPDATE_MEMBERS';
export const UPDATE_USERS = 'UPDATE_USERS';

export const updateMembers = (members, bandId) => {
  return async (dispatch, getState) => {
    await fetchUsers(dispatch, getState, members.map((member) => member.id));
    dispatch({type: UPDATE_MEMBERS, members, bandId});
  };
};

export const addMember = (bandId, userId, role) => {
  return () => {
    const service = getMemberService(bandId, userId);
    service.set({role});
  };
};

export const removeMember = (bandId, userId) => {
  return async () => {
    const service = getMemberService(bandId, userId);
    service.remove();
  };
};
