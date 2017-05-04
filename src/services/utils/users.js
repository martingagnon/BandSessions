export const getBandUsers = (bandId, members, users) => {
  const bandMembers = members[bandId] || [];
  return bandMembers.reduce((array, member) => users[member.id] ? array.concat(users[member.id]) : array, []);
};
