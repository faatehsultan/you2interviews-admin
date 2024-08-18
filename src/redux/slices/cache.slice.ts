import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CacheState {
  cache: {} | undefined;
}

const initialState: CacheState = {
  cache: undefined,
};

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCache(state, action: PayloadAction<any>) {
      state.cache = action.payload;
    },
    clearCache(state) {
      state.cache = undefined;
    },
  },
});

export const { setCache, clearCache } = cacheSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCache = (state: RootState) => state.cache.cache;

export default cacheSlice.reducer;
