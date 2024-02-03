import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateStart: (state) => {
      state.loading = true
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    updateFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteStart: (state) => {
      state.loading = true
    },
    deleteSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deleteFailure: (state, action) => {
      state.error=action.payload;
      state.loading=false;
    },
  },
})

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateFailure,
  updateSuccess,
  updateStart,
  deleteFailure,
  deleteStart,
  deleteSuccess
} = userSlice.actions
export default userSlice.reducer
