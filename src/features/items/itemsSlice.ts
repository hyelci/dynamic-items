import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateItemRequest, Item } from '../../models/item.interface'
import axios from 'axios'
import toast from 'react-hot-toast'

export interface ItemsState {
  itemList: Item[]
  loadingItems?: boolean
  itemsError?: string
  itemDetailsLoading: boolean
  itemDetailsError: boolean
  itemDetails?: Item
  itemLoading: boolean
  itemError: boolean
}

const initialState: ItemsState = {
  itemList: [],
  itemDetailsLoading: false,
  itemDetailsError: false,
  itemLoading: false,
  itemError: false,
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

export const getItemDetails = createAsyncThunk(
  'item/getItemDetails',
  async (id: number) => {
    let URL = `https://retoolapi.dev/Fc6Ucd/data/${id}`
    try {
      const resp = await axios.get(URL)
      return resp.data
    } catch (error) {
      console.error('There is no yoga details')
      throw error
    }
  }
)

export const createItem = createAsyncThunk(
  'yoga/addYoga',
  async (request: CreateItemRequest) => {
    let URL = `https://retoolapi.dev/Fc6Ucd/data`
    try {
      const resp = await axios.post(URL, request)
      return resp.data.data
    } catch (error) {
      console.error('There is no yoga create details')
      throw error
    }
  }
)

export const editItem = createAsyncThunk(
  'yoga/editYoga',
  async (value: Item) => {
    let URL = `https://retoolapi.dev/Fc6Ucd/data/${value.id}`
    try {
      const resp = await axios.patch(URL, value)
      return resp.data.data
    } catch (error) {
      console.error('There is no yoga edit details')
      throw error
    }
  }
)

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

      .addCase(getItemDetails.pending, (state) => {
        state.itemDetailsLoading = true
      })
      .addCase(getItemDetails.fulfilled, (state, { payload }) => {
        state.itemDetailsLoading = false
        state.itemDetails = payload
        state.itemDetailsError = false
      })
      .addCase(getItemDetails.rejected, (state) => {
        state.itemDetailsLoading = false
        state.itemDetailsError = true
      })

      .addCase(createItem.pending, (state) => {
        state.itemLoading = true
      })
      .addCase(createItem.fulfilled, (state) => {
        state.itemLoading = false
        state.itemError = false
        toast.success('The yoga type added successfuly')
      })
      .addCase(createItem.rejected, (state) => {
        state.itemLoading = false
      })

      .addCase(editItem.pending, (state) => {
        state.itemLoading = true
      })
      .addCase(editItem.fulfilled, (state) => {
        state.itemLoading = false
        state.itemError = false
        toast.success('The yoga type edited successfully!')
      })
      .addCase(editItem.rejected, (state) => {
        state.itemLoading = false
        state.itemError = true
      })
  },
})

// export const {} = yogaSlice.actions;
export default itemsSlice.reducer
