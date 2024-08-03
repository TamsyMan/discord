'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface ChannelMenuState {
    value: boolean
}

const initialState: ChannelMenuState = {
    value: false,
}

export const channelMenuSlice = createSlice({
    name: 'channelMenu',
    initialState,
    reducers: {
        toggle: (state) => { state.value = !state.value },
    }
})

export const { toggle } = channelMenuSlice.actions;

export default channelMenuSlice.reducer;