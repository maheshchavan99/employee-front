import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
  data: null,
  isLoading: false,
  error: null,
}

export const fetchAllUserList = createAsyncThunk("dashboard/fetchsers", async (param, { rejectWithValue }) => {

  try {
    let url = `/api/people`
    if (param) url = url + param
    const res = await axios.get(url)
    if (res?.status == 200) return res?.data
    else return rejectWithValue(res.data)
  } catch (e) {
    return rejectWithValue(e?.response?.data)
  }
},
)

export const userListSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllUserList.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchAllUserList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  },
})


export default userListSlice.reducer
