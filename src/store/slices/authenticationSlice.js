import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access: '',
  refresh: '',
  user: '',
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      const { access, refresh, user } = action.payload ?? initialState
      state.access = access
      state.refresh = refresh
      state.user = user
    },
  },
})

export const { setAuthorization } = authorizationSlice.actions

export default authorizationSlice.reducer
