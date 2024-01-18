import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: {
        id: null,
        name: '',
        username: '',
        password: ''
      },
    },
    reducers: {
      loginSuccess: (state, action) => {
        state.user  = action.payload;
      },
      retrieveUserSuccess: (state, action) => {
        state.user  = action.payload;
      },
      logoutSuccess: (state, action) => {
        state.user = action.payload
      },
    },
  });


export default authSlice