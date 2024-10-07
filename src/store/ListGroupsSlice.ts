import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Groups_URls } from '../constants/End-points';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(Groups_URls.getGroupsList ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
      })
      return res.data;
    } catch (error) {      
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data)
      }
    }
  }
)

interface Group {
  name: string;
  students: number;
}

interface GroupsState {
  groups: Group[]
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  error: string | null
}

const initialState: GroupsState = {
  groups: [],
  status: 'idle',
  error: null
}

const groupsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.groups.push(...action.payload)
      })
      .addCase(fetchGroups.rejected, (state, action) => {        
        state.status = 'rejected'
        state.error = action.payload.message ?? 'Unknown Error'
      })
  }
})

export default groupsSlice.reducer