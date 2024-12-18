import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
}

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setIsAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload
    },
  },
})
export const { reducer, actions } = AuthSlice
