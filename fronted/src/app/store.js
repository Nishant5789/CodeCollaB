import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import codeSlice from '../features/codeeditor/codeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    code: codeSlice
  },
});
