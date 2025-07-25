import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: [],
    movies: [], // Add this to store full movie objects
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.ids.includes(action.payload.id)) {
        state.ids.push(action.payload.id);
        state.movies.push(action.payload); // Store the full movie object
      }
    },
    removeFavorite: (state, action) => {
      const index = state.ids.indexOf(action.payload.id);
      if (index !== -1) {
        state.ids.splice(index, 1);
        state.movies.splice(index, 1); // Remove from movies array
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;