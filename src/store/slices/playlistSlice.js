import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playlist: [],
  track: null,
  isPlaying: false,
  shufflePlaylist: [],
  favoritesTracks: [],
  categoryTracks: [],
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload
    },
    setPlayTrack: (state, action) => {
      state.isPlaying = action.payload
    },
    setCurrentTrack: (state, action) => {
      const id = action.payload
      const current = state.playlist.find((track) => track.id === id)
      state.track = current
    },
    setShuffleTracks: (state, action) => {
      state.shufflePlaylist = action.payload
    },
    setFavoritesTracks: (state, action) => {
      state.favoritesTracks = action.payload
    },
    setCategoryTracks: (state, action) => {
      state.categoryTracks = action.payload
    },
  },
})
export const {
  setPlaylist,
  setPlayTrack,
  setCurrentTrack,
  setShuffleTracks,
  setFavoritesTracks,
  setCategoryTracks,
} = playlistSlice.actions
export default playlistSlice.reducer
