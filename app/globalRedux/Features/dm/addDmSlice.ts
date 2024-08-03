'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface DMShowState {
    value: boolean
}

const initialState: DMShowState = {
    value: false,
}

export const dmSlice = createSlice({
    name: 'dm',
    initialState,
    reducers: {
        toggle: (state) => { state.value = !state.value },
    }
})

export const { toggle } = dmSlice.actions;

export default dmSlice.reducer;