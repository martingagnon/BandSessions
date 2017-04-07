export const ADD_COMMENT = 'ADD_COMMENT';
export const COMMENT_ADDED = 'COMMENT_ADDED';

const commentAdded = () => ({type: COMMENT_ADDED});

export const addComment = (session, comment, time) => {
  return async (dispatch) => {
    dispatch(commentAdded);
  };
};
