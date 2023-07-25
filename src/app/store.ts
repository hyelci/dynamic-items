import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import itemsSlice from '../features/items/itemsSlice'

export const store = configureStore({
  reducer: {
    items: itemsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
