export const UPDATE_MEMBERS = 'UPDATE_MEMBERS';

export const updateMembers = (members, bandId) => {
  return {
    type: UPDATE_MEMBERS,
    members,
    bandId
  };
};
