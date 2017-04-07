export const UPDATE_BANDS = 'UPDATE_BANDS';

export const updateBands = (bands) => {
  return {
    type: UPDATE_BANDS,
    bands
  };
};
