import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    saveToken(state, action) {
      const { token } = action.payload;
      state = token;
      localStorage.setItem('token', JSON.stringify(state))
      return state
    },
    removeToken(state, action) {
      state = null;
      localStorage.setItem("token", state);
      return state;
    }
  }
})

export const {
  saveToken,
  removeToken
      } = authSlice.actions

export default authSlice.reducer