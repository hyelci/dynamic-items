import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Item } from '../../models/item.interface'
import axios from 'axios'
// import toast from 'react-hot-toast'

export interface ItemsState {
  itemList: Item[]
  loadingItems?: boolean
  itemsError?: string
}

const initialState: ItemsState = {
  itemList: [],
}

export const getItemsList = createAsyncThunk('items/getItemList', async () => {
  let URL = `https://retoolapi.dev/Fc6Ucd/data`
  try {
    const resp = await axios.get(URL)
    return resp.data
  } catch (error) {
    console.error('There is no list')
    throw error
  }
})

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemsList.pending, (state) => {
        state.loadingItems = true
      })
      .addCase(getItemsList.fulfilled, (state, { payload }) => {
        state.loadingItems = false
        state.itemList = payload
      })
      .addCase(getItemsList.rejected, (state, { error }) => {
        state.loadingItems = false
        state.itemsError = error.message
      })
  },
})

// export const {} = yogaSlice.actions;
export default itemsSlice.reducer
