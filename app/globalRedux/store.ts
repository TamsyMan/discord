'use client';

import { configureStore } from '@reduxjs/toolkit';
import dmReducer from './Features/dm/addDmSlice';
import channelMenuSliceReducer from './Features/channel/channelMenuSlice';
import { channel } from 'diagnostics_channel';

export const store = configureStore({
    reducer: {
        dm: dmReducer,
        channelMenu: channelMenuSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;