import * as facebookUsers from 'services/facebook/users';

export const USER_SEARCH_RESULTS = 'USER_SEARCH_RESULTS';

const setSearchResults = (users) => ({type: USER_SEARCH_RESULTS, users});

const SEARCH_TIMEOUT = 1000;
let timeout;

export const searchUsers = (query) => {
  return (dispatch) => {
    clearTimeout(timeout);
    if (query.length > 0) {
      timeout = setTimeout(() => {
        facebookUsers.search(query, (users) => {
          dispatch(setSearchResults(users));
        }, SEARCH_TIMEOUT);
      });
    } else {
      dispatch(setSearchResults([]));
    }
  };
};
